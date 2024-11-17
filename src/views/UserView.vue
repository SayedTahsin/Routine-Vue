<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import { getCookie } from 'tiny-cookie'
import { useApis } from '../composable/api'

const router = useRouter()
const { fetchAndSetUser } = useApis()

onMounted(async () => {
  try {
    const token = getCookie('ROUTINEAPP')
    if (token) {
      const decoded = jwtDecode<{
        name: string
        mail: string
        photoUrl: string
      }>(token)
      fetchAndSetUser(decoded.mail)
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
