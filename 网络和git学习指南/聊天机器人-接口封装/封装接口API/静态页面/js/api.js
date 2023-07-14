var API = (function () {

    const URL_BASE = "https://study.duyiedu.com/";
    const KEY_TOKEN = "token";

    function get(path) {
        const headers = {};
        const token = localStorage.getItem(KEY_TOKEN);
        if (token) {
            headers.authorization = `Bearer ${token}`
        }
        return fetch(URL_BASE + path, {
            method: 'GET',
            headers
        });
    }


    function post(path, bodyobj) {
        const headers = {
            'Content-Type': 'application/json',
        };
        const token = localStorage.getItem(KEY_TOKEN)
        if (token) {
            headers.authorization = `Bearer ${token}`
        }
        return fetch(URL_BASE + path, {
            method: 'POST',
            headers,
            body: JSON.stringify(bodyobj)
        });
    }

    /**
     * reg注册接口
     * @param {*} userInfo {loginId,nickname,loginPwd}
     */
    async function reg(userInfo) {
        const resp = await post("api/user/reg", userInfo)
        return await resp.json();
    }

    /**
     * login登录接口
     * @param {*} loginInfo {loginId,loginPwd}
     */
    async function login(loginInfo) {
        const resp = await post("api/user/login", loginInfo);
        const result = await resp.json();
        if (result.code === 0) {
            localStorage.setItem(KEY_TOKEN, resp.headers.get("authorization"))
        }
        return result;
    }

    /**
     * exists验证账户接口
     * @param {*} loginId {loginId}
     */
    async function exists(loginId) {
        const resp = await get(`api/user/exists?loginId=${loginId}`)
        return await resp.json();
    }


    /**
     * profile当前登录的用户信息接口
     */
    async function profile() {
        const resp = await get("api/user/profile")
        return await resp.json();
    }

    /**
     * sendChat发送信息接口
     * @param {string} content {content}
     */
    async function sendChat(content) {
        const resp = await post("api/chat", content)
        return await resp.json();
    }

    /**
     * getHistory获取记录接口
     */
    async function getHistory() {
        const resp = await get("api/chat/history")
        return await resp.json();
    }

    /**
     * loginOut退出登录
     */
    function loginOut() {
        localStorage.removeItem(KEY_TOKEN)
    }

    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut
    }
})()
