import { isPlainObject } from './utils'
import any = jasmine.any

export function transformRequest (data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}


export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
