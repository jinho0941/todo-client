import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export const fetcher = async (url: string) => {
  const response = await api.get(url)
  return response.data
}
