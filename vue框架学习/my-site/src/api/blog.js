import require from './require.js';

/**
 * 获取博客分类
 */
export async function getblogtype() {
    return await require.get('/api/blogtype')
}

/**
 * 获取博客列表数据
 * @param {Number} page 当前页码
 * @param {Number} limit 页容量
 * @param {Number} categoryid 所属分类，-1表示全部
 * @returns 
 */
export async function getblog(page = 1, limit = 10, categoryid = -1) {
    return await require.get('/api/blog', {
        params: { page, limit, categoryid }
    })
}

/**
 * 获取单个博客文章
 * @param {*} id 文章的id
 * @returns 
 */
export async function getblogdetail(item) {
    return await require.get(`/api/blog/${item.id}`, { params: { item, id: item.id } })
}

/**
 * 分页获取评论
 * @param {Number} page 当前页码
 * @param {Number} limit 页容量
 * @param {Number} blogid 所属文章，-1表示不限
 * @returns
 */
export async function getblogcomment(page = 1, limit = 10, blogid = -1) {
    return await require.get('/api/comment', { params: { page, limit, blogid } })
}

/**
 * 提交评论
 * @param {String} nickname "昵称"
 * @param {String} content "评论内容，纯文本"
 * @param {*} blogId #评论的博客id
 * @returns
 */
export async function postblogcomment(commonInfo) {
    return await require.post('/api/comment', commonInfo)
}