import request from '@/utils/request'

/**
 * 获取条码列表
 */
export function getBarcodes(params) {
  return request({
    url: '/barcodes',
    method: 'get',
    params,
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
 * @param  {Number} data.files    [description]
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
 * @param  {String} data.value      [description]
 * @param  {String} data.name      [description]
 * @param  {Number} data.quantity  [description]
 * @param  {String} data.basicUnit [description]
 * @param  {Number} data.status    [description]
 * @param  {Number} data.files    [description]
 */
export function updateBarcode(data) {
  return request({
    url: '/barcode',
    method: 'put',
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
