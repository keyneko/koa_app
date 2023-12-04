import copy from './copy'

const install = function(Vue) {
  Vue.directive('copy', copy)
}

if (window.Vue) {
  window['copy'] = copy
  Vue.use(install); // eslint-disable-line
}

export default install
