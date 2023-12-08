import request from '@/utils/request'

/**
 * 获取条码列表
 */
export function getPositions(params) {
  return request({
    url: '/positions',
    method: 'get',
    params,
  })
}

/**
 * 查询条码
 * @param  {String} params.value [description]
 */
export function getPosition(params) {
  return request({
    url: '/position',
    method: 'get',
    params,
  })
}

/**
 * 创建条码
 * @param  {String} data.category  [description]
 * @param  {String} data.name      [description]
 * @param  {Number} data.quantity  [description]
 * @param  {String} data.basicUnit [description]
 * @param  {Number} data.status    [description]
 * @param  {Number} data.files    [description]
 */
export function createPosition(data) {
  return request({
    url: '/position',
    method: 'post',
    data,
  })
}

/**
 * 更新条码
 * @param  {String} data.value      [description]
 * @param  {String} data.name      [description]
 * @param  {Number} data.quantity  [description]
 * @param  {String} data.basicUnit [description]
 * @param  {Number} data.status    [description]
 * @param  {Number} data.files    [description]
 */
export function updatePosition(data) {
  return request({
    url: '/position',
    method: 'put',
    data,
  })
}

/**
 * 删除条码
 * @param  {String} params.value      [description]
 */
export function deletePosition(params) {
  return request({
    url: '/position',
    method: 'delete',
    params,
  })
}
