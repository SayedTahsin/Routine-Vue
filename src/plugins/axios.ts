import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://routine.mail-tahsin99.workers.dev/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export default axiosInstance
