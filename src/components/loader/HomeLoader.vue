<template>
  <div class="relative w-full h-1 overflow-hidden">
    <div class="absolute h-full bg-blue-500 animate-glow-loader"></div>
  </div>
</template>

<style scoped>
@keyframes glow {
  0% {
    transform: translateX(-100%);
    opacity: 0.2;
  }

  50% {
    transform: translateX(0);
    opacity: 0.8;
  }

  100% {
    transform: translateX(100%);
    opacity: 0.2;
  }
}

.animate-glow-loader {
  animation: glow 1.5s infinite linear;
  width: 150%;
}
</style>
