import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://your-base-url.com/api',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})

export default axiosInstance
