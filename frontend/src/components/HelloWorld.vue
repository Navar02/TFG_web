<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-left">
        <div class="card">
          <h3 class="headline font-weight-bold text-center mb-5">
            Plataforma Web de Guía Turística Basada en Inteligencia Artificial
          </h3>

          <p class="subheading font-weight-regular">
            Esta plataforma facilita la planificación turística mediante recomendaciones inteligentes, generando
            itinerarios personalizados y mostrando ubicaciones sugeridas en un mapa adaptadas a las preferencias del
            usuario.
          </p>
          <div>
            <div align="center">
              <img :src="logo" alt="logo de la web" style="width: 7.5rem; height: auto;"/>
            </div>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="8" class="text-left">
        <div class="card">
          <h3 class="headline font-weight-bold text-center mb-5">
            Funcionalidades
          </h3>

          <v-row>
            <v-col cols="12" class="mb-4">
              <v-row>Generación de itinerarios turísticos personalizados.</v-row>
              <v-row>Visualización de lugares sugeridos en mapas mediante integración con APIs.</v-row>
              <v-row>Descarga de itinerarios en formato PDF.</v-row>
              <v-row>Registro e inicio de sesión para personalización.</v-row>
              <v-row>Historial de itinerarios y estadísticas de uso.</v-row>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col cols="12" md="8" class="text-left">
        <div class="card">
          <h3 class="headline font-weight-bold text-center mb-5">
            Tecnologías
          </h3>

          <v-row>
            <v-col cols="12" class="mb-4">
              <v-row><strong>Frontend:</strong> Vue.js</v-row>
              <v-row><strong>Backend:</strong> Django Rest Framework</v-row>
              <v-row><strong>Bases de Datos:</strong> PostgreSQL, MongoDB</v-row>
              <v-row><strong>Despliegue:</strong> Docker</v-row>
              <v-row><strong>Servidor Web:</strong> Nginx</v-row>
              <v-row><strong>Integración de la IA:</strong> Agents SDK de OpenAI y modelos de OpenRouter</v-row>
              <v-row><strong>API de Mapas:</strong> Leaflet y OpenStreetMap</v-row>
              <v-row><strong>Generación de PDF:</strong> pydf</v-row>
              <v-row><strong>Autenticación:</strong> JWT</v-row>
              <v-row><strong>Control de Versiones:</strong> Git</v-row>
              <v-row><strong>Pruebas:</strong> Postman, mediante interfaz</v-row>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import logo from './LogoWeb.png';
export default {
  name: 'HelloWorld',
  setup() {
    return {
      logo,
    };
  },
}
</script>
<style scoped>
/* Card styles (similar to v-card) */
.card {
  background-color: #fff;
  /* Fondo blanco */
  border-radius: 8px;
  /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Sombra ligera */
  padding: 1.5rem;
  /* Espaciado interno */
  margin-bottom: 2rem;
  /* Espaciado inferior */
}

/* Title styles */
.display-2 {
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

/* Subtitle styles */
.headline {
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1rem;
  color: #555;
}

/* Paragraph styles */
.subheading {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  text-align: left;
  color: #666;
  margin-bottom: 1rem;
}

/* Column styles */
.v-col {
  margin-bottom: 1rem;
}

/* Responsive styles */
@media (max-width: 768px) {
  .display-2 {
    font-size: 2rem;
  }

  .headline {
    font-size: 1.25rem;
  }

  .subheading {
    font-size: 0.9rem;
  }
}
</style>