export const SIGN_IN = `/user/sign-in`
export const SIGN_UP = `/user/sign-up`
export const LOGOUT = `/user/logout`
export const CURRENT = `/user/current`
export const USERS = `/user/users`
export const FILE = `/file`
export const INCREMENT = (tableName) => `/increment/${tableName}`
export const COUNT = (tableName) => `/get/count/${tableName}`
export const GET = (tableName) => `/get/${tableName}`
export const POST = (tableName) => `/post/${tableName}`
export const DELETE = (tableName) => `/delete/${tableName}`
export const DELETE_MANY = (tableName) => `/deleteMany/${tableName}`
export const STAT = (tableName) => `/stat/${tableName}`

export default {
  SIGN_IN,
  SIGN_UP,
  LOGOUT,
  CURRENT,
  USERS,
  FILE,
  INCREMENT,
  COUNT,
  GET,
  POST,
  DELETE,
  DELETE_MANY,
  STAT
}
