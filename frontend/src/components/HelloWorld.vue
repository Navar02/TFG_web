<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-left">
        <h2 class="display-2 font-weight-bold text-center mb-3">
          Plataforma Web de Guía Turística Basada en Inteligencia Artificial
        </h2>

        <p class="subheading font-weight-regular">
          Esta plataforma facilita la planificación turística mediante recomendaciones inteligentes, generando
          itinerarios personalizados y mostrando ubicaciones sugeridas en un mapa adaptadas a las preferencias del
          usuario.
        </p>
      </v-col>

      <v-col cols="12" md="8" class="text-left">
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
      </v-col>

      <v-col cols="12" md="8" class="text-left">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>