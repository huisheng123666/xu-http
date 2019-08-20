import { XHttpInstance } from './types'
import XHttp from './core/XHttp'
import { extend } from './helpers/utils'

function createInstance(): XHttpInstance {
  const context = new XHttp()
  // instance默认函数初始化
  const instance = XHttp.prototype.request.bind(context)
  extend(instance, context)
  return instance as XHttpInstance
}

const xhttp = createInstance()

export default xhttp
