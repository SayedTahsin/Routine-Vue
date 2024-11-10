import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8787/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
// import.meta.env.VITE_API_URL
export default axiosInstance
