import { createStore } from 'vuex'
import user from './modules/user'
import permission from '@/store/modules/permission'
import tags from '@/store/modules/tags'

export default createStore({
  state: {
    loading: false,
    collapsed: false
  },
  mutations: {
    startLoading (state) {
      state.loading = true
    },
    closeLoading (state) {
      state.loading = false
    },
    setCollapsed (state) {
      state.collapsed = !state.collapsed
    }
  },
  getters: {
    token: state => state.user.token,
    hasuserInfo: state => {
      return JSON.stringify(state.user.userInfo) === '{}'
    },
    userInfo: state => state.user.userInfo,
    tags: state => state.tags.tagsArray,
    loadStatus: state => state.loading,
    menuCol: state => state.collapsed

  },
  modules: {
    user,
    permission,
    tags
  }

})
