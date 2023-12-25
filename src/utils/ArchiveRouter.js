import VueRouter from 'vue-router'
import store from '@/store'

/**
 * 实现锚点存档、锚点回溯、页面堆栈功能的路由
 */
export default class ArchiveRouter extends VueRouter {
  lastMethod = null

  go(n) {
    store.commit('route/GO', n)
    this.lastMethod = 'go'
    super.go(n)
  }

  push(route) {
    const { match } = this.matcher
    const {
      name,
      meta: { cache = false },
    } = match(route)
    store.commit('route/PUSH', { name, cache })
    this.lastMethod = 'push'
    super.push(route)
  }

  replace(route) {
    this.lastMethod = 'replace'
    super.replace(route)
  }

  /**
   * 路由存档点
   */
  archive() {
    store.commit('route/ARCHIVE')
  }

  /**
   * 回滚至上个存档点
   */
  rollback() {
    store.commit('route/ROLLBACK', (n) => {
      this.go(n)
    })
  }
}
