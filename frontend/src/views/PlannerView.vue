<template>
  <div class="planner">
    <h1 style="text-align: center; font-family: 'Segoe UI', sans-serif;">Planea tu viaje</h1>
    <plannerForm />
    <div v-if="showGeneratePdfButton" style="text-align: center; margin-top: 20px;">
      <button class="btn btn--primary" @click="generatePdf">
        Generar PDF
      </button>
    </div>
    <planShower />
    <sidebarMenu />
    <UserMenu />
  </div>
</template>

<script>
import plannerForm from '../components/PlannerForm.vue'; // Ruta al componente
import planShower from '../components/PlanShower.vue';
import sidebarMenu from '../components/sideBarMenu.vue'; // Importar el componente SidebarMenu
import UserMenu from '@/components/UserMenu.vue'; // Importar el componente UserMenu

export default {
  components: {
    plannerForm,
    planShower,
    sidebarMenu, // Registrar el componente SidebarMenu
    UserMenu, // Registrar el componente UserMenu
  },
  data() {
    return {
      showGeneratePdfButton: false, // Controla la visibilidad del botón
    };
  },
  mounted() {
    this.checkLocalStorage(); // Verificar condiciones para mostrar el botón
  },
  methods: {
    checkLocalStorage() {
      const planPdf = localStorage.getItem('plan_pdf');
      const seen = localStorage.getItem('seen');
      if (planPdf && seen === '1') {
        this.showGeneratePdfButton = true;
      }
    },
    async generatePdf() {
      const planPdf = localStorage.getItem('plan_pdf');
      if (!planPdf) {
        alert('No hay datos disponibles para generar el PDF.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/generate_pdf/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: planPdf, // Enviar los datos de plan_pdf como JSON
        });

        if (!response.ok) {
          throw new Error('Error al generar el PDF');
        }

        // Crear un blob para el PDF
        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);

        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'plan_de_viaje.pdf'; // Nombre del archivo PDF
        document.body.appendChild(link); // Agregar el enlace al DOM
        link.click(); // Simular un clic para iniciar la descarga
        document.body.removeChild(link); // Eliminar el enlace del DOM
        URL.revokeObjectURL(pdfUrl); // Liberar la URL del blob
      } catch (error) {
        console.error('Error al generar el PDF:', error);
        alert('Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.');
      }
    },
  },
};
</script>

<style scoped>
.btn {
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #1976d2; /* Azul primario */
  color: white;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #1565c0; /* Azul más oscuro al hacer hover */
}
</style>