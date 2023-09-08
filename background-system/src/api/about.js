import request from '@/utils/request'

// 关于我页面url获取
export function getAbout() {
    return request({
        url: '/api/about',
        method: 'get',
    })
}

// 关于我页面url设置
export function setAbout(data) {
    return request({
        url: '/api/about',
        method: 'post',
        data
    })
}