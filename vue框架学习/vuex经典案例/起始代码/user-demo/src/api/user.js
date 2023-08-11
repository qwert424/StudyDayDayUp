// 模拟异步等待用户api
function delay(duration = 1000) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), duration)
    })
}

export async function Login(LoginId, LoginPwd) {
    await delay();
    if (LoginId === 'admin' && LoginPwd === '123123') {
        const user = {
            LoginId,
            name: "管理员",
        };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }
    return null;
}

export async function LoginOut() {
    await delay();
    localStorage.removeItem('user');
}

export async function whoAmI() {
    await delay();
    const user = localStorage.getItem('user')
    if (user) {
        return JSON.parse(user);
    }
    return null;
}