import { XHttpRequestConfig, XHttpPromise, XHttpResponse } from '../types'
import { parseResponseHeaders } from '../helpers/headers'
import { transformResponse } from '../helpers/data'

export default function index(config: XHttpRequestConfig): XHttpPromise {
  return new Promise(resolve => {
    const { url, data = null, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    Object.keys(headers).map(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      }
      request.setRequestHeader(name, headers[name])
    })

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = parseResponseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: XHttpResponse = {
        data: transformResponse(responseData),
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    request.send(data)
  })
}
