<template>
    <div>
        <router-view />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from "jwt-decode";
import { useUserStore } from '@/stores/user';
import axios from '../plugins/axios'
const router = useRouter();
const userStore = useUserStore();

function getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

onMounted(async () => {
    try {
        const token = getCookie('ROUTINEAPP');
        if (token) {
            const decoded = jwtDecode<{ name: string; mail: string; photoUrl: string }>(token);

            userStore.setUser({
                mail: decoded.mail,
                name: decoded.name,
                photoUrl: decoded.photoUrl,
                id: '',
            });
            await axios.get(`/api/users/${decoded.mail}`)
            router.replace({ name: 'routine' });
        } else {
            router.replace({ name: 'login' });
        }
    } catch (e) {
        console.error("Error decoding token:", e);
        router.replace({ name: 'login' });
    }
});
</script>
