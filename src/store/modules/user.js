import {
  captcha,
  register,
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
      captcha().then(({ img, uuid }) => {
        commit('SET_CAPTCHA', { img, uuid })
        resolve({ img, uuid })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  register({ commit }, loginForm) {
    const { username, password, code, uuid } = loginForm
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password, code, uuid }).then(res => {
        commit('SET_TOKEN', res.token)
        setToken(res.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  login({ commit }, loginForm) {
    const { username, password, code, uuid } = loginForm
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password, code, uuid }).then(res => {
        commit('SET_TOKEN', res.token)
        setToken(res.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
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

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
