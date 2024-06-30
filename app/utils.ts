import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
  baseURL,
})

export const fetcher = async (url: string) => {
  const response = await api.get(url)
  return response.data
}
