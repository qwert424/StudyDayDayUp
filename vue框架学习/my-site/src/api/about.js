import require from '@/api/require';

// 关于我
export async function getAbout() {
    return await require.get('/api/about');
}