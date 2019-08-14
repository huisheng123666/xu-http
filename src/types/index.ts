export type Method = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

export interface XHttpRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any,
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

export interface XHttpResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: XHttpRequestConfig
  request: any
}

// XHttpResponse为resolve类型
export interface XHttpPromise extends Promise<XHttpResponse> {
}
