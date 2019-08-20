import { Method, XHttpPromise, XHttpRequestConfig } from '../types'
import dispatchRequest from './dispatchRequest'

export default class XHttp {
  request(url?: any, config?: XHttpRequestConfig): XHttpPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config as XHttpRequestConfig)
  }

  get(url: string, config?: XHttpRequestConfig): XHttpPromise {
    return this._requestMethodData('get', url, config)
  }

  delete(url: string, config?: XHttpRequestConfig): XHttpPromise {
    return this._requestMethodData('delete', url, config)
  }

  head(url: string, config?: XHttpRequestConfig): XHttpPromise {
    return this._requestMethodData('head', url, config)
  }

  options(url: string, config?: XHttpRequestConfig): XHttpPromise {
    return this._requestMethodData('options', url, config)
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
