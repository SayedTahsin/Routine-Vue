<template>
    <nav class="bg-white dark:bg-gray-800 p-4 shadow-md flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800 dark:text-white">Routine</h1>

        <div class="flex items-center gap-4">
            <button @click="toggleDarkMode"
                class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-300"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-800" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M17.293 13.293A8 8 0 118.707 2.707a8 8 0 018.586 10.586zM10 18a8 8 0 100-16 8 8 0 000 16z"
                        clip-rule="evenodd" />
                </svg>
            </button>

            <span class="text-xs bg-blue-500 text-white py-1 px-2 rounded-full">
                Consistency: 85%
            </span>

            <div class="flex items-center gap-2">
                <img src="/profile.jpg" alt="User avatar" class="w-8 h-8 rounded-full" />
                <span class="text-gray-800 dark:text-white">John Doe</span>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

onMounted(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDarkMode.value = true
        document.documentElement.classList.add('dark')
    }
})
</script>

<style scoped></style>