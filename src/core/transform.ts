import { XHttpTransformer } from '../types'

export default function(
  data: any,
  headers?: any,
  fns?: XHttpTransformer | XHttpTransformer[]
): any {
  if (!fns) return data
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
