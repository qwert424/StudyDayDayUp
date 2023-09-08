import request from '@/utils/request'

// 网址设置获取
export function getSetting() {
    return request({
        url: '/api/setting',
        method: 'get',
    })
}

// 网址设置修改
export function setSetting(data) {
    return request({
        url: '/api/setting',
        method: 'put',
        data
    })
}