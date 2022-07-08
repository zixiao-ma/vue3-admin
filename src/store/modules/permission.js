import { privateRoute, routes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    router: routes
  }),
  mutations: {
    setRouter (state, newRouter) {
      state.router = [...routes, ...newRouter]
    }
  },
  actions: {
    filterRouter ({ commit }, menus) {
      const result = []
      menus.forEach(name => {
        result.push(...privateRoute.filter(item => item.name === name))
      })
      result.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      return result
    }
  }
}
