<template>
  <sideBarMenu />
  <UserMenu />
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
          <v-card-actions>
            <v-btn color="primary" block @click="navigateToRegister">
              ¿No tienes cuenta? Regístrate
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import sideBarMenu from '@/components/sideBarMenu.vue';
import UserMenu from '@/components/UserMenu.vue';

export default {
  components: {
    LoginForm,
    sideBarMenu,
    UserMenu,
  },
  created() {
    const storedUserData = localStorage.getItem('user_data');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);

      // Verificar los datos del usuario con el servidor
      fetch('http://localhost:8000/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_data: userData }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Verification failed');
          }
          return response.json();
        })
        .then(() => {
          // Si la verificación es exitosa, redirigir a la página principal
          this.$router.push('/');
        })
        .catch(() => {
          // Si falla la verificación, eliminar user_data y recargar la página
          localStorage.removeItem('user_data');
          window.location.reload();
        });
    }
  },
  methods: {
    navigateToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>