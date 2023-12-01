import {
  captcha,
  login,
  logout,
} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  captcha: {},
  token: getToken(),
  user: {},
  name: '',
  avatar: '',
}

const mutations = {
  SET_CAPTCHA: (state, data) => {
    state.captcha = data
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, data) => {
    state.user = data
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
}

const actions = {
  captcha({ commit }) {
    return new Promise((resolve, reject) => {
      captcha().then(({ captcha, captchaId }) => {
        commit('SET_CAPTCHA', { captcha, captchaId })
        resolve({ captcha, captchaId })
      }).catch(error => {
        reject(error)
      })
    })
  },

  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      login(params).then(res => {
        commit('SET_TOKEN', res.token)
        setToken(res.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
