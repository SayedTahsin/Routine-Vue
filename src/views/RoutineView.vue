<template>
  <div class="p-2 flex" v-if="isLoading">
    <TodoSkelaonLoader v-for="category in fixedCategories" :key="category" :title="category" />
  </div>
  <div v-else>
    <div class="p-2 flex">
      <TodoList v-for="category in fixedCategories" :title="category" :list="catagorizedTask[category]"
        :key="category + '-' + relaodCount" @reload="getTasksByMail" />
    </div>
    <div class="p-2 flex">
      <TodoList v-for="category in categoriesWOWeeks" :title="category" :list="catagorizedTask[category]"
        :key="category + '-' + relaodCount" @reload="getTasksByMail" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { useUserStore } from '../stores/user'
import type { Task } from '@/types/Task';
import TodoList from '../components/TodoListView.vue'
import axios from '../plugins/axios';
import TodoSkelaonLoader from '@/components/loader/TodoSkelaonLoader.vue';

const fixedCategories = ['SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
const userStore = useUserStore();
const userMail = ref<string>()
const catagorizedTask = ref<Record<string, Array<Task>>>({})
const categoriesWOWeeks = ref<Array<string>>([])
const relaodCount = ref(0)
const triggerReload = inject<number>('triggerReload', 0)
const triggerReloadFromNavbar = ref(triggerReload)
const isLoading = ref(false)

const getTasksByMail = async () => {
  isLoading.value = true
  catagorizedTask.value = {}
  categoriesWOWeeks.value = []
  const url = `/api/tasks/${userMail.value}`

  try {
    const resp = await axios.get(url)

    resp.data.results?.forEach((ele: Task) => {
      if (!catagorizedTask.value[ele.category]) catagorizedTask.value[ele.category] = []
      catagorizedTask.value[ele.category].push(ele)
    })

    Object.keys(catagorizedTask.value).forEach((val) => {
      if (!fixedCategories.includes(val)) categoriesWOWeeks.value.push(val)
    })
  } catch (e) {
    console.log(e)
  }
  relaodCount.value++
  isLoading.value = false
}

watch(triggerReloadFromNavbar, () => {
  getTasksByMail()
})

watch(() => userStore.user, (newUser) => {
  userMail.value = newUser?.mail
  if (userMail.value)
    getTasksByMail()
}, { immediate: true });

</script>
