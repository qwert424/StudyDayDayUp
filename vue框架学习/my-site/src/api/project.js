import require from '@/api/require';

// 项目
export async function getProject() {
    return await require.get('/api/project');
}