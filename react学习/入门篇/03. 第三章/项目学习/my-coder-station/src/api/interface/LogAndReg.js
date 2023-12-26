// 登录注册的Api接口文件
import request from "../request";

// 获取验证码
export async function getCaptchaApi() {
    const resp = await request({
        url: "/res/captcha",
        method: "get"
    })
    return resp;
}

// 注册账号

// 验证登录账号是否存在
export async function checkLoginIdApi(loginId) {
    const resp = await request({
        url: `/api/user/userIsExist/${loginId}`,
        method: "get",
    })
    return resp;
}

// 注册
export async function registerApi(data) {
    const resp = await request({
        url: '/api/user/',
        method: "post",
        data
    })
    return resp;
}

// 登录
export async function loginApi(data) {
    const resp = await request({
        url: '/api/user/login',
        method: "post",
        data
    })
    return resp;
}

// 通过id获取用户信息
export async function getUserInfoByIdApi(id) {
    const resp = await request({
        url: `/api/user/${id}`,
        method: "get"
    })
    return resp;
}

// 恢复登录
export async function getUserByTokenApi() {
    const resp = await request({
        url: '/api/user/whoami',
        method: "get"
    })
    return resp;
}