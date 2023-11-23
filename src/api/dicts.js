import request from '@/utils/request'

export function getDicts(type) {
  return request({
    url: `/system/dict/data/type/${type}`,
    method: 'get'
  })
}

/**
 * 查询指定产线事件类型（通用）
 * @param  {[type]} params.proLineId 产线ID
 * @param  {[type]} params.status    null则查询全部类别（报错已经删除的），0则查询未删除的事件
 * @return {[type]}                   [description]
 */
export function selEvent(params) {
  return request({
    url: `/erp/eventCategory/selEvent`,
    method: 'get',
    params
  })
}
