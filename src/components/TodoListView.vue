<template>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 w-72 h-80 mx-[1px] flex flex-col">
        <h2 class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">{{ title }}</h2>

        <!-- List of tasks with scrollable overflow -->
        <ul class="space-y-1 flex-grow overflow-y-auto w-full">
            <li v-for="(item, index) in list" :key="index"
                class="flex items-center justify-between gap-2 p-1 rounded border border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-1">
                    <input type="checkbox" class="h-4 w-4 text-blue-600 dark:text-blue-400" v-model="item.status" />
                    <span :class="{ 'line-through text-gray-500 dark:text-gray-400': item.status }" class="text-sm">
                        {{ item.text }}
                    </span>
                </div>
                <button @click="deleteTask(index)" class="hover:bg-gray-100 text-xs">
                    ❌
                </button>
            </li>
        </ul>

        <!-- Bottom section with fixed width to prevent layout shift -->
        <div class="w-full mt-2 flex items-center justify-center">
            <div v-if="showInput" class="flex gap-1 items-center w-full h-8">
                <input type="text" v-model="newTaskText" placeholder="Task"
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
import { defineProps, ref } from 'vue'


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

const showInput = ref(false)
const newTaskText = ref('')

function addTask() {
    if (newTaskText.value.trim()) {
        props.list.push({ text: newTaskText.value, completed: false })
        newTaskText.value = ''
        showInput.value = false
    }
}

function cancelAddTask() {
    newTaskText.value = ''
    showInput.value = false
}

function deleteTask(index: number) {
    props.list.splice(index, 1)
}
</script>
<style></style>