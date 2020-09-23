import HttpRequest from '../lib/httpRequest/index'

/**
 * 登陆
 * @param data
 * @returns {Promise<*>}
 */
export const login = (data) => HttpRequest.request({
  url: '/users',
  method: HttpRequest.METHOD.POST,
  data
})

/**
 * 注册
 * @param data
 * @returns {Promise<*>}
 */
export const register = (data) => HttpRequest.request({
  url: '/users/sign_up',
  method: HttpRequest.METHOD.POST,
  data
})

/**
 * 忘记密码
 * @param data
 * @returns {Promise<*>}
 */
export const forgetPwd = (data) => HttpRequest.request({
  url: '/users/update_pwd',
  method: HttpRequest.METHOD.POST,
  data
})


/**
 * 更新用户名
 * @param data
 * @returns {Promise<*>}
 */
export const updateNickname = (data) => HttpRequest.request({
  url: '/users/nickname',
  method: HttpRequest.METHOD.POST,
  data
})

/**
 * 上传头像
 * @param data
 * @param fileOptions
 * @returns {Promise<*>}
 */
export const avatar = (data, fileOptions) => HttpRequest.request({
  url: '/users/avatar',
  data,
  isUpload: true,
  fileOptions
})

/**
 * 获取分类
 * @param data
 * @returns {Promise<*>}
 */
export const getCategories = (data) => HttpRequest.request({
  url: '/categories',
  method: HttpRequest.METHOD.GET,
  data
})

/**
 * 删除分类
 * @param data
 * @returns {Promise<*>}
 */
export const delCategories = (data) => HttpRequest.request({
  url: '/categories/del',
  method: HttpRequest.METHOD.POST,
  data
})

/**
 * 保存分类
 * @param data
 * @returns {Promise<*>}
 */
export const saveCategories = (data) => HttpRequest.request({
  url: '/categories',
  method: HttpRequest.METHOD.POST,
  data
})

/**
 * 搜索
 * @param data
 * @returns {Promise<*>}
 */
export const search = (data) => HttpRequest.request({
  url: '/bills/search',
  method: HttpRequest.METHOD.GET,
  data
})


/**
 * 获取账单
 * @param data
 * @returns {Promise<*>}
 */
export const getBills = (data) => HttpRequest.request({
  url: '/bills',
  method: HttpRequest.METHOD.GET,
  data
})

/**
 * 删除账单
 * @param data
 * @returns {Promise<*>}
 */
export const delBills = (data) => HttpRequest.request({
  url: '/bills/del_bill',
  method: HttpRequest.METHOD.POST,
  data
})

/**
 * 保存账单
 * @param data
 * @returns {Promise<*>}
 */
export const saveBills = (data) => HttpRequest.request({
  url: '/bills',
  method: HttpRequest.METHOD.POST,
  data
})

/**
 * 更新账单
 * @param data
 * @returns {Promise<*>}
 */
export const updateBills = (data) => HttpRequest.request({
  url: '/bills/update_bill',
  method: HttpRequest.METHOD.POST,
  data
})
