import request from './request'
import URL from './url'
import { getUid } from './auth'

export function signIn (body) {
  return request({
    url: URL.SIGN_IN,
    data: body
  })
}

export function signUp (body) {
  return request({
    url: URL.SIGN_UP,
    data: body
  })
}

export function logout () {
  return request({
    url: URL.LOGOUT,
  })
}

export function current () {
  return request({
    url: URL.CURRENT,
    data: {
      uid: getUid()
    }
  })
}

export function increment (tableName, body) {
  return request({
    url: URL.INCREMENT(tableName),
    data: body
  })
}

export function count (tableName, body) {
  return request({
    url: URL.COUNT(tableName),
    data: body
  })
}

export function getJex (tableName, body) {
  return request({
    url: URL.GET(tableName),
    data: body
  })
}

export function postJex (tableName, body) {
  return request({
    url: URL.POST(tableName),
    data: body
  })
}

export function deleteJex (tableName, body) {
  return request({
    url: URL.DELETE(tableName),
    data: body
  })
}

export function deleteManyJex (tableName, body) {
  return request({
    url: URL.DELETE_MANY(tableName),
    data: body
  })
}

export function statJex (tableName, body) {
  return request({
    url: URL.STAT(tableName),
    data: body
  })
}

export function uploadFileJex (body) {
  return request({
    url: URL.FILE,
    data: body
  })
}
