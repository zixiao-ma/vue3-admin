import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

NProgress.configure({ showSpinner: false })

export const loading = {
  start () {
    NProgress.start()
    store.commit('startLoading')
  },
  done () {
    NProgress.done()
    store.commit('closeLoading')
  }
}
