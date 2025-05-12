<template>
<head>
  <title>Plan Your Trip</title>
</head>

  <h1 style="text-align: center;">Presentación del TFG y sus Tecnologías</h1>
  <SideBarMenu />
  <UserMenu />
  <HelloWorld />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HelloWorld from '../components/HelloWorld.vue';
import SideBarMenu from '../components/sideBarMenu.vue';
import UserMenu from '@/components/UserMenu.vue'; 

export default defineComponent({
  name: 'HomeView',

  components: {
    HelloWorld,
    SideBarMenu,
    UserMenu,
  },
});
</script>
