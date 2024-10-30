import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as {
      mail: string
      id: string
      photoUrl: string
      name: string
    } | null,
  }),
  actions: {
    setUser(user: {
      mail: string
      id: string
      photoUrl: string
      name: string
    }) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
})
