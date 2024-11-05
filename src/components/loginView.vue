<template>
    <div class="login-component flex items-center justify-center h-screen">
        <button @click="signInWithGoogle"
            class="flex items-center px-4 py-2 space-x-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-600">
            <img src="/google.png" alt="Google icon" class="w-5 h-5" />
            <span class="text-gray-700 dark:text-gray-200 font-medium">
                Sign in with Google
            </span>
        </button>
    </div>
</template>

<script setup lang="ts">
import axios from '../plugins/axios';
import { useUserStore } from '@/stores/user';
import { auth, provider } from '@/firebase';
import { signInWithPopup } from 'firebase/auth';

const userStore = useUserStore();

async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const googleUser = result.user;
        const userPayload = { mail: googleUser.email || '', id: googleUser.uid || '', photoUrl: googleUser.photoURL || '', name: googleUser.displayName || '' };

        await axios.post('api/users', userPayload, {
            withCredentials: true
        });

        await axios.post('auth/login', userPayload, {
            withCredentials: true,
        });

        userStore.setUser(userPayload);
    } catch (err: unknown) {
        console.error('Login error:', err);
    }
}
</script>
