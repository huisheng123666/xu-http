import { XHttpRequestConfig, XHttpResponse } from '../types'

export class XHttpError extends Error {
  isXHttpError: boolean
  config: XHttpRequestConfig
  code?: string | null
  request?: any
  response?: XHttpResponse

  constructor(
    message: string,
    config: XHttpRequestConfig,
    code?: string | null,
    request?: any,
    response?: XHttpResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = response
    this.response = response
    this.isXHttpError = true
    // 修复继承内部类实例化无法调用原型上的方法，instanceof判断出错（构造函数指向错误）
    Object.setPrototypeOf(this, XHttpError.prototype)
  }
}

export function createError(
  message: string,
  config: XHttpRequestConfig,
  code?: string | null,
  request?: any,
  response?: XHttpResponse
) {
  const error = new XHttpError(message, config, code, request, response)
  // console.log(error.__proto__)
  return error
}
