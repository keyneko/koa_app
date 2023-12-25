/**
 * 此文件为路由计数、页面缓存的补充
 * 因当操作浏览器后退或PDA后退键时，无法更新路由计数
 */
import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  if (!router.lastMethod) {
    store.commit('route/GO', -1)
  }

  // console.log(from.name, to.name)

  if (to.name == 'Login') {
    store.commit('app/EMPTY_CACHED')
  }
  else {
    if (
      router.lastMethod == 'push' ||
      router.lastMethod == 'replace' ||
      (from.name == null && to.name == 'Dashboard')
    ) {
      if ((to.meta || {}).cache == true) {
        setTimeout(() => {
          store.commit('app/SET_CACHED', to.name)
        }, 0)
      }
    }
    else {
      if ((from.meta || {}).cache == true) {
        store.commit('app/DROP_CACHED', from.name)
      }
    }
  }

  router.lastMethod = null
  next()
})
