<template>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 max-w-md mx-auto">
        <!-- Title -->
        <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">{{ title }}</h2>

        <!-- To-do List -->
        <ul class="space-y-2">
            <li v-for="(item, index) in list" :key="index"
                class="flex items-center gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400"
                    v-model="item.completed" />
                <span :class="{ 'line-through text-gray-500 dark:text-gray-400': item.completed }">
                    {{ item.text }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// Define props for the title and list
const props = defineProps<{
    title: string
    list: { text: string; completed: boolean }[]
}>()
</script>

<style scoped></style>