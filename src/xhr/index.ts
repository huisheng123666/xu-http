import { XHttpRequestConfig } from '../types'

export default function index(config: XHttpRequestConfig) {
  const { url, data = null, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).map(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    }
    request.setRequestHeader(name, headers[name])
  })

  request.send(data)
}
