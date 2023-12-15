import role from './role'
import perm from './permission'
import copy from './copy'

const install = function(Vue) {
  Vue.directive('role', role)
  Vue.directive('perm', perm)
  Vue.directive('copy', copy)
}

if (window.Vue) {
  window['role'] = role
  window['perm'] = perm
  window['copy'] = copy
  Vue.use(install) // eslint-disable-line
}

export default install
