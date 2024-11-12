<template>
  <nav
    class="bg-background-light dark:bg-background-dark p-4 shadow-md flex justify-between items-center"
  >
    <h1
      class="text-xl font-mono text-primary dark:text-primary-dark transition-transform transform duration-300 ease-in-out hover:scale-110"
    >
      Routine
    </h1>

    <div class="flex items-center gap-4">
      <button
        @click="toggleDarkMode"
        class="p-2 rounded-full text-text-light dark:text-text-dark transition-transform transform duration-300 ease-in-out hover:scale-110"
      >
        <DarkMode v-if="isDarkMode" />
        <LightMode v-else />
      </button>

      <button
        v-if="userInfo.mail"
        @click="openModal"
        class="p-2 rounded-lg hover:bg-slate-200 transition-transform transform duration-300 ease-in-out hover:scale-110"
      >
        ➕
      </button>

      <span
        v-if="userInfo.mail"
        class="text-xs bg-primary dark:bg-primary-dark text-white py-1 px-2 rounded-full transition-transform transform duration-300 ease-in-out hover:scale-110"
      >
        Consistency: {{ ' ' + consistency + '%' }}
      </span>

      <div v-if="userInfo.mail" class="relative flex items-center gap-2">
        <span
          @click="toggleDropdown"
          class="cursor-pointer ml-4 text-lg text-text-light dark:text-text-dark transition-transform transform duration-300 ease-in-out hover:scale-110"
        >
          {{ userInfo.name }}
        </span>
        <div
          v-if="showDropdown"
          class="absolute ml-20 mt-20 w-32 bg-background-light dark:bg-background-dark shadow-lg rounded-md z-10"
        >
          <button
            @click="logout"
            class="w-full text-right px-2 py-2 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-900"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-lg w-80"
    >
      <h2 class="text-xl font-bold text-text-light dark:text-text-dark mb-4">
        Create New Task
      </h2>

      <label class="block text-muted dark:text-gray-300 mb-2">Task</label>
      <input
        v-model="newTask.text"
        type="text"
        class="w-full p-2 border border-muted rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
        placeholder="Enter Task"
      />

      <label class="block text-muted dark:text-gray-300 mb-2">Category</label>
      <input
        v-model="newTask.category"
        type="text"
        list="categories"
        class="w-full p-2 border border-muted rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
        placeholder="Enter Category or select a weekday"
      />
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
        <button
          @click="closeModal"
          class="px-4 py-2 bg-muted text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          @click="addTask"
          class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Add Task
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios from '../plugins/axios'
import DarkMode from './icons/DarkMode.vue'
import LightMode from './icons/LightMode.vue'

const emit = defineEmits(['reload'])

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()
const isDarkMode = ref(false)
const showModal = ref(false)
const showDropdown = ref(false)
const newTask = ref({ category: '', text: '' })
const consistency = computed(() => {
  if (userInfo.value.totalTasks == 0) return '0.0'
  else {
    const percentage = userInfo.value.completedTask / userInfo.value.totalTasks
    return parseFloat(percentage.toFixed(2)) * 100
  }
})
const userInfo = ref({
  mail: '',
  photoUrl: '/profile.jpg',
  name: '',
  totalTasks: 0,
  completedTask: 0,
})

watch(
  () => userStore.user,
  newUser => {
    userInfo.value = {
      mail: newUser?.mail || '',
      photoUrl: newUser?.photoUrl || '',
      name: newUser?.name || '',
      completedTask: newUser?.completedTasks || 0,
      totalTasks: newUser?.totalTasks || 0,
    }
  },
  { immediate: true },
)

onMounted(() => {
  const storedTheme = localStorage.getItem('darkMode')
  if (storedTheme) {
    isDarkMode.value = storedTheme === 'true'
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  } else if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('darkMode', isDarkMode.value.toString())
}

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
    mail: userInfo.value.mail,
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
    addTask$api(
      newTask.value.text.trim(),
      newTask.value.category.trim().toUpperCase(),
    )
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
