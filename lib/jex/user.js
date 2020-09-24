import { current, logout, signIn, signUp } from './api'
import { isString } from './dataType'
import Error from './error'
import { Query } from './query'

class User extends Query {
  constructor () {
    super()
    this._signType = {
      SIGN_IN: 'SIGN_IN',
      SIGN_UP: 'SIGN_UP'
    }
  }
  
  login (username, password) {
    return this._sign({ signType: this._signType.SIGN_IN, username, password })
  }
  
  register ({ username, password, email, phone }) {
    return this._sign({ signType: this._signType.SIGN_UP, username, password, email, phone })
  }
  
  _sign({ signType, username, password, email, phone }) {
    if (!isString(username)) {
      throw new Error(Error.Type, 'The username need a String type.')
    }
    if (!isString(password)) {
      throw new Error(Error.Type, 'The password need a String type.')
    }
    if (!username) {
      throw new Error(Error.Param,'The username can not be undefined or "".')
    }
    if (!password) {
      throw new Error(Error.Param,'The password can not be undefined or "".')
    }
    const body = {
      username: username.trim(),
      password: password.trim()
    }
  
    if (signType === this._signType.SIGN_UP) {
      email && (body.email = email)
      phone && (body.phone = phone)
    }
  
    if (signType === this._signType.SIGN_IN) {
      return signIn(body)
    } else if (signType === this._signType.SIGN_UP) {
      return signUp(body)
    } else {
      throw new Error(Error.Param, 'signType is wrong.')
    }
  }
  
  logout () {
    return logout()
  }
  
  current () {
    return current()
  }
  
  users (query) {
    this._tableName = 'User'
    return this.get(query)
  }
}

export default function () {
  return new User()
}
