import request from '@/utils/request'

// 首页标语获取
export function getBanner() {
    return request({
        url: '/api/banner',
        method: 'get',
    })
}
