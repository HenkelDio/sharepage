import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://sharepageapi.onrender.com'
})

const apiPublic = axios.create({
  baseURL: 'https://sharepageapi.onrender.com'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  app.config.globalProperties.$apiPublic = apiPublic
})

export { api, apiPublic }
