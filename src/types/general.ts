export interface ICallApi {
  endpoint: string
  method: string
  data?: unknown
  headers?: object
  params?: object
}

export interface ApiResponse<T> {
  message: string
  data: T
}
