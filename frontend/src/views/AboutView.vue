<template>
  <SideBarMenu />
  <div class="container">
    <h1 class="title">Sobre las Funcionalidades</h1>
    <div class="card">
      <p>
        Esta aplicación web está diseñada para ayudar a los usuarios a planificar sus viajes de manera <strong>eficiente
          y personalizada</strong>. A continuación, se describen las principales <strong>funcionalidades</strong> que
        ofrece:
      </p>
      <ul>
        <li>Generación de itinerarios turísticos personalizados.</li>
        <li>Visualización de lugares sugeridos en mapas mediante integración con APIs.</li>
        <li>Descarga de itinerarios en formato PDF.</li>
        <li>Registro e inicio de sesión para personalización.</li>
        <li>Historial de itinerarios y estadísticas de uso para usuarios registrados y con sesión iniciada.</li>
        <li>Interfaz intuitiva y fácil de usar.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// Components
import SideBarMenu from '../components/sideBarMenu.vue';

export default defineComponent({
  name: 'AboutView',

  components: {
    SideBarMenu,
  },
});
</script>

<style scoped>
/* General container styles */
.container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra el contenido horizontalmente */
  padding: 2rem;
  margin: 0 auto;
  max-width: 1200px; /* Limita el ancho máximo del contenido */
  box-sizing: border-box;
}

/* Title styles */
.title {
  font-family: 'Roboto', sans-serif; /* Fuente similar a Vuetify */
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center; /* Centra el título */
  margin-bottom: 1.5rem;
  color: #333; /* Color oscuro para el texto */
}

/* Subtitle styles */
.subtitle {
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: left; /* Alinea a la izquierda */
  margin-bottom: 1rem;
  color: #555; /* Color gris para subtítulos */
}

/* Paragraph styles */
p {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  text-align: left; /* Alinea el texto a la izquierda */
  color: #666; /* Color gris claro */
  margin-bottom: 1rem;
}

/* List styles */
ul {
  list-style-type: disc;
  padding-left: 2rem; /* Sangría para las listas */
  margin-bottom: 1rem;
}

ul li {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 0.5rem;
}

/* Card styles */
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  padding: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px; /* Limita el ancho máximo de las tarjetas */
  box-sizing: border-box;
}

/* Button styles */
.button {
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #1976d2; /* Azul similar a Vuetify */
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #1565c0; /* Azul más oscuro al pasar el cursor */
}

/* Responsive styles */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }

  p {
    font-size: 0.9rem;
  }

  .card {
    padding: 1rem;
  }
}
</style>