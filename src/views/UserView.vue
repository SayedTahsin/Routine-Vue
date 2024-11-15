<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '@/stores/user'
import { getCookie } from 'tiny-cookie'
import axios from '../plugins/axios'
const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  try {
    const token = getCookie('ROUTINEAPP')
    if (token) {
      const decoded = jwtDecode<{
        name: string
        mail: string
        photoUrl: string
      }>(token)
      const resp = await axios.get(`/api/users/${decoded.mail}`)
      userStore.setUser({
        mail: resp.data?.mail,
        name: resp.data?.name,
        photoUrl: resp.data?.photoUrl,
        completedTasks: resp.data?.completedTasks,
        totalTasks: resp.data?.totalTasks,
      })
      router.push({ name: 'routine' })
    } else {
      router.push({ name: 'login' })
    }
  } catch (e) {
    console.error(e)
    router.push({ name: 'login' })
  }
})
</script>
