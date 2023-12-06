import request from '@/utils/request'

/**
 * 查询字典
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
 * 创建字典
 * @param  {String} data.key   [description]
 * @param  {String[]} data.names [description]
 */
export function createDictionaries(data) {
  return request({
    url: `/dictionaries`,
    method: 'post',
    data,
  })
}

/**
 * 删除字典
 * @param  {String} params.key   [description]
 */
export function deleteDictionaries(params) {
  return request({
    url: `/dictionaries`,
    method: 'delete',
    params,
  })
}
