import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    tagsArray: getItem('tags') || []
  }),
  mutations: {
    addTag (state, tag) {
      const data = state.tagsArray.find(item => item.path === tag.path)
      if (!data) {
        state.tagsArray.push(tag)
        setItem('tags', state.tagsArray)
      }
    },
    delTag (state, index) {
      state.tagsArray.splice(index, 1)
      setItem('tags', state.tagsArray)
    }
  }
}
