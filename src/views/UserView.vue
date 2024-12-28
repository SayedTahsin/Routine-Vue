<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApis } from '../composable/api'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const router = useRouter()
const { fetchAndSetUser } = useApis()

onMounted(async () => {
  onAuthStateChanged(auth, async user => {
    if (user) {
      await fetchAndSetUser()
      router.push({ name: 'routine' })
    } else {
      router.push({ name: 'login' })
    }
  })
})
</script>
