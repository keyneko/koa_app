import { dropRight } from 'lodash'

const state = {
  /**
   * 路由计数
   * @type {Number}
   * rounter跳转有三种方式: push、replace、go，back其实就是go(-1)
   * push时+1，replace时不变，back时-1，go时+n（注意n是负数）
   */
  rcount: 0,
  /**
   * 锚点栈
   * @type {Array}
   * 每次ARCHIVE时，就将当前rcount推入锚点栈
   */
  archive: [],
}

const mutations = {
  RESET: (state) => {
    state.rcount = 0
    state.archive = []
  },

  ARCHIVE: (state) => {
    const last = state.archive[state.archive.length - 1]
    // 与尾部锚点不同时，插入新锚点
    if (last != state.rcount) {
      state.archive.push(state.rcount)
    }
  },

  ROLLBACK: (state, callback) => {
    // 锚点栈无锚点时，不作跳转
    let archive = state.archive[state.archive.length - 1]
    if (archive == undefined) return

    // 尾部锚点与当前rcount相同时，再取锚点栈的尾部锚点2
    if (archive == state.rcount) {
      archive = state.archive[state.archive.length - 2]

      // 有尾部锚点2时，移除尾部锚点
      if (archive == undefined) return
      state.archive.pop()
    }

    callback(archive - state.rcount)
  },

  PUSH: (state, r) => {
    // rcount+1
    state.rcount = state.rcount + 1
  },

  GO: (state, n) => {
    // 更新rcount
    state.rcount = state.rcount + n
    // 当尾部锚点值小于更新后的rcount值时，应移除该尾部锚点
    const archive = state.archive[state.archive.length - 1]
    if (state.rcount < archive) {
      state.archive.pop()
    }
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
