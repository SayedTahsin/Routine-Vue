import { createRouter, createWebHistory } from 'vue-router'
import RoutineView from '@/views/RoutineView.vue'
import UserView from '@/views/UserView.vue'
import LoginView from '@/components/loginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user',
      component: UserView,
      children: [
        {
          path: 'routine',
          name: 'routine',
          component: RoutineView,
        },
        {
          path: 'login',
          name: 'login',
          component: LoginView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
