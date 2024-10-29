<template>
    <nav class="bg-white dark:bg-gray-800 p-4 shadow-md flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800 dark:text-white">Routine</h1>

        <div class="flex items-center gap-4">
            <!-- Add Task Button -->
            <button @click="openModal" class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                +
            </button>

            <!-- Dark Mode Toggle -->
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

            <!-- Consistency Badge -->
            <span class="text-xs bg-blue-500 text-white py-1 px-2 rounded-full">
                Consistency: 85%
            </span>

            <!-- User Info -->
            <div class="flex items-center gap-2">
                <img src="/profile.jpg" alt="User avatar" class="w-8 h-8 rounded-full" />
                <span class="text-gray-800 dark:text-white">John Doe</span>
            </div>
        </div>
    </nav>

    <!-- Task Creation Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Create New Task</h2>

            <!-- Task Category Input -->
            <label class="block text-gray-600 dark:text-gray-300 mb-2">Category</label>
            <input v-model="newTask.category" type="text"
                class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
                placeholder="Enter category" />

            <!-- Task Text Input -->
            <label class="block text-gray-600 dark:text-gray-300 mb-2">Task</label>
            <input v-model="newTask.text" type="text"
                class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
                placeholder="Enter task description" />

            <!-- Modal Actions -->
            <div class="flex justify-end gap-2">
                <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                    Cancel
                </button>
                <button @click="addTask" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Add Task
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// State for dark mode toggle
const isDarkMode = ref(false)
function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

// Initialize dark mode on mount
onMounted(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDarkMode.value = true
        document.documentElement.classList.add('dark')
    }
})

// Modal management for adding tasks
const showModal = ref(false)
const newTask = ref({ category: '', text: '' })

function openModal() {
    showModal.value = true
}

function closeModal() {
    showModal.value = false
    newTask.value = { category: '', text: '' }  // Reset input fields
}

function addTask() {
    if (newTask.value.category.trim() && newTask.value.text.trim()) {
        console.log('New Task Added:', newTask.value) // Replace with your logic
        closeModal()  // Close modal after adding
    }
}
</script>

<style scoped></style>
