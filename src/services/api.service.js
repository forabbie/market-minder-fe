import axios from 'axios'
import storageService from '../services/storage.service'

const baseURL = import.meta.env.VITE_API_BASE_URL
// const baseURL = 'http://127.0.0.1:3000/' // process.env.VUE_APP_API_BASE_URL
const token = storageService.getCookie('token') || null

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`
  }
})

export default axiosInstance
