import {
  captcha,
  login,
  logout,
  getUser,
} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  captcha: {},
  token: getToken(),
  user: {},
  username: '',
  name: '',
  avatar: '',
  roles: [],
  sops: [],
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
  SET_USERNAME: (state, name) => {
    state.username = name
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_SOPS: (state, sops) => {
    state.sops = sops
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
        commit('SET_USER', {})
        commit('SET_USERNAME', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_ROLES', [])
        commit('SET_SOPS', [])
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

  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      getUser().then(res => {
        const user = res.data || {}
        commit('SET_USER', user)
        commit('SET_USERNAME', user.username)
        commit('SET_NAME', user.name)
        commit('SET_AVATAR', user.avatar)
        commit('SET_ROLES', user.roles)
        commit('SET_SOPS', user.sops)
        resolve(user)
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
