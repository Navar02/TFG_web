<template>
  <div class="token-graphs">
    <div class="summary-row">
      <div class="summary-card">
        <div class="summary-title">Consumo del mes actual</div>
        <div class="summary-value">{{ data.month_total }} tokens</div>
      </div>
      <div class="summary-card">
        <div class="summary-title">Consumo últimos 30 días</div>
        <div class="summary-value">{{ data.last_30_days_total }} tokens</div>
      </div>
      <div class="summary-card">
        <div class="summary-title">Consumo del año</div>
        <div class="summary-value">{{ data.year_total }} tokens</div>
      </div>
      <div class="summary-card">
        <div class="summary-title">Día de mayor consumo</div>
        <div class="summary-value">
          <template v-if="maxDay">
            {{ maxDay.label }} ({{ maxDay.value }} tokens)
          </template>
          <template v-else>
            -
          </template>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: center; margin-bottom: 2em;">
      <button @click="descargarPlanPDF" style="background: #1976d2; color: #fff; border: none; border-radius: 6px; padding: 0.8em 2em; font-size: 1em; cursor: pointer;">
        Descargar plan de viaje en PDF
      </button>
    </div>
    <div class="graphs-row">
      <div class="graph-container">
        <h3>Consumo de tokens por días del mes ({{ data.month_name }} {{ data.year }})</h3>
        <canvas ref="monthChart"></canvas>
      </div>
      <div class="graph-container">
        <h3>Consumo de tokens por meses del año ({{ data.year }})</h3>
        <canvas ref="yearChart"></canvas>
      </div>
      <div class="graph-container">
        <h3>Consumo de tokens últimos 30 días</h3>
        <canvas ref="last30Chart"></canvas>
      </div>
    </div>

    <!-- Tablas de desglose -->
    <div class="tables-row">
      <div class="table-container">
        <h4>Días del mes ({{ data.month_name }})</h4>
        <table>
          <thead>
            <tr>
              <th>Día</th>
              <th>Tokens</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tokens, day) in sortedDaysForMonth" :key="day">
              <td>{{ day }}</td>
              <td>{{ tokens }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-container">
        <h4>Meses del año</h4>
        <table>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Tokens</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tokens, month) in sortedMonthsForYear" :key="month">
              <td>{{ month }}</td>
              <td>{{ tokens }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-container">
        <h4>Últimos 30 días</h4>
        <table>
          <thead>
            <tr>
              <th>Día-Mes</th>
              <th>Tokens</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tokens, day) in sortedDaysLast30" :key="day">
              <td>{{ day }}</td>
              <td>{{ tokens }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend)

const router = useRouter()

const data = ref({
  month_total: 0,
  year_total: 0,
  total: 0,
  last_30_days_total: 0,
  days_for_month: {},
  months_for_year: {},
  days_last_30: {},
  month_name: '',
  month_number: 0,
  year: 0
})

const monthChart = ref(null)
const yearChart = ref(null)
const last30Chart = ref(null)

let monthChartInstance = null
let yearChartInstance = null
let last30ChartInstance = null

const maxDay = computed(() => {
  const entries = Object.entries(data.value.days_for_month || {})
  if (!entries.length) return null
  let max = { label: '', value: 0 }
  for (const [day, value] of entries) {
    if (value > max.value) {
      max = { label: day, value }
    }
  }
  if (max.value === 0) return null
  return max
})

// Tablas ordenadas por valor descendente
const sortedDaysForMonth = computed(() => {
  return Object.entries(data.value.days_for_month || {})
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
})

const sortedMonthsForYear = computed(() => {
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  return Object.entries(data.value.months_for_year || {})
    .map(([k, v]) => [months[parseInt(k)-1], v])
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
})

const sortedDaysLast30 = computed(() => {
  return Object.entries(data.value.days_last_30 || {})
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
})

function renderCharts() {
  if (monthChartInstance) monthChartInstance.destroy()
  if (yearChartInstance) yearChartInstance.destroy()
  if (last30ChartInstance) last30ChartInstance.destroy()

  // Gráfico por días del mes
  const monthLabels = Object.keys(data.value.days_for_month)
  const monthData = Object.values(data.value.days_for_month)
  monthChartInstance = new Chart(monthChart.value, {
    type: 'line',
    data: {
      labels: monthLabels,
      datasets: [{
        label: 'Tokens',
        data: monthData,
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 8,
        hitRadius: 12,
        pointBackgroundColor: '#1976d2'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: { title: { display: true, text: 'Día' } },
        y: { title: { display: true, text: 'Tokens' }, beginAtZero: true }
      }
    }
  })

  // Gráfico por meses del año
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  const yearLabels = Object.keys(data.value.months_for_year).map(m => months[parseInt(m)-1])
  const yearData = Object.values(data.value.months_for_year)
  yearChartInstance = new Chart(yearChart.value, {
    type: 'line',
    data: {
      labels: yearLabels,
      datasets: [{
        label: 'Tokens',
        data: yearData,
        borderColor: '#388e3c',
        backgroundColor: 'rgba(56, 142, 60, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 8,
        hitRadius: 12,
        pointBackgroundColor: '#388e3c'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: { title: { display: true, text: 'Mes' } },
        y: { title: { display: true, text: 'Tokens' }, beginAtZero: true }
      }
    }
  })

  // Gráfico últimos 30 días
  const last30Labels = Object.keys(data.value.days_last_30)
  const last30Data = Object.values(data.value.days_last_30)
  last30ChartInstance = new Chart(last30Chart.value, {
    type: 'line',
    data: {
      labels: last30Labels,
      datasets: [{
        label: 'Tokens',
        data: last30Data,
        borderColor: '#f9a825',
        backgroundColor: 'rgba(249, 168, 37, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 8,
        hitRadius: 12,
        pointBackgroundColor: '#f9a825'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: { title: { display: true, text: 'Día-Mes' } },
        y: { title: { display: true, text: 'Tokens' }, beginAtZero: true }
      }
    }
  })
}

async function descargarPlanPDF() {
  const userdata = localStorage.getItem('user_data');
  if (!userdata) {
    alert('No hay datos disponibles para generar el PDF.');
    return;
  }
  const JSONuserdata = JSON.parse(userdata);
  console.log(JSONuserdata);
  const jsonbody = { type: 'tokens', user_data: JSONuserdata };
  const jsonbodyString = JSON.stringify(jsonbody);
  console.log(jsonbodyString);
  try {
    const response = await fetch('http://localhost:8000/generate_pdf/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonbodyString,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const blob = await response.blob();
    const pdfUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'token_consumptions.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    alert('Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.');
  }
}

async function fetchTokenConsumptions() {
  const storedUserData = localStorage.getItem("user_data")
  if (storedUserData) {
    try {
      const response = await fetch("http://localhost:8000/getTokenConsumptions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_data: JSON.parse(storedUserData) }),
      })
      if (!response.ok) throw new Error("Error")
      const result = await response.json()
      data.value = result
      renderCharts()
    } catch {
      localStorage.removeItem("user_data")
      router.push("/")
    }
  } else {
    router.push("/")
  }
}

onMounted(fetchTokenConsumptions)
watch(() => data.value, renderCharts, { deep: true })
</script>

<style scoped>
.token-graphs {
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  justify-content: center;
  align-items: stretch;
  margin: 2em 0;
  width: 100%;
}
.summary-row {
  display: flex;
  flex-direction: row;
  gap: 2em;
  justify-content: center;
  align-items: stretch;
  margin-bottom: 2em;
  width: 100%;
}
.graphs-row {
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
.tables-row {
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: 2em;
}
.table-container {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 1.5em 1em;
  min-width: 220px;
  flex: 1 1 0;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
}
th, td {
  border-bottom: 1px solid #eee;
  padding: 0.5em 0.7em;
  text-align: center;
}
th {
  background: #f5f5f5;
  color: #1976d2;
  font-weight: 600;
}
h4 {
  text-align: center;
  color: #1976d2;
  margin-bottom: 0.5em;
}
.summary-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 1.5em 2em;
  min-width: 180px;
  flex: 1 1 0;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.summary-title {
  font-size: 1em;
  color: #1976d2;
  margin-bottom: 0.5em;
  font-weight: 600;
  text-align: center;
}
.summary-value {
  font-size: 1.3em;
  font-weight: bold;
  color: #222;
  text-align: center;
}
.graph-container {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 2em 2em 1em 2em;
  min-width: 0;
  flex: 1 1 0;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
}
h3 {
  text-align: center;
  margin-bottom: 1em;
  color: #1976d2;
  font-size: 1.2em;
}
canvas {
  width: 100% !important;
  height: 320px !important;
  margin: 0 auto;
  display: block;
}
</style>