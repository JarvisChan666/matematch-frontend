<template>
  <div class="user-layout">
    <div class="centered">
      <!-- <UserLoginPage /> -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
  import UserLoginPage from '../pages/UserLoginPage.vue'
</script>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust as needed */
}
</style>