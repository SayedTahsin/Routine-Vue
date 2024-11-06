import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as {
      mail: string
      id?: string
      photoUrl: string
      name: string
      completedTasks?: number
      totalTasks?: number
    } | null,
  }),
  actions: {
    setUser(user: {
      mail: string
      id?: string
      photoUrl: string
      name: string
      completedTasks?: number
      totalTasks?: number
    }) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
})
