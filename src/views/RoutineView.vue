<template>
  <div class="p-2 flex">
    <TodoList v-for="category in fixedCategories" :title="category" :list="catagorizedTask[category]" :key="category" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import TodoList from '../components/TodoListView.vue'
import { useUserStore } from '../stores/user'
import axios from '../plugins/axios';

const userStore = useUserStore();
const userMail = ref<string>()

interface Task {
  id: string,
  text: string,
  status: boolean,
  mail: string,
  category: string
}

const fixedCategories = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']

const catagorizedTask = ref<Record<string, Array<Task>>>({})



const getTasksByMail = async () => {
  const url = `/api/tasks/${userMail.value}`
  try {
    const resp = await axios.get(url)
    resp.data.results?.forEach((ele: Task) => {
      if (!catagorizedTask.value[ele.category]) catagorizedTask.value[ele.category] = []
      catagorizedTask.value[ele.category].push(ele)
    })
    console.log(catagorizedTask.value)
  } catch (e) {
    console.log(e)
  }
}

watch(() => userStore.user, (newUser) => {
  userMail.value = newUser?.mail
  if (userMail.value)
    getTasksByMail()

}, { immediate: true });
</script>
