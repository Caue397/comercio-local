import axios from 'axios'

const api = axios.create({
    baseURL: 'https://comercio-local-vr1h.vercel.app/'
})

export default api