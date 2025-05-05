<template>
  <SideBarMenu />
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
// Components
import SideBarMenu from '../components/sideBarMenu.vue';

export default defineComponent({
  name: 'AboutView',

  components: {
    SideBarMenu,
  },
});
</script>
