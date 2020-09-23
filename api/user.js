import HttpRequest from '../lib/HttpRequest'

export const login = (body) => HttpRequest.request({
  url: '',
  method: HttpRequest.METHOD.POST,
  body
})
