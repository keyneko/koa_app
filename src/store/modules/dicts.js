import { set } from 'vue'
import { getDictionaries } from '@/api/dicts'

const state = {
  dicts: {},
}

const mutations = {
  SET_DICT: (state, { key, data }) => {
    set(state.dicts, key, data)
  },
}

const actions = {
  getDictionaries({ commit }, key) {
    if (!state.dicts[key]) {
      set(state.dicts, key, [])

      return getDictionaries({ key }).then((res) => {
        const { data } = res
        commit('SET_DICT', { key, data })
      })
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
