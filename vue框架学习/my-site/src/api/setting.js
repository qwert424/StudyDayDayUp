import require from '@/api/require';

export async function getSetting() {
    return await require.get('/api/setting');
}