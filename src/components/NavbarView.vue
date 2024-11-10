<template>
    <nav class="bg-white dark:bg-gray-800 p-4 shadow-md flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800 dark:text-white">Routine</h1>

        <div v-if="userInfo.mail" class="flex items-center gap-4">
            <button @click="openModal" class="p-2 rounded-lg">
                ➕
            </button>

            <button @click="toggleDarkMode" class="p-2 rounded-full ">
                <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true" role="img" class="icon" width="20px" height="20px" viewBox="0 0 128 128">
                    <path fill="#FCC11A"
                        d="M37.41 41.95c-9.71 12.48-9.54 34.65 2.87 45.64c14.09 12.47 33.92 12.34 46.39.87c14.95-13.76 14.09-36.66.87-49.63c-13.29-13.04-37.04-13.72-50.13 3.12">
                    </path>
                    <path fill="#FEE269"
                        d="M53 37.67c-3.84-1.7-8.04 2.93-9.87 6.09c-1.83 3.17-3.53 9.38.37 10.97c3.9 1.58 6.7-1.1 9.51-5.73c2.79-4.63 4.38-9.38-.01-11.33">
                    </path>
                    <path fill="#FFA722"
                        d="M63 20.27c-.93 1.74-.62 3.08 1.23 3.52c1.85.44 13.36 2.31 14.33 2.37c1.41.09 1.93-.97 1.76-2.2c-.18-1.23-2.99-18.46-3.25-20.04S75.14.76 73.55 2.87S63.7 18.96 63 20.27m29.8 11.96c-1.81.56-1.76 1.67-.79 3.08c.97 1.41 7.65 11.6 8.26 12.31c.62.7 1.67.88 2.55-.18c.88-1.05 11.86-16.45 12.66-17.41c1.32-1.58.53-3.25-1.49-2.73c-1.54.41-20.05 4.58-21.19 4.93m13.8 29.63c-1.3-.74-2.99-.53-3.43 1.14c-.44 1.67-2.37 13.8-2.55 14.86s.62 2.11 1.93 1.85s19.45-2.95 20.66-3.25c2.11-.53 2.81-2.64.62-4.22c-1.42-1.03-16-9.68-17.23-10.38M92.09 90.6c1.4-.75 2.64-.18 2.99 1.41c.35 1.58 4.22 17.76 4.84 20.75c.31 1.5-1.41 2.73-2.81 1.85c-1.41-.88-16.69-11.53-17.67-12.4c-1.41-1.23-.43-2.51.26-3.16c1.4-1.33 11.07-7.74 12.39-8.45m-42.55 8.88c-1.77-.17-2.29 1.41-2.02 2.81c.26 1.41 2.9 19.24 3.08 20.57c.26 1.93 2.29 2.73 3.6.79s10.35-16.4 11.08-17.76c1.32-2.46.35-2.99-.97-3.6c-1.31-.61-12.92-2.63-14.77-2.81M24.23 79c1.23-2.02 2.81-1.49 3.96.44c.78 1.32 7.38 10.2 8 11.16c.62.97.88 2.81-1.05 3.25c-1.95.45-17.68 4.58-20.14 5.02c-2.46.44-3.87-1.49-2.29-3.6c.92-1.24 10.82-15.12 11.52-16.27m-3.34-15.3c2.25 1 3.31.64 3.78-.97c.62-2.11 2.46-11.78 2.55-13.98c.06-1.43-.53-2.81-2.73-2.46S6.47 48.85 4.45 49.55c-2.35.82-2.18 3.4-.62 4.22c1.85.97 15.47 9.23 17.06 9.93m27.34-36.92c1.27-1.01.88-2.46-.26-3.25c-1.14-.79-15.26-11-17.05-12.4c-1.58-1.23-3.52-.79-2.99 2.02c.38 2.02 4.88 19.7 5.19 20.92c.35 1.41 1.41 2.11 2.64 1.23c1.21-.87 11.15-7.46 12.47-8.52">
                    </path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true" role="img" class="icon" width="20px" height="20px" viewBox="0 0 48 48">
                    <path fill="#2F88FF" stroke="#000" stroke-linejoin="round" stroke-width="4"
                        d="M28.0527 4.41085C22.5828 5.83695 18.5455 10.8106 18.5455 16.7273C18.5455 23.7564 24.2436 29.4545 31.2727 29.4545C37.1894 29.4545 42.1631 25.4172 43.5891 19.9473C43.8585 21.256 44 22.6115 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C25.3885 4 26.744 4.14149 28.0527 4.41085Z">
                    </path>
                </svg>
            </button>

            <span class="text-xs bg-blue-500 text-white py-1 px-2 rounded-full">
                Consistency: 85%
            </span>

            <div class="relative flex items-center gap-2">
                <!-- <img :src="userInfo.photoUrl" alt="User avatar" class="w-8 h-8 rounded-full" :key="userInfo.photoUrl" /> -->

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

            <label class="block text-gray-600 dark:text-gray-300 mb-2">Task</label>
            <input v-model="newTask.text" type="text"
                class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
                placeholder="Enter Task" />

            <label class="block text-gray-600 dark:text-gray-300 mb-2">Category</label>
            <input v-model="newTask.category" type="text" list="categories"
                class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
                placeholder="Enter Category or select a weekday" />

            <datalist id="categories">
                <option value="Sunday"></option>
                <option value="Monday"></option>
                <option value="Tuesday"></option>
                <option value="Wednesday"></option>
                <option value="Thursday"></option>
                <option value="Friday"></option>
                <option value="Saturday"></option>
            </datalist>

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
import { useRouter } from 'vue-router';
import axios from '../plugins/axios';
import { useToast } from 'vue-toastification';

const userStore = useUserStore();
const router = useRouter();
const toast = useToast()
const isDarkMode = ref(false)
const showModal = ref(false)
const showDropdown = ref(false)
const newTask = ref({ category: '', text: '' })
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

onMounted(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDarkMode.value = true
        document.documentElement.classList.add('dark')
    }
})

function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

function openModal() {
    showModal.value = true
}

function closeModal() {
    showModal.value = false
    newTask.value = { category: '', text: '' }
}

const emit = defineEmits(['reload'])


const addTask$api = async (text: string, category: string) => {
    const url = `/api/tasks`
    const body = {
        text,
        category,
        mail: userInfo.value.mail
    }
    try {
        await axios.post(url, body)
        toast.success('Operation Successfull')
        emit('reload')
    } catch (e) {
        toast.error('Operation Failed')
        console.log(e)
    }
}


function addTask() {
    if (newTask.value.category.trim() && newTask.value.text.trim()) {
        addTask$api(newTask.value.text.trim(), newTask.value.category.trim().toUpperCase())
        closeModal()
    }
}

function toggleDropdown() {
    showDropdown.value = !showDropdown.value
}

async function logout() {
    try {
        await axios.post('/auth/logout')
        showDropdown.value = false
        userInfo.value.mail = ''
        toast.success('Logout Successfull')
        router.replace('login')
    } catch (error) {
        toast.error('Logout failed')
        console.error('Error logging out:', error)
    }
}
</script>

<style scoped></style>
