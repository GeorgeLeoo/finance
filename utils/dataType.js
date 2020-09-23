// dataType.js
export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
export const isNumber = obj => Object.prototype.toString.call(obj) === '[object Number]'
export const isString = obj => Object.prototype.toString.call(obj) === '[object String]'
export const isUndefined = obj => Object.prototype.toString.call(obj) === '[object Undefined]'
export const isBoolean = obj => Object.prototype.toString.call(obj) === '[object Boolean]'
export const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]'
export const isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]'
export const isNull = obj => Object.prototype.toString.call(obj) === '[object Null]'

export default {
    isObject,
    isNumber,
    isString,
    isUndefined,
    isBoolean,
    isArray,
    isFunction,
    isNull
}
