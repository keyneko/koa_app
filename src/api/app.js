import request from '@/utils/request'

/**
 * 上传文件
 * @param  {[type]} data.file  [description]
 */
export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data,
  })
}
