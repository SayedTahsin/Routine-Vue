<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/NavbarView.vue'
import Footer from './components/FooterView.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
