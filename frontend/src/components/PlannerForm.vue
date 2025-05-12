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
              @input="handleCityInput" outlined dense @focus="onFocus" @blur="onBlurCity"
              class="no-margin"></v-text-field>

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
          <v-text-field v-model="startDate" label="Fecha de Inicio" type="date" outlined dense :min="today"
            @change="handleStartDateChange" @blur="validateStartDate"></v-text-field>
          <v-text-field v-model="endDate" label="Fecha de Fin" type="date" outlined dense :min="startDate"
            :disabled="!startDate" @blur="validateEndDate"></v-text-field>

          <!-- Menú desplegable de categorías -->
          <v-select v-model="selectedCategories" :items="categories" label="Categorías de los lugares a recomendar"
            placeholder="Selecciona una o varias categorías" outlined dense multiple chips></v-select>


          <!-- Botón de envío -->
          <v-btn color="primary" block @click="submitForm">Buscar</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div class="loading" id="loading" hidden>
    <div class="spin" hidden></div>
    <div class="loading-text" hidden>Cargando...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityQuery: '',
      citySuggestions: [],
      selectedCategories: [],
      categories: [], // Dinámico
      debounceTimeout: null,
      cache: {}, // Almacenar consultas previas
      isCityListVisible: false, // Controla la visibilidad de la lista de sugerencias
      startDate: '',
      endDate: '',
      today: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
    };
  },
  mounted() {
    this.checkUserData(); // Verificar user_data al cargar la página
    this.fetchCategories();
    this.restoreFormState();
  },
  methods: {
    async checkUserData() {
      const storedUserData = localStorage.getItem('user_data');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        try {
          const response = await fetch('http://localhost:8000/verify/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_data: userData }),
          });

          if (!response.ok) {
            throw new Error('Verification failed');
          }

          console.log('User data is valid.');
        } catch (error) {
          console.error('Invalid user data. Removing from localStorage.');
          localStorage.removeItem('user_data');
        }
      }
    },

    async submitForm() {
      await this.checkUserData(); // Verificar user_data antes de ejecutar el formulario

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
        startDate: this.startDate,
        endDate: this.endDate,
      };

      // Agregar user_data si está presente en localStorage
      const storedUserData = localStorage.getItem('user_data');
      if (storedUserData) {
        searchData.user_data = JSON.parse(storedUserData);
      }

      console.log('Datos enviados: ', searchData);
      localStorage.setItem('travel_data', JSON.stringify(searchData));
      localStorage.setItem('form_state', JSON.stringify(searchData));
      document.getElementById('loading').hidden = false; // Mostrar el loader
      document.getElementsByClassName('spin')[0].hidden = false; // Mostrar el spinner
      document.getElementsByClassName('loading-text')[0].hidden = false; // Mostrar el texto de carga
      try {
        const response = await fetch('http://127.0.0.1:8000/plan/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(searchData),
        });
        document.getElementById('loading').hidden = true; // Ocultar el loader
        document.getElementsByClassName('spin')[0].hidden = true; // Ocultar el spinner
        document.getElementsByClassName('loading-text')[0].hidden = true; // Ocultar el texto de carga

        const travelPlan = await response.json(); // Procesar el cuerpo de la respuesta como JSON
        console.log('Respuesta del servidor: ', travelPlan);
        localStorage.setItem('travel_data', JSON.stringify(travelPlan)); // Guardar el JSON en localStorage
        window.location.reload(); // Recargar la página para mostrar el plan de viaje
      } catch (error) {
        console.error('Error al obtener el plan de viaje: ', error);
        alert('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
      }
    },

    restoreFormState() {
      const formState = localStorage.getItem('form_state');
      if (formState) {
        const state = JSON.parse(formState);
        this.cityQuery = state.city;
        this.selectedCategories = state.categories;
        this.startDate = state.startDate;
        this.endDate = state.endDate;
      }
    },

    async fetchCategories() {
      try {
        const response = await fetch('http://127.0.0.1:8000/getCategories/');
        const data = await response.json();
        this.categories = data.map((category) => category.name);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    },

    handleCityInput() {
      // Lógica para manejar la entrada de la ciudad
    },

    onFocus() {
      this.isCityListVisible = true;
    },

    onBlurCity() {
      setTimeout(() => {
        this.isCityListVisible = false;
      }, 200);
    },

    selectCity(city) {
      this.cityQuery = city;
      this.isCityListVisible = false;
    },

    handleStartDateChange() {
      // Lógica para manejar el cambio de la fecha de inicio
    },

    validateStartDate() {
      // Validar la fecha de inicio
    },

    validateEndDate() {
      // Validar la fecha de fin
    },
  },
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
  border: 1px solid #ccc;
  /* Borde de la lista */
  border-top: none;
  /* No mostrar borde superior, ya que se conecta al campo de búsqueda */
  border-radius: 0 0 8px 8px;
  /* Bordes redondeados inferiores */
  max-height: 200px;
  overflow-y: auto;
  /* Hacer la lista desplazable si tiene muchas opciones */
  width: 100%;
  top: 100%;
  margin-top: 0 !important;
  padding-top: 0 !important;
  margin-bottom: 2em;
  left: 0;
  z-index: 10;
  /* Asegura que esté encima de otros componentes */
  background-color: white;
  /* Fondo blanco para las sugerencias */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Sombras para un efecto elevado */
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

#loading {
  hidden: true;
  /* Ocultar por defecto */
}

.loading {
  display: flex;
  flex-direction: column;
  /* Apilar los elementos verticalmente */
  justify-content: center;
  /* Centrar los elementos verticalmente dentro del contenedor */
  align-items: center;
  /* Centrar los elementos horizontalmente */
  width: 100%;
  /* Asegurar que ocupe todo el ancho disponible */
  max-width: 400px;
  /* Limitar el ancho máximo del contenedor */
  margin: 0 auto;
  /* Centrar horizontalmente el contenedor */
  padding: 20px;
  /* Espaciado interno */
  border-radius: 8px;
  /* Bordes redondeados */
}

.spin {
  border: 3px solid rgba(60, 239, 255, 0.2);
  /* Color adaptado */
  border-top-color: #3cefff;
  /* Color principal */
  border-radius: 50%;
  width: 3em;
  height: 3em;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 1em;
  font-size: 1.2em;
  color: #333;
  text-align: center;
  /* Centrar el texto */
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>