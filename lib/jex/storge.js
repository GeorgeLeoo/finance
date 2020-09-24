import { isString } from './dataType'
import Error from './error'

let lt = localStorage
const storage = {
  set (key, value) {
    if (!isString(key) || !value) {
      throw new Error(Error.Param, 'key and value can not be empty')
    }
    lt.setItem(key, JSON.stringify(value))
  },
  get (key) {
    if (!isString(key)) {
      throw new Error(Error.Type, 'Parameter key must be a string type.')
    }
    return JSON.parse(lt.getItem(key)) || null
  },
  remove (key) {
    if (!isString(key)) {
      throw new Error(Error.Type, 'Parameter key must be a string type.')
    }
    lt.removeItem(key)
  },
  clear () {
    lt.clear()
  }
}
export default storage
