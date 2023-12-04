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
export function getUsers(data) {
  return request({
    url: '/users',
    method: 'get',
    data,
  })
}

/**
 * 用户信息
 * @param  {[type]} id       [description]
 */
export function getUser(id) {
  return request({
    url: `/user/${id}`,
    method: 'get',
  })
}

/**
 * 修改用户密码
 * @param  {[type]} id       [description]
 * @param  {[type]} data.password [description]
 */
export function updateUser(id, data) {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data,
  })
}

/**
 * 删除用户
 * @param  {[type]} id       [description]
 */
export function deleteUser(id) {
  return request({
    url: `/user/${id}`,
    method: 'delete',
  })
}
