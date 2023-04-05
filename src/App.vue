<script setup>
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div id="app">
    <AppHeader />
    <div class="container mt-3">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
<style>
.error-feedback {
  font-size: 12px;
  color: red;
}
</style>
