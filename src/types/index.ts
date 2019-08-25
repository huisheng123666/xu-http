export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface XHttpRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number

  transformRequest?: XHttpTransformer | XHttpTransformer[]
  transformResponse?: XHttpTransformer | XHttpTransformer[]

  [propsName: string]: any
}

export interface XHttpResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: XHttpRequestConfig
  request: any
}

// XHttpResponse为resolve类型
export interface XHttpPromise<T = any> extends Promise<XHttpResponse<T>> {}

export interface XHttpError extends Error {
  isXHttpError: boolean
  config: XHttpRequestConfig
  code?: string | null
  request?: any
  response?: XHttpResponse
}

export interface XHttp {
  defaults: XHttpRequestConfig

  interceptors: {
    request: XHttpInterceptorManager<XHttpRequestConfig>
    response: XHttpInterceptorManager<XHttpResponse>
  }
  request<T = any>(config: XHttpRequestConfig): XHttpPromise<T>
  get<T = any>(url: string, config?: XHttpRequestConfig): XHttpPromise<T>
  delete<T = any>(url: string, config?: XHttpRequestConfig): XHttpPromise<T>
  head<T = any>(url: string, config?: XHttpRequestConfig): XHttpPromise<T>
  options<T = any>(url: string, config?: XHttpRequestConfig): XHttpPromise<T>
  post<T = any>(url: string, data: any, config?: XHttpRequestConfig): XHttpPromise<T>
  put<T = any>(url: string, data: any, config?: XHttpRequestConfig): XHttpPromise<T>
  patch<T = any>(url: string, data: any, config?: XHttpRequestConfig): XHttpPromise<T>
}

// 响应接口类型推断过程 调用<T> -> 传入响应promise类型<T> -> 传入响应接口类型<T> -> 给与响应data类型
// 优点：与后端提前约定好返回数据类型
export interface XHttpInstance extends XHttp {
  <T = any>(url: string, config?: XHttpRequestConfig): XHttpPromise<T>
  <T = any>(config: XHttpRequestConfig): XHttpPromise<T>
}

export interface XHttpInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface XHttpTransformer {
  (data: any, headers?: any): any
}

export interface XHttpStatic extends XHttpInstance {
  create(config: XHttpRequestConfig): XHttpInstance
}
