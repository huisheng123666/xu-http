import { Method, XHttpPromise, XHttpRequestConfig } from '../types'
import dispatchRequest from './dispatchRequest'

export default class XHttp {
  request(config: XHttpRequestConfig): XHttpPromise {
    return dispatchRequest(config)
  }

  get(url: string, config?: XHttpRequestConfig): XHttpPromise {
    return this._requestMethodData('get', url, config)
  }

  delete(url: string, config?: XHttpRequestConfig): XHttpPromise {
    return this._requestMethodData('delete', url, config)
  }

  head(url: string, config?: XHttpRequestConfig): XHttpPromise {
    return this._requestMethodData('delete', url, config)
  }

  options(url: string, config?: XHttpRequestConfig): XHttpPromise {
    return this._requestMethodData('delete', url, config)
  }

  post(url: string, data?: any, config?: XHttpRequestConfig): XHttpPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: XHttpRequestConfig): XHttpPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: XHttpRequestConfig): XHttpPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodData(method: Method, url: string, config?: XHttpRequestConfig): XHttpPromise {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))
  }

  _requestMethodWithData(method: string, url: string, data?: any, config?: XHttpRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))
  }
}
