import request from '@/utils/request'

/**
 * 验证码
 */
export function captcha() {
  return request({
    url: '/captcha',
    method: 'get'
  })
}

/**
 * 注册
 * @param  {[type]} data.username  [description]
 * @param  {[type]} data.password  [description]
 * @param  {[type]} data.captcha   [description]
 * @param  {[type]} data.captchaId [description]
 * @return {[type]}                   [description]
 */
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

/**
 * 登录
 * @param  {[type]} data.username  [description]
 * @param  {[type]} data.password  [description]
 * @param  {[type]} data.captcha   [description]
 * @param  {[type]} data.captchaId [description]
 * @return {[type]}                   [description]
 */
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * 登出
 */
export function logout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data
  })
}
