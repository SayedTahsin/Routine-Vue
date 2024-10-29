<template>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 max-w-md mx-auto">
        <!-- Title -->
        <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">{{ title }}</h2>

        <!-- To-do List -->
        <ul class="space-y-2 mb-4">
            <li v-for="(item, index) in list" :key="index"
                class="flex items-center justify-between gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-2">
                    <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400"
                        v-model="item.completed" />
                    <span :class="{ 'line-through text-gray-500 dark:text-gray-400': item.completed }">
                        {{ item.text }}
                    </span>
                </div>
                <button @click="deleteTask(index)" class="text-red-500 hover:text-red-700">
                    &#10005; <!-- Cross icon for delete -->
                </button>
            </li>
        </ul>

        <!-- Add New Task Section -->
        <div v-if="showInput" class="flex gap-2 items-center mb-4">
            <input type="text" v-model="newTaskText" placeholder="Enter new task"
                class="flex-grow p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            <button @click="addTask" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add
            </button>
            <button @click="cancelAddTask" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                Cancel
            </button>
        </div>

        <!-- Show Add New Button if Input is Hidden -->
        <button v-else @click="showInput = true"
            class="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            <span>+</span> <span>Add New Task</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

// Define props for the title and list
const props = defineProps<{
    title: string
    list: { text: string; completed: boolean }[]
}>()

const showInput = ref(false)
const newTaskText = ref('')

// Function to add a new task
function addTask() {
    if (newTaskText.value.trim()) {
        props.list.push({ text: newTaskText.value, completed: false })
        newTaskText.value = ''
        showInput.value = false
    }
}

// Function to cancel adding a new task
function cancelAddTask() {
    newTaskText.value = ''
    showInput.value = false
}

// Function to delete a task
function deleteTask(index: number) {
    props.list.splice(index, 1)
}
</script>

<style scoped></style>