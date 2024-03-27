import request from '@/utils/request'

/**
 * 查询全部字典
 * @param  {String} params.key [description]
 */
export function getDictionaries(params) {
  return request({
    url: `/dictionaries`,
    method: 'get',
    params,
  })
}

/**
 * 查询字典
 * @param  {String} params.key [description]
 */
export function getDictionary(params) {
  return request({
    url: `/dictionary`,
    method: 'get',
    params,
  })
}

/**
 * 创建字典
 * @param  {String} data.key   [description]
 * @param  {String|Number} data.value [description]
 * @param  {String} data.name [description]
 * @param  {Boolean} data.isProtected [description]
 */
export function createDictionary(data) {
  return request({
    url: `/dictionary`,
    method: 'post',
    data,
  })
}

/**
 * 更新字典
 * @param  {String} data.id   [description]
 * @param  {String|Number} data.value [description]
 * @param  {String} data.name [description]
 * @param  {Boolean} data.isProtected [description]
 */
export function updateDictionary(data) {
  return request({
    url: `/dictionary`,
    method: 'put',
    data,
  })
}

/**
 * 删除字典
 * @param  {String} params.id   [description]
 */
export function deleteDictionary(params) {
  return request({
    url: `/dictionary`,
    method: 'delete',
    params,
  })
}
