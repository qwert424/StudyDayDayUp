import require from '@/api/require';

// 导航栏标语
export async function getBanner() {
    return await require.get('/api/banner');
}