import { XHttpInstance, XHttpRequestConfig, XHttpStatic, XHttpTransformer } from './types'
import XHttp from './core/XHttp'
import { extend, mergeTransform } from './helpers/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: XHttpRequestConfig): XHttpStatic {
  const context = new XHttp(config)
  // instance默认函数初始化
  const instance = XHttp.prototype.request.bind(context)
  extend(instance, context)
  // 类型断言成XHttpInstance接口类型
  return instance as XHttpStatic
}

const xhttp = createInstance(defaults)

xhttp.create = function(config) {
  mergeTransform(defaults, config)
  return createInstance(mergeConfig(defaults, config))
}

export { XHttpTransformer }

export default xhttp
