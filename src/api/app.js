import request from '@/utils/request'

/**
 * 上传文件
 * @param  {File} data.file  [description]
 */
export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data,
  })
}

/**
 * 日志上报
 * @param  {String} data.message  [description]
 * @param  {String} data.stack  [description]
 */
export function log(data) {
  return request({
    url: '/log',
    method: 'post',
    data,
  })
}
