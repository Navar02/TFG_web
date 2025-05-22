<template>
  <v-card class="stats-card" v-if="stats">
    <v-card-title class="stats-title">Estadísticas de {{ alias }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" class="stat-row">
          <span class="stat-label">Viajes realizados:</span>
          <span class="stat-value">{{ stats.num_viajes }}</span>
        </v-col>
        <v-col cols="12" class="stat-row">
          <span class="stat-label">Duración total de los viajes:</span>
          <span class="stat-value">{{ stats.duracion_total }} días</span>
        </v-col>
        <v-col cols="12" class="stat-row">
          <span class="stat-label">Energía total ahorrada:</span>
          <span class="stat-value">{{ stats.energia_total_ahorrada }} KWh</span>
        </v-col>
        <v-col cols="12" class="stat-row">
          <span class="stat-label">Horas totales ahorradas al usar la plataforma:</span>
          <span class="stat-value">{{ stats.horas_totales_ahorradas }}</span>
        </v-col>
        <v-col cols="12" class="stat-row">
          <span class="stat-label">Tokens totales consumidos al usar la plataforma:</span>
          <span class="stat-value">{{ stats.tokens_totales }}</span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stats = ref(null)
const alias = ref('Usuario')

function get_stats() {
  let user_data = localStorage.getItem("user_data");
  if (user_data) {
    user_data = JSON.parse(user_data);
    alias.value = user_data.alias || 'Usuario'
    fetch("http://localhost:8000/stats/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_data: user_data }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching stats");
        }
        return response.json();
      })
      .then((data) => {
        stats.value = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

onMounted(get_stats)
</script>

<style scoped>
.stats-card {
  border-radius: 22px;
  width: 35vw;
  min-width: 18vw;
  max-width: 90vw;
  margin: 2em auto;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.stats-title {
  text-align: center;
  color: #1976d2;
  font-weight: bold;
  font-size: 1.2em;
}
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.7em;
  width: 100%;
}
.stat-label {
  font-weight: 500;
  color: #444;
}
.stat-value {
  font-weight: bold;
  color: #1976d2;
}
</style>