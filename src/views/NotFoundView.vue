<template>
  <div
    class="flex flex-col items-center justify-center h-screen bg-background-light dark:bg-background-dark"
  >
    <h1 class="text-6xl font-bold text-primary dark:text-primary-dark">404</h1>
    <p class="text-xl text-muted dark:text-muted-dark mt-4">Page Not Found</p>
    <router-link
      to="/"
      class="mt-6 px-4 py-2 bg-primary dark:bg-primary-dark text-xl rounded-lg hover:bg-accent-hover transition-colors"
    >
      Go Home
    </router-link>
  </div>
</template>
