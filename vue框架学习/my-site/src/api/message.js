import require from './require.js';

// 留言板 获取
export async function getMessage(page = 1, limit = 10) {
    return await require.get('/api/message', { params: { page, limit, } });
}
// 留言板 提交
export async function postMessage(messageInfo) {
    return await require.post('/api/message', messageInfo);
}