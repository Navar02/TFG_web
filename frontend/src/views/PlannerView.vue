<template>
    <div class="planner">
        <h1 style="text-align: center; font-family: 'Segoe IU', sans-serif;">Planea tu viaje</h1>
        <plannerForm />
    </div>
</template>

<script>
import plannerForm from '../components/PlannerForm.vue'; // Ruta al componente

export default {
  components: {
    plannerForm,
  },
};
</script>