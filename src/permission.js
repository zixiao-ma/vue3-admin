import router from '@/router'
import store from '@/store'

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login' && to.path !== '/') {
    if (to.meta.title && to.meta.icon) {
      const obj = {
        title: to.meta.title,
        path: to.path
      }
      console.log(obj)
      store.commit('tags/addTag', obj)
    }
  }

  const token = store.getters.token
  const userInfo = store.getters.hasuserInfo
  if (to.path === '/login' && token) {
    next(from.path)
  }

  if (to.path !== '/login' && !token) {
    next('/login')
  }
  if (to.path !== '/login' && token) {
    if (userInfo) {
      const res = await store.dispatch('user/getUserInfo')
      const data = await store.dispatch('permission/filterRouter', res.authoritys)
      data.forEach(item => {
        router.addRoute(item)
      })
      return next(to.path)
    }
  }
  next()
})
