<template>
    <div class="planner">
        <h1 style="text-align: center; font-family: 'Segoe IU', sans-serif;">Planea tu viaje</h1>
        <plannerForm />
        <planShower />
    </div>
</template>

<script>
import plannerForm from '../components/PlannerForm.vue'; // Ruta al componente
import planShower from '../components/PlanShower.vue';

export default {
  components: {
    plannerForm,
    planShower
  },
};
</script>