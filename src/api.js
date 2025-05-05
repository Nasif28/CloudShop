
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://admin.refabry.com/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
