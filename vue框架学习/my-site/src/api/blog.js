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