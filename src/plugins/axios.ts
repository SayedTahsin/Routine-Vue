import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8787/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
// https://routine.mail-tahsin99.workers.dev/

export default axiosInstance
