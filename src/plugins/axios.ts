import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //http://localhost:8787/
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export default axiosInstance
