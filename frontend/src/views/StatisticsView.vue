<template>
  <sideBarMenu />
  <UserMenu />
  <StatsComponent />
</template>

<script>
import sideBarMenu from '@/components/sideBarMenu.vue';
import UserMenu from '@/components/UserMenu.vue';
import StatsComponent from '@/components/StatsComponent.vue';

export default {
  components: {
    sideBarMenu,
    UserMenu,
    StatsComponent,
  },
};
</script>