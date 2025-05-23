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
  async created() {
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
        this.$router.push("/login");
      }
    } else {
      this.$router.push("/login");
    }
  }
};
</script>