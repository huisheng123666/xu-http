export type Method = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'options' | 'OPTIONS'
| 'head' | 'HEAD'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

export interface XHttpRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
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

export interface XHttpError extends Error {
  isXHttpError: boolean
  config: XHttpRequestConfig
  code?: string | null
  request?: any
  response?: XHttpResponse
}

export interface XHttp {
  request(config: XHttpRequestConfig): XHttpPromise
  get(url: string, config?: XHttpRequestConfig): XHttpPromise
  delete(url: string, config?: XHttpRequestConfig): XHttpPromise
  head(url: string, config?: XHttpRequestConfig): XHttpPromise
  options(url: string, config?: XHttpRequestConfig): XHttpPromise
  post(url: string, data: any, config?: XHttpRequestConfig): XHttpPromise
  put(url: string, data: any, config?: XHttpRequestConfig): XHttpPromise
  patch(url: string, data: any, config?: XHttpRequestConfig): XHttpPromise
}

export interface XHttpInstance extends XHttp {
  (config: XHttpRequestConfig): XHttpPromise
  (url: string, config: XHttpRequestConfig): XHttpResponse
}
