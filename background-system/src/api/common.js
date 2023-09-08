import request from '@/utils/request'

// 评论列表获取
export function getCommon(page = 1, limit = 10) {
    return request({
        url: '/api/comment',
        method: 'get',
        params: { page, limit }
    })
}

// 评论删除
export function deleteCommon(id) {
    return request({
        url: `/api/comment/${id}`,
        method: 'delete',
    })
}
