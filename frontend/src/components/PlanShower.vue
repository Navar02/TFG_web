<template>
  <div v-if="isVisible">
    <v-container class="pa-4">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-4">
            <v-card-title class="text-h5">
              <!-- Mostrar título o mensaje de error -->
              <template v-if="errorMessage">
                <v-icon color="red">mdi-alert-circle</v-icon>
                {{ 'ERROR AL CARGAR EL PLAN' }}
              </template>
              <template v-else>
                {{ `Guía Turística de ${travelPlan.location} - ${travelPlan.travelPlan.duracion_viaje} Días` }}
              </template>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <!-- Mostrar contenido del plan si no hay error -->
              <div v-if="!errorMessage">
                <v-row>
                  <v-col cols="6" v-for="(day, index) in travelPlan.travelPlan.plan_visita" :key="index" class="day">
                    <v-card outlined class="pa-2">
                      <v-subheader>Día {{ day.dia }}</v-subheader>
                      <v-divider></v-divider>
                      <v-row>
                        <v-col cols="12" v-for="place in day.lugares" :key="place.nombre" class="place">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{ place.nombre }}</v-list-item-title>
                              <v-list-item-subtitle>{{ place.descripcion }}</v-list-item-subtitle>
                              <v-list-item-subtitle>Duración de la visita: {{ place.duracion_visita }}</v-list-item-subtitle>
                              <v-list dense>
                                <div v-for="activity in place.actividades" :key="activity" class="activity">
                                  - {{ activity }}
                                </div>
                              </v-list>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
                <div id="map-container">
                  <l-map :zoom="zoom" :center="center" style="height: 500px; width: 100%;">
                    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                    <l-marker v-for="place in allPlaces" :key="place.nombre"
                      :lat-lng="[place.coordenadas.latitud, place.coordenadas.longitud]">
                      <l-popup>{{ place.nombre }}</l-popup>
                    </l-marker>
                  </l-map>
                </div>
              </div>
              <!-- Mostrar mensaje de error si existe -->
              <div v-else class="error-message">
                {{ errorMessage }}
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
      travelPlan: null, // Aquí se cargará el JSON dinámico
      errorMessage: null // Mensaje de error si llega un error
    };
  },
  computed: {
    allPlaces() {
      if (!this.travelPlan || this.errorMessage) return [];
      return this.travelPlan.travelPlan.plan_visita.flatMap(day => day.lugares);
    }
  },
  created() {
    this.loadTravelData();
    if (this.travelPlan && this.travelPlan.travelPlan && this.travelPlan.travelPlan.plan_visita.length > 0) {
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
      console.log('Cargando datos de viaje desde localStorage:', travelData);
      if (travelData) {
        const parsedData = JSON.parse(travelData);
        if (parsedData.message) {
          // Si llega un mensaje de error, mostrarlo
          this.errorMessage = parsedData.message;
          console.log('Error al cargar el plan:', this.errorMessage);
          this.isVisible = true; // Ocultar el componente si hay error
        } else {
          // Si no hay error, cargar el plan
          this.travelPlan = parsedData;
          this.isVisible = true;
        }
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

.activity {
  margin-left: 20px;
  color: #555;
}

.v-list-item-title {
  font-weight: bold;
}

.v-list-item-subtitle {
  color: #353434;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
</style>