import axios from 'axios'

// Ensure withCredentials is also set globally as default
axios.defaults.withCredentials = true

export interface SearchRagRequest {
  prompt: string
}

export interface SearchRagResponse {
  prompt: string
  model?: string
  retrieval_query?: string
  answer: string
  retrieved_chunks?: unknown[]
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const searchRag = async (payload: SearchRagRequest): Promise<SearchRagResponse> => {
  const response = await apiClient.post<SearchRagResponse>('/search-rag', payload, {
    withCredentials: true,
  })
  return response.data
}

export default apiClient
