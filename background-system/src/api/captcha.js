import request from '@/utils/request'

// 验证码获取
export function getCaptcha() {
  return request({
    url: '/res/captcha',
    method: 'get',
  })
}
