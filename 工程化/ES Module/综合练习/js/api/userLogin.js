//用户登录接口
// axios 方法
// 导出接口
const instance = axios.create({
    baseURL: 'https://study.duyiedu.com',
});
export async function userLogin(loginId, loginPwd) {
    const resp = await instance.post('/api/user/login', {
        loginId,
        loginPwd
    })
    return resp.data.data;
}