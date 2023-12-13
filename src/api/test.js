import request from '@/utils/request'

/**
 * 请求列表数据
 * @param  {[type]} params.pageNum  [description]
 * @param  {[type]} params.pageSize [description]
 * @return {[type]}                  [description]
 */
export function plopList(params) {
  return request({
    url: `/test/plop/list`,
    method: 'get',
    params,
  })
}

/**
 * 请求柱状图数据
 */
export function plopBar(params) {
  return request({
    url: `/test/plop/bar`,
    method: 'get',
    params,
  })
}

/**
 * 请求饼图数据
 */
export function plopPie(params) {
  return request({
    url: `/test/plop/pie`,
    method: 'get',
    params,
  })
}

/**
 * 请求折线图数据
 */
export function plopLine(params) {
  return request({
    url: `/test/plop/line`,
    method: 'get',
    params,
  })
}
