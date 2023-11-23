import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true,
  timeout: 30000,
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?'
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName]
        var part = encodeURIComponent(propName) + '='
        if (value !== null && typeof value !== 'undefined') {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              const params = propName + '[' + key + ']'
              var subPart = encodeURIComponent(params) + '='
              url += subPart + encodeURIComponent(value[key]) + '&'
            }
          }
          else {
            url += part + encodeURIComponent(value) + '&'
          }
        }
      }
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    var { code, msg } = res

    if (code == 200 || code == 0) {
      return res
    }
    else {
      if (code == 401) {
        store.dispatch('user/resetToken')
        return Promise.reject(res)
      }

      if (msg) {

        /**
          * 如果 errorCode 在 noErrorCodes 描述列表中，则不会弹错误警告框
          * 使用示例
          export function request_api(data) {
            return request({
              url: "erp/api_address",
              method: 'post',
              data,
              headers: {
                noErrorCodes: '10017|10018|10019',
              }
            })
          }
         */
        const noErrorCodes = response.config.headers?.noErrorCodes || ''
        if (noErrorCodes.indexOf(code) == -1) {
          setTimeout(() => {
            Toast.allowMultiple()
            Toast.fail({ message: msg, duration: 5000 })
          }, 0)
        }
      }

      return Promise.reject(res)
    }
  },
  (error) => {
    if (error.message) {
      // 稍加延时弹错误提示，以防<finally>中调用<Toast.clear>把错误框也消除了
      setTimeout(() => {
        Toast.clear()
        Toast.allowMultiple()
        Toast.fail({ message: error.message, duration: 5000 })
      }, 0)
    }

    try {
      if (error.response.status === 403) {
        store.dispatch('user/resetToken')
      }
    }
    catch (e) {}

    return Promise.reject(error)
  }
)

export default service
