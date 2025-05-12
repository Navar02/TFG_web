<template>
  <sideBarMenu />
  <UserMenu />
  <h1>Registro</h1>
  <div class="register-view">
    <RegisterForm />
    <button class="btn btn--block btn--primary" @click="navigateToLogin">
      ¿Ya tienes cuenta? Inicia sesión
    </button>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';
import sideBarMenu from '@/components/sideBarMenu.vue';
import UserMenu from '@/components/UserMenu.vue';

export default {
  components: {
    RegisterForm,
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
          // Si falla la verificación, eliminar user_data y redirigir a /login
          localStorage.removeItem('user_data');
          this.$router.push('/login');
        });
    }
  },
  methods: {
    navigateToLogin() {
      this.$router.push('/login');
    },
  },
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

/* Estilo del botón */
button.btn {
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  /* Fondo transparente por defecto */
  color: #1e3a8a;
  /* Azul oscuro para el texto */
  transition: background-color 0.3s ease, color 0.3s ease;
}

button.btn--primary:hover {
  background-color: #1976d2;
  /* Azul para el fondo al hacer hover */
  color: white;
  /* Texto blanco al hacer hover */
}

button.btn--block {
  display: block;
  width: 100%;
  margin-top: 20px;
}
</style>