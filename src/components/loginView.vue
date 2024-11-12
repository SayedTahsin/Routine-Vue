<template>
  <div
    class="login-component flex items-center justify-center h-screen bg-background-light dark:bg-background-dark"
  >
    <button
      @click="signInWithGoogle"
      :disabled="isLoading"
      class="flex items-center px-4 py-2 space-x-2 border border-border-light rounded-md shadow-sm hover:bg-background-hover dark:hover:bg-background-dark-hover dark:bg-surface-dark dark:border-border-dark transition-colors"
    >
      <img
        v-if="!isLoading"
        src="/google.png"
        alt="Google icon"
        class="w-5 h-5"
      />
      <SignInLoader v-if="isLoading" />
      <span class="text-text-light dark:text-text-dark font-medium">
        {{ isLoading ? 'Signing in...' : 'Sign in with Google' }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from '../plugins/axios'
import { useUserStore } from '@/stores/user'
import { auth, provider } from '@/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import SignInLoader from './loader/SignInLoader.vue'
import { ref } from 'vue'

const toast = useToast()
const router = useRouter()
const userStore = useUserStore()
const isLoading = ref(false)

async function signInWithGoogle() {
  isLoading.value = true
  try {
    const result = await signInWithPopup(auth, provider)
    const googleUser = result.user
    const userPayload = {
      mail: googleUser.email || '',
      photoUrl: googleUser.photoURL || '',
      name: googleUser.displayName || '',
    }

    await axios.post('api/users', userPayload, {
      withCredentials: true,
    })

    await axios.post('auth/login', userPayload, {
      withCredentials: true,
    })

    toast.success('Login Successful')
    userStore.setUser(userPayload)
    router.replace({ name: 'routine' })
  } catch (err: unknown) {
    toast.error('Login failed')
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>
