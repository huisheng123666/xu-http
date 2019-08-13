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
}
