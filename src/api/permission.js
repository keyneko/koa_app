import request from '@/utils/request'

/**
 * 获取权限词条列表
 */
export function getPermissions(params) {
  return request({
    url: '/permissions',
    method: 'get',
    params,
  })
}

/**
 * 创建权限词条
 * @param  {[type]} data.name [description]
 * @param  {[type]} data.description [description]
 * @param  {[type]} data.pattern [description]
 */
export function createPermission(data) {
  return request({
    url: `/permission`,
    method: 'post',
    data,
  })
}

/**
 * 修改权限词条
 * @param  {[type]} data.name [description]
 * @param  {[type]} data.description [description]
 * @param  {[type]} data.pattern [description]
 * @param  {[type]} data.status [description]
 */
export function updatePermission(data) {
  return request({
    url: `/permission`,
    method: 'put',
    data,
  })
}

/**
 * 删除权限词条
 * @param  {[type]} params._id [description]
 */
export function deletePermission(params) {
  return request({
    url: `/permission`,
    method: 'delete',
    params,
  })
}
