// 网络请求
export async function getData(url) {
    const resp = await fetch(url, { // 请求配置对象，可省略，省略则所有配置为默认值
        method: 'get', // 默认为GET
        headers: { // 请求头配置
            'Content-Type': 'application/json',
        },
    });
    if (resp.status === 200) {
        const data = await resp.json();
        return data;
    }
    return null;
}