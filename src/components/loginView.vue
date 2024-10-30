<template>
    <div class="login-component">
        <button @click="signInWithGoogle">Sign in with Google</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from '../plugins/axios';
import { useUserStore } from '@/stores/user';
import { auth, provider } from '@/firebase';
import { signInWithPopup } from 'firebase/auth';

const userStore = useUserStore();
const error = ref(null);

async function signInWithGoogle() {
    try {
        // Sign in with Google
        const result = await signInWithPopup(auth, provider);
        const googleUser = result.user;
        const userPayload = { mail: googleUser.email || '', id: googleUser.uid || '', photoUrl: googleUser.photoURL || '', name: googleUser.displayName || '' };

        // // Call API to save user data if first time login
        await axios.post('api/users', userPayload);

        // // Call login API to set cookie
        // await axios.post('http://localhost:3000/login', userPayload, {
        //     withCredentials: true, // Allow cookies to be sent with request
        // });

        console.log(googleUser)

        // Update Pinia store with user data
        userStore.setUser(userPayload);
    } catch (err: unknown) {
        error.value = err.message;
        console.error('Login error:', error.value);
    }
}
</script>
