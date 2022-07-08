import request from '@/utils/request'

export const getNav = () => {
  return request.get('/sys/menu/nav')
}
