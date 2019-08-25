import {
  Method,
  RejectedFn,
  ResolvedFn,
  XHttpPromise,
  XHttpRequestConfig,
  XHttpResponse,
  XHttpTransformer
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'
import { mergeTransform } from '../helpers/utils'

interface Interceptors {
  request: InterceptorManager<XHttpRequestConfig>
  response: InterceptorManager<XHttpResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: XHttpRequestConfig) => XHttpPromise)
  rejected?: RejectedFn
}

export default class XHttp {
  defaults: XHttpRequestConfig

  interceptors: Interceptors

  constructor(initConfig: XHttpRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<XHttpRequestConfig>(),
      response: new InterceptorManager<XHttpResponse>()
    }
  }

  // config类型是any原因：一开始进入的时候是XHttpRequestConfig，在链式调用传参的时候会导致一直是这个类型，但是后面response的时候类型会改变导致前后不一致
  // 这里虽然定义为any没法约束config，但是外层接口定义依然是存在的
  request(url?: any, config?: any): XHttpPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    mergeTransform(this.defaults, config)
    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    // request执行顺序是反的
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(method: string, url: string, data?: any, config?: XHttpRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
