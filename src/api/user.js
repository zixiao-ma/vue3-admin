import request from '@/utils/request'

export const getUserList = (data) => {
  return request.get('/sys/user/list', {
    params: {
      data
    }
  })
}

export const getRoleList = (data) => {
  return request.get('/sys/role/list', {
    params: {
      data
    }
  })
}

export const getMenuList = (data) => {
  return request.get('/sys/menu/list?name=')
}
