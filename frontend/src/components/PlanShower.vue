<template>
  <div v-if="isVisible">
    <v-container class="pa-4">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-4">
            <v-card-title class="text-h5">Guía Turística de Donostia - 7 Días</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div v-for="(day, index) in itinerary" :key="index" class="day">
                <v-subheader>Día {{ index + 1 }}</v-subheader>
                <v-divider></v-divider>
                <div v-for="place in day.places" :key="place.name" class="place">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ place.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ place.description }}</v-list-item-subtitle>
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-content><strong>Actividades:</strong></v-list-item-content>
                        </v-list-item>
                        <v-list-item v-for="activity in place.activities" :key="activity">
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
                  <l-marker v-for="place in allPlaces" :key="place.name"
                    :lat-lng="[place.coordinates.lat, place.coordinates.lng]">
                    <l-popup>{{ place.name }}</l-popup>
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
      center: [43.3149, -1.9860], // Coordenadas del primer lugar
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      itinerary: [
        {
          day: 1,
          places: [
            {
              name: 'Playa de la Concha',
              description: 'Una de las playas urbanas más famosas de Europa.',
              activities: ['Nadar', 'Tomar el sol', 'Pasear por el paseo marítimo'],
              coordinates: { lat: 43.3149, lng: -1.9860 }
            },
            {
              name: 'Monte Igueldo',
              description: 'Ofrece las mejores vistas panorámicas de la ciudad.',
              activities: ['Subir en funicular', 'Visitar el parque de atracciones', 'Disfrutar de las vistas'],
              coordinates: { lat: 43.3214, lng: -2.0090 }
            },
            {
              name: 'Parte Vieja',
              description: 'El casco antiguo de la ciudad, lleno de bares de pintxos.',
              activities: ['Degustar pintxos', 'Visitar la Plaza de la Constitución', 'Explorar las calles históricas'],
              coordinates: { lat: 43.3235, lng: -1.9836 }
            }
          ]
        },
        {
          day: 2,
          places: [
            {
              name: 'Aquarium de San Sebastián',
              description: 'Un acuario con una gran variedad de especies marinas.',
              activities: ['Ver tiburones', 'Explorar el túnel de vidrio', 'Aprender sobre la vida marina'],
              coordinates: { lat: 43.3225, lng: -1.9893 }
            },
            {
              name: 'Museo San Telmo',
              description: 'Un museo dedicado a la sociedad vasca y su evolución.',
              activities: ['Ver exposiciones', 'Aprender sobre la cultura vasca', 'Explorar el edificio histórico'],
              coordinates: { lat: 43.3228, lng: -1.9834 }
            },
            {
              name: 'Peine del Viento',
              description: 'Una famosa escultura de Eduardo Chillida situada al final de la playa de Ondarreta.',
              activities: ['Ver la escultura', 'Disfrutar del paisaje', 'Tomar fotos'],
              coordinates: { lat: 43.3216, lng: -2.0086 }
            }
          ]
        },
        {
          day: 3,
          places: [
            {
              name: 'Monte Urgull',
              description: 'Un monte con senderos y vistas panorámicas de la ciudad.',
              activities: ['Hacer senderismo', 'Visitar el Castillo de la Mota', 'Disfrutar de las vistas'],
              coordinates: { lat: 43.3244, lng: -1.9862 }
            },
            {
              name: 'Playa de Ondarreta',
              description: 'Una playa tranquila ideal para familias.',
              activities: ['Nadar', 'Tomar el sol', 'Jugar en la arena'],
              coordinates: { lat: 43.3186, lng: -1.9982 }
            },
            {
              name: 'Catedral del Buen Pastor',
              description: 'Una impresionante catedral neogótica en el centro de la ciudad.',
              activities: ['Visitar la catedral', 'Tomar fotos', 'Explorar los alrededores'],
              coordinates: { lat: 43.3160, lng: -1.9817 }
            }
          ]
        },
        {
          day: 4,
          places: [
            {
              name: 'Palacio de Miramar',
              description: 'Un palacio histórico con jardines y vistas al mar.',
              activities: ['Visitar el palacio', 'Pasear por los jardines', 'Disfrutar de las vistas'],
              coordinates: { lat: 43.3175, lng: -1.9912 }
            },
            {
              name: 'Plaza de la Constitución',
              description: 'Una plaza histórica en el corazón de la Parte Vieja.',
              activities: ['Tomar un café', 'Explorar la plaza', 'Visitar los alrededores'],
              coordinates: { lat: 43.3228, lng: -1.9845 }
            },
            {
              name: 'Museo Naval',
              description: 'Un museo dedicado a la historia marítima de San Sebastián.',
              activities: ['Ver exposiciones', 'Aprender sobre la historia marítima', 'Explorar el museo'],
              coordinates: { lat: 43.3222, lng: -1.9860 }
            }
          ]
        },
        {
          day: 5,
          places: [
            {
              name: 'Parque de Cristina Enea',
              description: 'Un parque urbano con jardines y estanques.',
              activities: ['Pasear por el parque', 'Ver animales', 'Disfrutar de la naturaleza'],
              coordinates: { lat: 43.3129, lng: -1.9750 }
            },
            {
              name: 'Tabakalera',
              description: 'Un centro cultural y de arte contemporáneo.',
              activities: ['Ver exposiciones', 'Asistir a eventos', 'Explorar el edificio'],
              coordinates: { lat: 43.3125, lng: -1.9780 }
            },
            {
              name: 'Puente de María Cristina',
              description: 'Un puente histórico con esculturas y vistas al río Urumea.',
              activities: ['Cruzar el puente', 'Tomar fotos', 'Disfrutar de las vistas'],
              coordinates: { lat: 43.3167, lng: -1.9783 }
            }
          ]
        },
        {
          day: 6,
          places: [
            {
              name: 'Mercado de la Bretxa',
              description: 'Un mercado tradicional con productos locales.',
              activities: ['Comprar productos locales', 'Explorar el mercado', 'Probar comida'],
              coordinates: { lat: 43.3230, lng: -1.9830 }
            },
            {
              name: 'Teatro Victoria Eugenia',
              description: 'Un teatro histórico con una variada programación cultural.',
              activities: ['Asistir a una obra de teatro', 'Ver un concierto', 'Explorar el edificio'],
              coordinates: { lat: 43.3221, lng: -1.9819 }
            },
            {
              name: 'Kursaal',
              description: 'Un centro de congresos y auditorio junto al mar.',
              activities: ['Asistir a eventos', 'Ver exposiciones', 'Disfrutar de la arquitectura'],
              coordinates: { lat: 43.3245, lng: -1.9781 }
            }
          ]
        },
        {
          day: 7,
          places: [
            {
              name: 'Isla de Santa Clara',
              description: 'Una pequeña isla en la bahía de La Concha.',
              activities: ['Tomar un barco a la isla', 'Explorar la isla', 'Disfrutar de las vistas'],
              coordinates: { lat: 43.3240, lng: -1.9980 }
            },
            {
              name: 'Parque de Aiete',
              description: 'Un parque con jardines y un palacio.',
              activities: ['Pasear por el parque', 'Visitar el palacio', 'Disfrutar de la naturaleza'],
              coordinates: { lat: 43.3075, lng: -1.9740 }
            },
            {
              name: 'Monte Ulia',
              description: 'Un monte con rutas de senderismo y vistas panorámicas.',
              activities: ['Hacer senderismo', 'Disfrutar de las vistas', 'Explorar la naturaleza'],
              coordinates: { lat: 43.3260, lng: -1.9580 }
            }
          ]
        }
      ]
    };
  },
  computed: {
    allPlaces() {
      return this.itinerary.flatMap(day => day.places);
    }
  },
  created() {
    if (this.itinerary.length > 0 && this.itinerary[0].places.length > 0) {
      this.center = [this.itinerary[0].places[0].coordinates.lat, this.itinerary[0].places[0].coordinates.lng];
    }
    this.checkTravelData();
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    checkTravelData() {
      const travelData = localStorage.getItem('travel_data');
      if (travelData) {
        this.isVisible = true;
        localStorage.removeItem('travel_data');
      }
    },
    handleStorageChange(event) {
      if (event.key === 'travel_data') {
        this.isVisible = !!event.newValue;
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