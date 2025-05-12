<template>
  <div class="planner">
    <h1 style="text-align: center; font-family: 'Segoe UI', sans-serif;">Planea tu viaje</h1>
    <plannerForm />
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
};
</script>
