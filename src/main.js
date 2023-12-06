import './icons'
import './permission'
import './utils/error-logger'

import '@/styles/tailwind.scss'
import 'vant/lib/index.less'
import '@/styles/index.scss'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import directive from './directive'

import Vant from 'vant'
import { Toast } from 'vant'
import i18n, { vantLocales } from '@/lang'
import animate from 'animate.css'

Vue.use(Vant, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(directive)
Vue.use(animate)

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

vantLocales(i18n.locale)
