<template>
  <div class="p-4">
    <TodoList title="My Tasks" :list="tasks" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TodoList from '../components/TodoListView.vue'

const tasks = ref([
  { text: 'Learn Vue 3', completed: false },
  { text: 'Build a to-do list', completed: false },
  { text: 'Read about Tailwind CSS', completed: true },
])
</script>
