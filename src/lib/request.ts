import axios, { type InternalAxiosRequestConfig } from 'axios'

const clientRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

clientRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add any request interceptors here if needed
    return config
  },
  (error) => {
    // Handle request errors here
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

clientRequest.interceptors.response.use(
  (response) => {
    // Add any response interceptors here if needed
    console.log('Response received:', response)
    return response
  },
  (error) => {
    // Handle response errors here
    console.error('Response error:', error)
    return Promise.reject(error)
  }
)

export default clientRequest
