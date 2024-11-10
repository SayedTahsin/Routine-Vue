import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const toastOptions = {
  timeout: 1000,
  position: POSITION.TOP_CENTER,
  closeButton: 'button',
  maxToasts: 3,
  icon: true,
}
const app = createApp(App)

app.use(Toast, toastOptions)
app.use(createPinia())
app.use(router)

app.mount('#app')
