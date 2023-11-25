function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

// 登录
export async function login(id, pwd) {
    await delay(2000);
    if (id === 'admin' && pwd === '123456') {
        const User = {
            id,
            name: '管理员'
        };
        localStorage.setItem('user', JSON.stringify(User));
        return User;
    }
    return null;
}

// 登出
export async function loginOut() {
    localStorage.removeItem('user');
    await delay(2000);
    return true;
}


// 我是谁
export async function whoami() {
    await delay(2000);
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return user;
    }
    return null;
}