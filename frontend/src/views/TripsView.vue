<template>
  <sideBarMenu />
  <UserMenu />
  <TripTable @mostrar="manejarMostrar"/>
  <TripPopUp :visible="visible" :mensaje="mensaje" />
</template>

<script setup>
import sideBarMenu from '@/components/sideBarMenu.vue';
import UserMenu from '@/components/UserMenu.vue';
import TripTable from '@/components/TripTable.vue';
import TripPopUp from '@/components/TripPopUp.vue';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const visible = ref(false)
const mensaje = ref('')

const router = useRouter()

function manejarMostrar(dato) {
  mensaje.value = dato
  visible.value = true
}

onMounted(async () => {
  const storedUserData = localStorage.getItem("user_data");
  if (storedUserData) {
    try {
      const response = await fetch("http://localhost:8000/verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_data: JSON.parse(storedUserData) }),
      });
      if (!response.ok) {
        throw new Error("Verification failed");
      }
      await response.json();
    } catch {
      localStorage.removeItem("user_data");
      router.push("/login");
    }
  } else {
    router.push("/login");
  }
});
</script>