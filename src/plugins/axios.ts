import axios from 'axios'

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

export default axiosInstance
