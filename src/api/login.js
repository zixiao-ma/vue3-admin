import request from '@/utils/request'

export const getCaptcha = () => {
  return request.get('/captcha')
}
export const apiLogin = (model) => {
  return request.post(`/login?username=${model.username}&password=${model.password}&code=${model.code}&token=${model.token}`)
}
export const getUserInfo = () => {
  return request.get('/sys/userInfo')
}
