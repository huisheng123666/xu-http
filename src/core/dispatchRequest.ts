import { XHttpRequestConfig, XHttpPromise, XHttpResponse } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: XHttpRequestConfig): XHttpPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: XHttpRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: XHttpRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

function transformResponseData(res: XHttpResponse): any {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
