<template>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 w-72 h-80 mx-[1px] flex flex-col">
        <div class="flex items-center justify-between mb-2">
            <h2 class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">{{ title }}</h2>
        </div>
        <hr class=" mb-2">
        <ul class="space-y-2 flex-grow overflow-y-auto w-full">
            <li v-for="n in 4" :key="n" class="flex items-center gap-2 p-1 rounded bg-gray-100 dark:bg-gray-700">
                <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div class="flex-grow h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </li>
        </ul>
        <div class="mt-4 flex items-center gap-1 w-full h-8">
            <div class="flex-grow h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>

<style scoped>
@keyframes skeleton-loading {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

.bg-gray-200,
.bg-gray-300,
.bg-gray-100 {
    background: linear-gradient(90deg, #f3f3f3 25%, #e2e2e2 50%, #f3f3f3 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
}

.dark .bg-gray-700,
.dark .bg-gray-600 {
    background: linear-gradient(90deg, #4a4a4a 25%, #3b3b3b 50%, #4a4a4a 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
}
</style>
