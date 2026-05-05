import axios from 'axios'

const DEFAULT_API = 'http://localhost:4000/api'

const client = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE as string) || DEFAULT_API,
  headers: { 'Content-Type': 'application/json' },
})

export default client
