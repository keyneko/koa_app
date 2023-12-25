import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'
import { without, dropRight, findIndex } from 'lodash'

const state = {
  language: getLanguage(),
  cached: [],
}

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },

  SET_CACHED: (state, r) => {
    state.cached = without(state.cached, r)
    state.cached.push(r)
  },

  REMOVE_CACHED: (state, r) => {
    state.cached = without(state.cached, r)
  },

  DROP_CACHED: (state, r) => {
    const idx = findIndex(state.cached, (d) => d == r)
    const n = idx == -1 ? 0 : state.cached.length - idx
    state.cached = dropRight(state.cached, n)
  },

  EMPTY_CACHED: (state) => {
    state.cached = []
  },
}

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
