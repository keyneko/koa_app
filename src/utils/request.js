import axios from 'axios'
import { Toast, Notify } from 'vant'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // Determine whether token needs to be set
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
      config.headers['Authorization'] = getToken()
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    var { code, message } = res

    if (code == 200) {
      return res
    } else {
      if (message) {
        Notify({ type: 'danger', message })
      }

      return Promise.reject(res)
    }
  },
  (error) => {
    const { status, data } = error.response

    if (data) {
      Notify({ type: 'danger', message: data })
    }

    if (status == 401) {
      store.dispatch('user/resetToken')
      window.location.reload()
      return
    }

    return Promise.reject(error)
  },
)

export default service
