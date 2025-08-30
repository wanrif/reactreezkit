import clientRequest from '@services/request'

import type { ApiResponse, ICallApi } from '@/types'

const endpoints = {
  ping: '/honotreez/ping',
}

const callApi = async <T>({
  endpoint,
  method,
  data,
  headers,
  params,
}: ICallApi): Promise<ApiResponse<T>> => {
  try {
    const response = await clientRequest.request<ApiResponse<T>>({
      url: endpoint,
      method,
      data,
      headers,
      params,
    })
    return {
      data: response.data?.data,
      message: response.data?.message,
    }
  } catch (error) {
    console.error('API call error:', error)
    return Promise.reject(error)
  }
}

const clientApi = {
  ping: () =>
    callApi<{ message: string }>({ endpoint: endpoints.ping, method: 'GET' }),
  // Add more API methods here as needed
}

export default clientApi
