import { userLogin } from './api/userLogin.js';
import * as dom from "./dom.js";
let isLogin = false;
export async function login() {
    if (isLogin) {
        return;
    }
    isLogin = true;
    dom.btnSubmit.value = "Login...";
    const loginId = dom.userName.value;
    const loginPwd = dom.userPassword.value;
    if (!loginId) {
        alert('账号为空，请填写账号');
        isLogin = false;
        dom.btnSubmit.value = "登录";
        return;
    }
    if (!loginPwd) {
        alert('密码为空，请填写密码');
        isLogin = false;
        dom.btnSubmit.value = "登录";
        return;
    }
    const resp = await userLogin(loginId, loginPwd);
    if (resp) {
        alert(`登录成功，欢迎您${resp.nickname}`)
    } else {
        alert(`登录失败，账户或密码填写错误`);
        userPassword.value = "";
    }
    dom.btnSubmit.value = "登录";
    isLogin = false;

}