import { XHttpRequestConfig, XHttpTransformer } from '../types'
import defaults from '../defaults'

const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          // 重复key保留后面的
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}

export function mergeTransform(defaults: XHttpRequestConfig, config: XHttpRequestConfig) {
  if (config.transformRequest) {
    const reqTs = config.transformRequest as XHttpTransformer[]
    config.transformRequest = [...reqTs, ...(defaults.transformRequest as XHttpTransformer[])]
  }
  if (config.transformResponse) {
    const resTs = config.transformResponse as XHttpTransformer[]
    config.transformResponse = [...(defaults.transformResponse as XHttpTransformer[]), ...resTs]
  }
}
