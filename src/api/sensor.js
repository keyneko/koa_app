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
 * @param  {String} data.sensorId   [description]
 * @param  {String|Number|Object} data.status [description]
 */
export function sensorRecord(data) {
  return request({
    url: `/sensor/record`,
    method: 'post',
    data,
  })
}

/**
 * 推送消息
 * @param  {String} data._id   [description]
 * @param  {String} data.qos   [description]
 * @param  {String} data.retain   [description]
 * @param  {String} data.topic   [description]
 * @param  {String} data.payload   [description]
 */
export function sensorPublish(data) {
  return request({
    url: `/sensor/publish`,
    method: 'post',
    data,
  })
}
