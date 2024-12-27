import axios from 'axios'
import { getAuth } from 'firebase/auth'

const baseURL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8787/'
    : import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default axiosInstance
