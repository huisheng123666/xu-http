import { XHttpRequestConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function XHttp(config: XHttpRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: XHttpRequestConfig): void {
  console.log(config)
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: XHttpRequestConfig):string {
  const {url, params} = config
  return buildUrl(url, params)
}

// data数据转化字符串
function transformRequestData(config: XHttpRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: XHttpRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default XHttp