import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

export const getComponents = () => api.get('/components')

export const getBuilds = () => api.get('/builds')

export const saveBuild = (payload) => api.post('/builds/save', payload)

export const deleteBuild = (id) => api.delete(`/builds/${id}`)

export const checkCompatibility = (payload) =>
  api.post('/compatibility/check', payload)

export const loginUser = (email, password) => {
  const form = new URLSearchParams()
  form.append('username', email)
  form.append('password', password)
  return axios.post('/api/auth/login', form, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

export const registerUser = (email, password) =>
  api.post('/auth/register', { email, password })

export const logoutUser = () => api.post('/auth/logout')

export const getMe = () => api.get('/auth/me')
