<template>
    <sideBarMenu />
    <UserMenu />
    <UserTable />
</template>
<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import sideBarMenu from '@/components/sideBarMenu.vue';
import UserMenu from '@/components/UserMenu.vue';
import UserTable from '@/components/UserTable.vue';

const router = useRouter();

onMounted(async () => {
  const storedUserData = localStorage.getItem("user_data");
  if (storedUserData) {
    const JSONUserData = JSON.parse(storedUserData);
    console.log(JSONUserData.role);
    if (JSONUserData.role != "admin") {
        console.log("no tienes permisos");
        router.push("/login");
        return;
    }
    console.log("hay datos en localStorage");
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
        console.log("verificación correcta");
    } catch {
        console.log("Error en la verificación");
      localStorage.removeItem("user_data");
      router.push("/login");
    }
  } else {
    console.log("no hay datos en localStorage");
    router.push("/login");
  }
});
</script>