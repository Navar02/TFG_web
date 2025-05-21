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
import { ref } from 'vue'

const visible = ref(false)
const mensaje = ref('')

function manejarMostrar(dato) {
  mensaje.value = dato
  visible.value = true
}
</script>

<style scoped>
</style>