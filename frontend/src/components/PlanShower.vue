<template>
  <div v-if="isVisible">
    <v-container class="pa-4">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-4">
            <v-card-title class="text-h5">Guía Turística de {{ travelPlan.location }} - {{ travelPlan.travelPlan.duracion_viaje }} Días</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div v-for="(day, index) in travelPlan.travelPlan.plan_visita" :key="index" class="day">
                <v-subheader>Día {{ day.dia }}</v-subheader>
                <v-divider></v-divider>
                <div v-for="place in day.lugares" :key="place.nombre" class="place">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ place.nombre }}</v-list-item-title>
                      <v-list-item-subtitle>{{ place.descripcion }}</v-list-item-subtitle>
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-content><strong>Actividades:</strong></v-list-item-content>
                        </v-list-item>
                        <v-list-item v-for="activity in place.actividades" :key="activity">
                          <v-list-item-content>{{ activity }}</v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                </div>
              </div>
              <div id="map-container">
                <l-map :zoom="zoom" :center="center" style="height: 500px; width: 100%;">
                  <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                  <l-marker v-for="place in allPlaces" :key="place.nombre"
                    :lat-lng="[place.coordenadas.latitud, place.coordenadas.longitud]">
                    <l-popup>{{ place.nombre }}</l-popup>
                  </l-marker>
                </l-map>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'PlanShower',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    return {
      isVisible: false,
      zoom: 13,
      center: [43.31667, -1.98333], // Coordenadas iniciales
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      travelPlan: null // Aquí se cargará el JSON dinámico
    };
  },
  computed: {
    allPlaces() {
      if (!this.travelPlan) return [];
      return this.travelPlan.travelPlan.plan_visita.flatMap(day => day.lugares);
    }
  },
  created() {
    this.loadTravelData();
    if (this.travelPlan && this.travelPlan.travelPlan.plan_visita.length > 0) {
      const firstPlace = this.travelPlan.travelPlan.plan_visita[0].lugares[0];
      this.center = [firstPlace.coordenadas.latitud, firstPlace.coordenadas.longitud];
    }
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    loadTravelData() {
      const travelData = localStorage.getItem('travel_data');
      if (travelData) {
        this.travelPlan = JSON.parse(travelData);
        this.isVisible = true;
        localStorage.removeItem('travel_data'); // Limpiar después de cargar
      }
    },
    handleStorageChange(event) {
      if (event.key === 'travel_data') {
        this.loadTravelData();
      }
    }
  }
};
</script>

<style scoped>
#map-container {
  height: 100%;
  width: 100%;
  margin-top: 20px;
}

.day {
  margin-bottom: 20px;
}

.place {
  margin-bottom: 10px;
}

.v-list-item-title {
  font-weight: bold;
}

.v-list-item-subtitle {
  color: #757575;
}
</style>