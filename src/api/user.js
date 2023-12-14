import request from '@/utils/request'

/**
 * 验证码
 */
export function captcha() {
  return request({
    url: '/captcha',
    method: 'get',
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
    data,
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
    data,
  })
}

/**
 * 登出
 */
export function logout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data,
  })
}

/**
 * 获取用户列表
 */
export function getUsers(params) {
  return request({
    url: '/users',
    method: 'get',
    params,
  })
}

/**
 * 用户信息
 * @param  {[type]} params.id       [description]
 */
export function getUser(params) {
  return request({
    url: `/user`,
    method: 'get',
    params,
  })
}

/**
 * 修改用户信息
 * @param  {[type]} data.id       [description]
 * @param  {[type]} data.name [description]
 * @param  {[type]} data.password [description]
 * @param  {[type]} data.newPassword [description]
 * @param  {[type]} data.avatar [description]
 */
export function updateUser(data) {
  return request({
    url: `/user`,
    method: 'put',
    data,
  })
}

/**
 * 删除用户
 * @param  {[type]} params._id       [description]
 */
export function deleteUser(params) {
  return request({
    url: `/user`,
    method: 'delete',
    params,
  })
}
