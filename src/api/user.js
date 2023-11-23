import request from '@/utils/request'

export function captchaImage() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
