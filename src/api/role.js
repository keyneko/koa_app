import request from '@/utils/request'

/**
 * 获取角色列表
 */
export function getRoles(params) {
  return request({
    url: '/roles',
    method: 'get',
    params,
  })
}

/**
 * 创建角色
 * @param  {[type]} data.value [description]
 * @param  {[type]} data.name [description]
 * @param  {[type]} data.status [description]
 * @param  {[type]} data.sops [description]
 */
export function createRole(data) {
  return request({
    url: `/role`,
    method: 'post',
    data,
  })
}

/**
 * 修改角色
 * @param  {[type]} data.value [description]
 * @param  {[type]} data.name [description]
 * @param  {[type]} data.status [description]
 * @param  {[type]} data.sops [description]
 */
export function updateRole(data) {
  return request({
    url: `/role`,
    method: 'put',
    data,
  })
}

/**
 * 删除角色
 * @param  {[type]} params._id [description]
 */
export function deleteRole(params) {
  return request({
    url: `/role`,
    method: 'delete',
    params,
  })
}
