<template>
  <div class="outer-rectangle">
    <h2 style="text-align:center; margin-bottom: 2em;">Mis Viajes</h2>
    <table class="custom-table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.value">{{ header.text }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in trips" :key="trip._id">
          <td>{{ trip.location }}</td>
          <td>{{ trip.date }}</td>
          <td>
            <span v-for="(cat, idx) in trip.categories" :key="cat">
              {{ cat }}<span v-if="idx < trip.categories.length - 1">, </span>
            </span>
          </td>
          <td>{{ trip.travelPlan?.duracion_viaje ? trip.travelPlan.duracion_viaje + ' días' : '-' }}</td>
          <td>
            <button @click="viewTrip(trip)">Ver</button>
          </td>
        </tr>
        <tr v-if="trips.length === 0">
          <td colspan="5" style="text-align:center;">No hay viajes</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['mostrar'])
const trips = ref([])

const headers = [
  { text: 'Lugar', value: 'location' },
  { text: 'Fecha de creación', value: 'date' },
  { text: 'Gustos', value: 'categories' },
  { text: 'Duración', value: 'duracion' },
  { text: 'Acciones', value: 'actions', sortable: false }
]

async function viewTrip(trip) {
  const userData = JSON.parse(localStorage.getItem('user_data'))
  if (!userData) return

  const response = await fetch('http://localhost:8000/trips/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: trip._id,user_data: userData })
  })
  if (response.ok) {
    const data = await response.json()
    console.log('Trips:', data)
    emit('mostrar', data)
  } else {
    trips.value = []
  }
}

onMounted(async () => {
  const userData = JSON.parse(localStorage.getItem('user_data'))
  if (!userData) return

  const response = await fetch('http://localhost:8000/trips/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_data: userData })
  })
  if (response.ok) {
    const data = await response.json()
    // Ordenar por fecha de creación descendente
    trips.value = data.sort((a, b) => new Date(b.date) - new Date(a.date))
    console.log('Trips:', trips.value)
  } else {
    trips.value = []
  }
})
</script>

<style scoped>
.outer-rectangle {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em auto;
  padding: 2.5em 2em 2em 2em;
  border-radius: 28px;
  background: #fafbfc;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  max-width: 90vw;
  width: fit-content;
  min-width: 350px;
}

.custom-table {
  border-collapse: separate;
  border-spacing: 0;
  min-width: 700px;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.custom-table th, .custom-table td {
  padding: 12px 18px;
  text-align: left;
}

.custom-table th {
  background: #f5f5f5;
}

.custom-table tr:first-child th:first-child {
  border-top-left-radius: 18px;
}
.custom-table tr:first-child th:last-child {
  border-top-right-radius: 18px;
}
.custom-table tr:last-child td:first-child {
  border-bottom-left-radius: 18px;
}
.custom-table tr:last-child td:last-child {
  border-bottom-right-radius: 18px;
}

/* Botón Ver personalizado */
.custom-table button {
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  background: #e3e8f0;
  color: #1a237e;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.custom-table button:hover {
  background: #1976d2;
  color: #fff;
}
</style>