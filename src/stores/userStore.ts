import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null
  }),

  actions: {
    async login(email: string, password: string) {
      const res = await api.post('/auth/login', { email, password })
      this.user = res.data.user
      this.token = res.data.token
      localStorage.setItem("token", res.data.token)


      api.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
    }
  }
})
