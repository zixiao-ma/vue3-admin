import axios from 'axios'

import { message } from 'ant-design-vue'
import store from '@/store/index'
import { loading } from '@/utils/loading'
import router from '@/router'

const instance = axios.create({
  baseURL: 'https://www.markerhub.com/vueadmin-java',
  timeout: 6000
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  loading.start()
  const token = store.getters.token
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  loading.done()
  if (response.headers.authorization) {
    store.commit('user/setToken', response.headers.authorization)
  }

  const {
    data: {
      data,
      code,
      msg
    }
  } = response

  if (code === 200) {
    return data
  }
  if (code === 400) {
    message.error(msg)
    return data
  }
}, function (error) {
  // 对响应错误做点什么
  const msg = error.toString()
  if (msg.includes('Network Error')) {
    message.error('网络错误，请检查您的网络！')
  }
  if (msg.includes('Timeout')) {
    message.error('请求超时，请检查您的网络！')
  }
  const { status } = error.response
  switch (status) {
    case 401:
      message.error('Token超时,请重新登录！')
      store.commit('user/logout')
      router.push({ name: 'login' })
      break
    case 404:
      message.error('访问接口地址不正确！')
      break
    case 500:
      message.error('服务器发生错误！')
      break
    case 503:
      message.error('服务暂时不可用！')
      break
    case 408:
      message.error('客户端请求超时!')
      break
  }
  return Promise.reject(error)
})
export default instance
