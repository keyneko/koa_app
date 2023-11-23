import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

Vue.use(Vuex)

/* 通用stores */
import app from './modules/app'
import user from './modules/user'
import dicts from './modules/dicts'
import errorLog from './modules/errorLog'
import route from './modules/route'

const store = new Vuex.Store({
  modules: {
    app,
    user,
    dicts,
    errorLog,
    route,
  },
  getters,
  plugins: [
    /* store持久化插件 */
    createPersistedState({
      storage: window.sessionStorage,
      key: 'store',
      paths: ['route', 'dicts'],
    }),
  ],
})

export default store
