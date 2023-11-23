import { set } from 'vue'
import { map, pick, isArray } from 'lodash'
import { getDicts } from '@/api/dicts'

const state = {
  dicts: {}
}

const mutations = {
  SET_DICT: (state, { name, list }) => {
    if (list.length) {
      set(state.dicts, name, list)
    }
  }
}

const actions = {
  getDict({ commit }, name) {
    if (!state.dicts[name]) {
      set(state.dicts, name, [])

      return getDicts(name)
        .then(res => {
          const list = map(res.data, d => {
            return {
              dictLabel: d.dictLabel,
              dictValue: d.dictValue
            }
          })

          // 要触发createPersistedState更新，必须通过提交commit才可以
          commit('SET_DICT', { name, list })
        })
    }
  },

  // TODO: 移除该Action
  getDicts({ commit }, items) {
    if (isArray(items)) {
      return Promise.all(

        map(items, d => {
          if (!state.dicts[d]) {
            state.dicts[d] = []

            return getDicts(d)
              .then(({ data }) => {
                const list = map(data, d => {
                  return {
                    dictLabel: d.dictLabel,
                    dictValue: d.dictValue
                  }
                })
                commit('SET_DICT', { name: d, list })
              })
          }
        })

      )
    }
    else {
      return Promise.reject()
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
