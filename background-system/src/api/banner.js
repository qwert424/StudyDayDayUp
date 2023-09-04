import request from '@/utils/request'

// 首页标语获取
export function getBanner() {
    return request({
        url: '/api/banner',
        method: 'get',
    })
}

// 首页标语设置
export function setBanner(data) {
    return request({
        url: '/api/banner',
        method: 'post',
        data
    })
}
