import request from '@/utils/request'

// 文章列表获取
export function getBlog(page = 1, limit = 10, categoryId = -1) {
    return request({
        url: '/api/blog',
        method: 'get',
        params: { page, limit, categoryId }
    })
}

// 删除文章
export function deleteBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'delete',
    })
}

// 文章分类获取
export function getBlogType() {
    return request({
        url: '/api/blogtype',
        method: 'get',
    })
}

// 文章分类添加
export function addBlogType() {
    return request({
        url: '/api/blogtype',
        method: 'post',
    })
}

// 文章分类删除
export function deleteBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'delete',
    })
}

// 文章分类修改
export function changeBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'put',
    })
}
