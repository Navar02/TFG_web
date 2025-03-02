<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4">
          <v-card-title class="text-h5">Formulario de Búsqueda</v-card-title>

          <!-- Buscador de ciudades y lista de sugerencias -->
          <div class="search-container">
            <!-- Buscador de ciudades -->
            <v-text-field v-model="cityQuery" label="Buscar Ciudad" placeholder="Introduce una ciudad"
              @input="handleCityInput" outlined dense @focus="onFocus" @blur="onBlurCity" class="no-margin"></v-text-field>

            <!-- Lista de sugerencias de ciudad -->
            <transition name="slide-fade">
              <v-list v-if="citySuggestions.length && isCityListVisible" class="city-suggestions" dense>
                <v-list-item v-for="(city, index) in citySuggestions" :key="index" @click="selectCity(city)"
                  class="cursor-pointer">
                  <v-list-item-title>{{ city }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </transition>
          </div>

          <!-- Campos de fecha de inicio y fin del viaje -->
          <v-text-field v-model="startDate" label="Fecha de Inicio" type="date" outlined dense 
            :min="today" @change="handleStartDateChange" @blur="validateStartDate"></v-text-field>
          <v-text-field v-model="endDate" label="Fecha de Fin" type="date" outlined dense 
            :min="startDate" :disabled="!startDate" @blur="validateEndDate"></v-text-field>

          <!-- Menú desplegable de categorías -->
          <v-select v-model="selectedCategories" :items="categories" label="Categorías de los lugares a recomendar"
            placeholder="Selecciona una o varias categorías" outlined dense multiple chips></v-select>

          <!-- Checkboxes para hoteles y restaurantes -->
          <v-checkbox v-model="includeHotels" label="Hoteles" dense></v-checkbox>

          <v-checkbox v-model="includeRestaurants" label="Restaurantes" dense></v-checkbox>

          <!-- Botón de envío -->
          <v-btn color="primary" block @click="submitForm">Buscar</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cityQuery: '',
      citySuggestions: [],
      selectedCategories: [],
      categories: [], // Dinámico
      includeHotels: false,
      includeRestaurants: false,
      debounceTimeout: null,
      cache: {}, // Almacenar consultas previas
      isCityListVisible: false, // Controla la visibilidad de la lista de sugerencias
      startDate: '',
      endDate: '',
      today: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    handleCityInput() {
      clearTimeout(this.debounceTimeout);
      if (this.cityQuery.length > 2) {
        this.isCityListVisible = true;
        this.debounceTimeout = setTimeout(() => {
          this.fetchCitySuggestions();
        }, 300); // Espera 300 ms antes de hacer la solicitud
      } else {
        this.citySuggestions = [];
        this.isCityListVisible = false;
      }
    },

    async fetchCitySuggestions() {
      if (this.cache[this.cityQuery]) {
        this.citySuggestions = this.cache[this.cityQuery];
        return;
      }

      const endpoint = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.cityQuery)}&format=json&limit=5`;
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const suggestions = data.map(location => location.display_name);
        this.citySuggestions = suggestions;
        this.cache[this.cityQuery] = suggestions; // Cachear la respuesta
      } catch (error) {
        console.error("Error fetching city suggestions: ", error);
      }
    },

    selectCity(city) {
      this.cityQuery = city;
      this.citySuggestions = [];
      this.isCityListVisible = false;
    },

    async fetchCategories() {
      try {
        const response = await fetch('http://127.0.0.1:8000/getCategories/');
        const data = await response.json();
        this.categories = data.map(category => category.name);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    },

    submitForm() {
      const missingFields = [];
      if (!this.cityQuery) missingFields.push('Buscar Ciudad');
      if (!this.startDate) missingFields.push('Fecha de Inicio');
      if (!this.endDate) missingFields.push('Fecha de Fin');

      if (missingFields.length > 0) {
        alert(`Por favor, rellena los siguientes campos: ${missingFields.join(', ')}`);
        return;
      }

      const searchData = {
        city: this.cityQuery,
        categories: this.selectedCategories,
        includeHotels: this.includeHotels,
        includeRestaurants: this.includeRestaurants,
        startDate: this.startDate,
        endDate: this.endDate,
      };
      console.log("Datos enviados: ", searchData);
      alert("Búsqueda realizada con éxito. Revisa la consola para los datos.");
    },

    onFocus() {
      this.isCityListVisible = true;
    },

    onBlurCity() {
      setTimeout(() => {
        this.isCityListVisible = false;
      }, 200); // Espera 200 ms antes de ocultar la lista para permitir la selección
    },

    handleStartDateChange() {
      this.endDate = ''; // Borrar la fecha de fin si se modifica la fecha de inicio
    },

    validateStartDate() {
      const todayParts = this.today.split('-');
      const startDateParts = this.startDate.split('-');
      if (startDateParts[0] < todayParts[0] || 
          (startDateParts[0] === todayParts[0] && startDateParts[1] < todayParts[1]) || 
          (startDateParts[0] === todayParts[0] && startDateParts[1] === todayParts[1] && startDateParts[2] < todayParts[2])) {
        this.startDate = this.today;
      }
      this.endDate = ''; // Borrar la fecha de fin si se modifica la fecha de inicio
    },

    validateEndDate() {
      const startDateParts = this.startDate.split('-');
      const endDateParts = this.endDate.split('-');
      if (endDateParts[0] < startDateParts[0] || 
          (endDateParts[0] === startDateParts[0] && endDateParts[1] < startDateParts[1]) || 
          (endDateParts[0] === startDateParts[0] && endDateParts[1] === startDateParts[1] && endDateParts[2] < startDateParts[2])) {
        this.endDate = this.startDate;
      }
    }
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

/* Contenedor para el campo de búsqueda y las sugerencias */
.search-container {
  position: relative;
}

/* Estilo para las sugerencias */
.city-suggestions {
  border: 1px solid #ccc; /* Borde de la lista */
  border-top: none; /* No mostrar borde superior, ya que se conecta al campo de búsqueda */
  border-radius: 0 0 8px 8px; /* Bordes redondeados inferiores */
  max-height: 200px;
  overflow-y: auto; /* Hacer la lista desplazable si tiene muchas opciones */
  width: 100%;
  top: 100%;
  margin-top: 0 !important;
  padding-top: 0 !important;
  margin-bottom: 2em;
  left: 0;
  z-index: 10; /* Asegura que esté encima de otros componentes */
  background-color: white; /* Fondo blanco para las sugerencias */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombras para un efecto elevado */
}

/* Asegura que el campo de búsqueda y las sugerencias estén pegados */
.v-text-field .v-input__control {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.v-list-item {
  padding: 8px 16px;
}

/* Transición para desplegar y replegar la lista de sugerencias */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active en versiones anteriores de Vue */
  {
  transform: translateY(-10px);
  opacity: 0;
}

/* Eliminar margen del campo de búsqueda */
.no-margin .v-input__control {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}
</style>