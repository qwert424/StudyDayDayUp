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
export function addBlogType(data) {
    return request({
        url: '/api/blogtype',
        method: 'post',
        data
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
export function changeBlogType(editData) {
    return request({
        url: `/api/blogtype/${editData.id}`,
        method: 'put',
        data: {
            name: editData.name,
            order: editData.order
        }
    })
}

// 文章发布
export function addBlogArticle(data) {
    return request({
        url: '/api/blog',
        method: 'post',
        data
    })
}

// 文章修改
export function editBlogArticle(blogArticleData) {
    return request({
        url: `/api/blog/${blogArticleData.id}`,
        method: 'put',
        data: blogArticleData.data
    })
}

// 通过id获取文章信息
export function getOneBlogArticle(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'get',
    })
}
