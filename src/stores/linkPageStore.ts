import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useLinkPageStore = defineStore('linkPages', {
  state: () => ({
    pages: []
  }),

  actions: {
    async loadPages() {
      const res = await api.get('/linkpages/me')
      this.pages = res.data
    },

    async createPage(title: string, links: []) {
      await api.post('/linkpages', { title, links })
      await this.loadPages()
    }
  }
})
