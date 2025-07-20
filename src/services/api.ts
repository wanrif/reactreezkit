import clientRequest from '@lib/request'

const endpoints = {
  ping: '/honotreez/ping',
}

interface ICallApi {
  endpoint: string
  method: string
  data?: unknown
  headers?: object
  params?: object
}

const callApi = async <T>({
  endpoint,
  method,
  data,
  headers,
  params,
}: ICallApi): Promise<T> => {
  try {
    const response = await clientRequest.request<T>({
      url: endpoint,
      method,
      data,
      headers,
      params,
    })
    return response.data
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
