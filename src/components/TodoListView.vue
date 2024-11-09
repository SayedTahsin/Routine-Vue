<template>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 w-72 h-80 mx-[1px] flex flex-col">
        <h2 class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">{{ title }}</h2>

        <!-- List of tasks with scrollable overflow -->
        <ul class="space-y-1 flex-grow overflow-y-auto w-full">
            <li v-for="(item, index) in list" :key="index"
                class="flex items-center justify-between gap-2 p-1 rounded border border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-1">
                    <input type="checkbox" class="h-4 w-4 text-blue-600 dark:text-blue-400" :checked="item.status"
                        @change="() => updateTask(item.id, !item.status)" />

                    <!-- Editable span: toggle to input when double-clicked -->
                    <template v-if="editTaskId === item.id">
                        <input type="text" v-model="updatedText"
                            @keydown.enter="updateTask(item.id, item.status, updatedText)"
                            class="text-sm border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 p-1" />
                    </template>
                    <template v-else>
                        <span @dblclick="editText(item.id, item.text)"
                            :class="{ 'line-through text-gray-500 dark:text-gray-400': item.status }" class="text-sm">
                            {{ item.text }}
                        </span>
                    </template>
                </div>
                <button @click="deleteTask(item.id)" class="hover:bg-gray-100 text-xs">
                    ❌
                </button>
            </li>
        </ul>

        <!-- Bottom section with fixed width to prevent layout shift -->
        <div class="w-full mt-2 flex items-center justify-center">
            <div v-if="showInput" class="flex gap-1 items-center w-full h-8">
                <input type="text" v-model="newTaskText" placeholder="Task" @keydown.enter="addTask"
                    class="flex-grow p-1 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                <button @click="addTask"
                    class="w-8 h-8 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center">
                    ✅
                </button>
                <button @click="cancelAddTask"
                    class="w-8 h-8 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center">
                    ❌
                </button>
            </div>
            <!-- Add New Task button with same width and alignment as input section -->
            <button v-else @click="showInput = true"
                class="w-full h-8 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
                Add New Task
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import axios from '../plugins/axios';
import { useUserStore } from '@/stores/user';

interface Task {
    id: string,
    text: string,
    status: boolean,
    mail: string,
    category: string
}

const props = defineProps<{
    title: string
    list?: Array<Task>
}>()

const emit = defineEmits(['reload'])

const showInput = ref(false)
const newTaskText = ref('')
const editTaskId = ref<string | null>(null) // Track which task is being edited
const updatedText = ref('') // Store the updated text for editing

// Method to handle editing text
function editText(taskId: string, currentText: string) {
    editTaskId.value = taskId
    updatedText.value = currentText
}

// Method to handle adding a new task
async function addTask() {
    const url = "/api/tasks"
    try {
        await axios.post(url, {
            text: newTaskText.value,
            category: props.title,
            mail: userMail.value
        })
        emit('reload')
    } catch (e) {
        console.log(e)
    }
    newTaskText.value = ''
    showInput.value = false
}

// Method to cancel task creation
function cancelAddTask() {
    newTaskText.value = ''
    showInput.value = false
}

// Method to delete task
async function deleteTask(id: string) {
    const url = `/api/tasks/${id}`
    try {
        await axios.delete(url)
        emit('reload')
    } catch (e) {
        console.log(e)
    }
}

// Method to update task text
async function updateTask(id: string, status?: boolean, text?: string) {
    const url = `/api/tasks/${id}`
    try {
        await axios.put(url, { status, text })
        emit('reload')
    } catch (e) {
        console.log(e)
    }
    // Reset editing state
    editTaskId.value = null
    updatedText.value = ''
}

const userStore = useUserStore();
const userMail = ref()
watch(() => userStore.user, (newUser) => {
    userMail.value = newUser?.mail
}, { immediate: true });
</script>

<style scoped></style>