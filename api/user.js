import HttpRequest from '../lib/httpRequest'

export const login = (body) => HttpRequest.request({
  url: '',
  method: HttpRequest.METHOD.POST,
  body
})
