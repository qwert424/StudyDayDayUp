import request from '@/utils/request'

// 登录验证
export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

// 获取用户信息 whoami
export function getInfoApi() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}


// 获取修改用户信息 
export function setInfoApi(data) {
  return request({
    url: '/api/admin',
    method: 'put',
    data
  })
}