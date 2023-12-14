import request from '@/utils/request'

/**
 * 获取传感器列表
 * @param  {Number} params.type  [description]
 * @param  {String} params.manufacturer [description]
 * @param  {String} params.status [description]
 */
export function getSensors(params) {
  return request({
    url: `/sensors`,
    method: 'get',
    params,
  })
}

/**
 * 新建传感器
 * @param  {String} data.name   [description]
 * @param  {Number} data.type [description]
 * @param  {String} data.number   [description]
 * @param  {Number} data.manufacturer [description]
 */
export function createSensor(data) {
  return request({
    url: `/sensor`,
    method: 'post',
    data,
  })
}

/**
 * 更新传感器
 * @param  {String} data.name   [description]
 * @param  {Number} data.type [description]
 * @param  {String} data.number   [description]
 * @param  {Number} data.manufacturer [description]
 * @param  {Number} data.status [description]
 */
export function updateSensor(data) {
  return request({
    url: `/sensor`,
    method: 'put',
    data,
  })
}

/**
 * 删除传感器
 * @param  {String} params._id   [description]
 */
export function deleteSensor(params) {
  return request({
    url: `/sensor`,
    method: 'delete',
    params,
  })
}

/**
 * 获取传感器记录列表
 * @param  {String} params.sensorId [description]
 * @param  {String} params.dateTime  [description]
 */
export function sensorRecords(params) {
  return request({
    url: `/sensor/records`,
    method: 'get',
    params,
  })
}

/**
 * 上报传感器数据
 * @param  {String} data.dateTime   [description]
 * @param  {String} data.sensorId   [description]
 * @param  {String} data.sensorName [description]
 * @param  {String|Number} data.value [description]
 */
export function sensorRecord(data) {
  return request({
    url: `/sensor/record`,
    method: 'post',
    data,
  })
}
