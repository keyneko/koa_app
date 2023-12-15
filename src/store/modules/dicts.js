import { set } from 'vue'
import { getDictionaries } from '@/api/dicts'

const state = {
  dicts: {},
}

const mutations = {
  SET_DICT: (state, { key, list }) => {
    if (list.length) {
      set(state.dicts, key, list)
    }
  },

  REMOVE_DICT: (state, key) => {
    set(state.dicts, key, undefined)
  },

  EMPTY_DICTS: (state) => {
    state.dicts = {}
  },
}

const actions = {
  getDictionaries({ commit }, key) {
    if (!state.dicts[key]) {
      return getDictionaries({ key }).then((res) => {
        commit('SET_DICT', { key, list: res.data })
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
