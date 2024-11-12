<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/NavbarView.vue'
import Footer from './components/FooterView.vue'
import { provide, ref } from 'vue'

const triggerReloadFromNavbar = ref(0)

provide('triggerReload', triggerReloadFromNavbar)

const triggerReload = () => {
  triggerReloadFromNavbar.value++
}
</script>

<template>
  <div
    class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
    <Navbar @reload="triggerReload" />
    <main class="flex-grow p-4 md:p-6 lg:p-8">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
