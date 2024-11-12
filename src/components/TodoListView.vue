<template>
  <div
    :class="[
      'task-card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 mx-1 w-72 h-80 flex flex-col transition-transform duration-500 ease-out',
      isToday() ? 'highlighted scale-105 mx-4 translate-y-1' : '',
      'hover:scale-110 hover:translate-y-1 hover:z-90',
    ]"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {{ title }}
      </h2>
      <span v-if="isToday()" class="text-xs text-gray-500 dark:text-gray-400">
        Resets at 12:00 AM
      </span>
    </div>
    <hr class="mb-1" />
    <ul class="space-y-1 flex-grow overflow-y-auto w-full">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="task-item flex items-center justify-between gap-2 p-1 rounded border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-1">
          <input
            type="checkbox"
            class="h-4 w-4 text-blue-600 dark:text-blue-400"
            :checked="item.status"
            :disabled="isDisabled()"
            @change="() => updateTask(item.id, !item.status)"
          />

          <template v-if="editTaskId === item.id">
            <input
              type="text"
              v-model="updatedText"
              @keydown.enter="updateTask(item.id, item.status, updatedText)"
              class="text-sm border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 p-1"
            />
          </template>
          <template v-else>
            <div>
              <span
                @dblclick="editText(item.id, item.text)"
                :class="{
                  'line-through text-gray-500 dark:text-gray-400': item.status,
                }"
                class="text-sm"
              >
                {{ item.text }}
              </span>
            </div>
          </template>
        </div>
        <button @click="deleteTask(item.id)" class="delete-btn text-xs">
          ❌
        </button>
      </li>
    </ul>
    <div class="w-full mt-2 flex items-center justify-center">
      <div
        v-if="showInput"
        :class="{ 'pointer-events-none opacity-50': isLoading }"
        class="flex gap-1 items-center w-full h-8"
      >
        <input
          type="text"
          v-model="newTaskText"
          placeholder="Task"
          @keydown.enter="addTask"
          class="flex-grow p-1 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <button
          @click="addTask"
          class="confirm-btn w-8 h-8 rounded flex items-center justify-center"
        >
          <span v-if="isLoading" class="dual-ring-loader"></span>
          <span v-else>✅</span>
        </button>
        <button
          @click="cancelAddTask"
          class="cancel-btn w-8 h-8 rounded flex items-center justify-center"
        >
          ❌
        </button>
      </div>
      <button
        v-else
        @click="showInput = true"
        class="add-btn w-full h-8 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
      >
        Add New Task
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import type { Task } from '@/types/Task'
import axios from '../plugins/axios'

const props = defineProps<{
  title: string
  list?: Array<Task>
}>()

const emit = defineEmits(['reload'])
const toast = useToast()
const userStore = useUserStore()
const showInput = ref(false)
const newTaskText = ref('')
const editTaskId = ref<string | null>(null)
const updatedText = ref('')
const userMail = ref()
const isLoading = ref(false)

function editText(taskId: string, currentText: string) {
  editTaskId.value = taskId
  updatedText.value = currentText
}

async function addTask() {
  isLoading.value = true
  if (newTaskText.value === '') {
    toast.info('Cannot add empty tasks')
    return
  }
  const url = '/api/tasks'
  try {
    await axios.post(url, {
      text: newTaskText.value,
      category: props.title,
      mail: userMail.value,
    })
    toast.success('Task added successfully')
    emit('reload')
  } catch (e) {
    toast.error('Task addition failed')
    console.log(e)
  }
  newTaskText.value = ''
  showInput.value = false
  isLoading.value = false
}

function cancelAddTask() {
  newTaskText.value = ''
  showInput.value = false
}

async function deleteTask(id: string) {
  const url = `/api/tasks/${id}`
  try {
    await axios.delete(url)
    toast.success('Task deleted successfully')
    emit('reload')
  } catch (e) {
    toast.error('Task deletion failed')
    console.log(e)
  }
}

async function updateTask(id: string, status?: boolean, text?: string) {
  const url = `/api/tasks/${id}`
  try {
    await axios.put(url, { status, text })
    toast.success('Task updated successfully')
    emit('reload')
  } catch (e) {
    toast.error('Task update failed')
    console.log(e)
  }
  editTaskId.value = null
  updatedText.value = ''
}

const weekdayNames = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
]

const isToday = () => {
  const today = new Date()
  const weekdayNumber = today.getDay()

  const weekdayName = weekdayNames[weekdayNumber]
  return weekdayName === props.title
}

const isDisabled = () => {
  if (!weekdayNames.includes(props.title)) {
    return false
  } else {
    return !isToday()
  }
}

watch(
  () => userStore.user,
  newUser => {
    userMail.value = newUser?.mail
  },
  { immediate: true },
)
</script>

<style scoped>
.task-card {
  transition: box-shadow 0.3s ease;
}

.task-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.task-card.highlighted {
  box-shadow: 0 0 15px rgba(84, 155, 214, 0.6);
}

.task-item {
  border: 1px solid var(--border-color);
}

.add-btn,
.confirm-btn,
.cancel-btn,
.delete-btn {
  transition: background-color 0.2s ease;
}

.confirm-btn:hover,
.cancel-btn:hover,
.delete-btn:hover {
  background-color: var(--hover-color);
}

.dual-ring-loader {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 3px solid transparent;
  border-top: 3px solid #3498db;
  border-right: 3px solid #3498db;
  border-radius: 50%;
  animation: dual-ring-spin 0.8s linear infinite;
}

@keyframes dual-ring-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
