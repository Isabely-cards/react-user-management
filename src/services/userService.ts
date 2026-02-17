import axios from 'axios'
import type { User } from '../types/User'

const api = axios.create({
  baseURL: 'http://localhost:3001',
})

export const userService = {
  getAll: async (
    search?: string,
    page?: number,
    pageSize?: number,
  ): Promise<User[]> => {
    const response = await api.get('/users', {
      params: { q: search, page, pageSize },
    })
    return response.data
  },

  create: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post('/users', user)
    return response.data
  },

  update: async (user: User): Promise<User> => {
    const response = await api.put(`/users/${user.id}`, user)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}
