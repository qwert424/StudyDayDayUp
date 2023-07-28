import require from '@/api/require';

export async function getBanner() {
    return await require.get('/api/banner');
}

getBanner().then(b => console.log(b));