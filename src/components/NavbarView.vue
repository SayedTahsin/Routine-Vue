<template>
    <nav class="bg-white dark:bg-gray-800 p-4 shadow-md flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800 dark:text-white">Routine</h1>

        <div v-if="userInfo.mail" class="flex items-center gap-4">
            <button @click="openModal" class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                +
            </button>

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

            <div class="relative flex items-center gap-2">
                <img :src="userInfo.photoUrl" alt="User avatar" class="w-8 h-8 rounded-full" :key="userInfo.photoUrl" />

                <span @click="toggleDropdown" class="cursor-pointer text-gray-800 dark:text-white">
                    {{ userInfo.name }}
                    <div v-if="showDropdown"
                        class="absolute ml-16 mt-6 w-32 opacity-90 bg-white dark:bg-gray-800 shadow-lg rounded-b-md z-10">
                        <button @click="logout"
                            class="w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            Logout
                        </button>
                    </div>
                </span>


            </div>
        </div>
    </nav>

    <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Create New Task</h2>

            <label class="block text-gray-600 dark:text-gray-300 mb-2">Category</label>
            <input v-model="newTask.category" type="text"
                class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
                placeholder="Enter category" />

            <label class="block text-gray-600 dark:text-gray-300 mb-2">Task</label>
            <input v-model="newTask.text" type="text"
                class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
                placeholder="Enter task description" />

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
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user';
import axios from '../plugins/axios';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const userInfo = ref({
    mail: '',
    photoUrl: '/profile.jpg',
    name: ''
});

watch(() => userStore.user, (newUser) => {
    userInfo.value = {
        mail: newUser?.mail || '',
        photoUrl: newUser?.photoUrl || '',
        name: newUser?.name || ''
    };
}, { immediate: true });

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

const showModal = ref(false)
const newTask = ref({ category: '', text: '' })

function openModal() {
    showModal.value = true
}

function closeModal() {
    showModal.value = false
    newTask.value = { category: '', text: '' }
}

const addTask$api = async (text: string, category: string) => {
    const url = `/api/tasks`
    const body = {
        text,
        category,
        mail: userInfo.value.mail
    }
    try {
        await axios.post(url, body)
    } catch (e) {
        console.log(e)
    }
}

function addTask() {
    if (newTask.value.category.trim() && newTask.value.text.trim()) {
        addTask$api(newTask.value.text.trim(), newTask.value.category.trim().toUpperCase())
        closeModal()
    }
}

const showDropdown = ref(false)
function toggleDropdown() {
    showDropdown.value = !showDropdown.value
}

async function logout() {
    try {
        await axios.post('/auth/logout')
        showDropdown.value = false
        userInfo.value.mail = ''
        router.replace('login')
    } catch (error) {
        console.error('Error logging out:', error)
    }
}
</script>

<style scoped></style>
