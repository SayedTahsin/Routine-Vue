<template>
  <div
    class="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900"
  >
    <h1 class="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
    <p class="text-xl text-gray-600 dark:text-gray-400 mt-4">Page Not Found</p>
    <router-link
      to="/"
      class="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Go Home
    </router-link>
  </div>
</template>
