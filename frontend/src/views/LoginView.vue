<template>
  <sideBarMenu />
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <span class="headline">Login</span>
            </v-card-title>
            <v-card-text>
              <LoginForm />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import LoginForm from '@/components/LoginForm.vue';
  import sideBarMenu from '@/components/sideBarMenu.vue';
  export default {
    components: {
      LoginForm,
      sideBarMenu,
    },
  };
  </script>
  
  <style scoped>
  .headline {
    font-weight: bold;
  }
  </style>