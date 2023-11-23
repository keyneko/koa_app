import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
import concat from 'lodash'

// register globally
Vue.component('SvgIcon', SvgIcon)

const svg = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(svg)
