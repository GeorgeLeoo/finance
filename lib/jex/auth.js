import Cookies from '../jsCookie/index'

const TokenKey = 'Jex-Token'
const UIDKey = 'Jex-UID'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUid() {
  return Cookies.get(UIDKey)
}

export function setUid(uid) {
  return Cookies.set(UIDKey, uid)
}

export function removeUid() {
  return Cookies.remove(UIDKey)
}
