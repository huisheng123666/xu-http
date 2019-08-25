import { XHttpRequestConfig, XHttpPromise, XHttpResponse } from '../types'
import { parseResponseHeaders } from '../helpers/headers'
import { transformResponse } from '../helpers/data'
import { createError } from '../helpers/error'

export default function(config: XHttpRequestConfig): XHttpPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url!, true)

    Object.keys(headers).map(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      }
      request.setRequestHeader(name, headers[name])
    })

    if (timeout) {
      request.timeout = timeout
    }

    // 响应结果
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = parseResponseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: XHttpResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 网络错误
    request.onerror = () => {
      reject(createError('Network Error', config, null, request))
    }

    // 请求超时
    request.ontimeout = () => {
      reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
    }

    request.send(data)

    function handleResponse(response: XHttpResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
