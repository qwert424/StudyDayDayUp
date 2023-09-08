import request from '@/utils/request'

// 评论列表获取
export function getMessage(page = 1, limit = 10) {
    return request({
        url: '/api/message',
        method: 'get',
        params: { page, limit }
    })
}

// 评论删除
export function deleteMessage(id) {
    return request({
        url: `/api/message/${id}`,
        method: 'delete',
    })
}
