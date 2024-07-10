import axios from 'axios'

const api = axios.create({
    baseURL: 'https://comercio-local.onrender.com/'
})

export default api