import require from '@/api/require';

// 全局设置
export async function getSetting() {
    return await require.get('/api/setting');
}