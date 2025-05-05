<template>
  <sideBarMenu />
    <h1>Registro</h1>
    <div class="register-view">
      <RegisterForm />
    </div>
  </template>
  
  <script>
  import RegisterForm from '@/components/RegisterForm.vue';
  import sideBarMenu from '@/components/sideBarMenu.vue';
  export default {
    components: {
      RegisterForm,
      sideBarMenu,
    }
  };
  </script>
  
  <style scoped>
  .register-view {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  h1 {
    text-align: center;
  }
  </style>