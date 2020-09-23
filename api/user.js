import Http from '../lib/HttpRequest'
import HttpRequest from '../lib/HttpRequest'

export const login = (body) => HttpRequest.request({
  url: '',
  method: Http.POST,
  body
})