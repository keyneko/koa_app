import request from '@/utils/request'

/**
 * 获取条码列表
 */
export function getBarcodes() {
  return request({
    url: '/barcodes',
    method: 'get',
  })
}

/**
 * 查询条码
 * @param  {String} params.value [description]
 */
export function getBarcode(params) {
  return request({
    url: '/barcode',
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
 */
export function createBarcode(data) {
  return request({
    url: '/barcode',
    method: 'post',
    data,
  })
}

/**
 * 更新条码
 * @param  {String} params.value      [description]
 * @param  {String} data.name      [description]
 * @param  {Number} data.quantity  [description]
 * @param  {String} data.basicUnit [description]
 * @param  {Number} data.status    [description]
 */
export function updateBarcode(params, data) {
  return request({
    url: '/barcode',
    method: 'put',
    params,
    data,
  })
}

/**
 * 删除条码
 * @param  {String} params.value      [description]
 */
export function deleteBarcode(params) {
  return request({
    url: '/barcode',
    method: 'delete',
    params,
  })
}
