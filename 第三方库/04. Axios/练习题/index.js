/**
 * 参考接口文档：http://mock.duyiedu.com/project/72/interface/api
 * 完成下面的api函数
 * 并对每个函数进行调用测试
 * 需要统一处理的地方：
 * 1. 对baseurl进行统一处理
 * 2. 当服务器响应结果中的code不为0时，需要使用alert弹出错误消息msg
 * 3. 如果服务器响应头中出现Authorization:token，需要对把响应头中的token保存到localstorage
 * 4. 请求时，如果发现本地localstorage中包含token，需要将其带入到请求头中 Authorization: Bearer token
 */

// 1. 对baseurl进行统一处理
const instance = axios.create({
  baseURL: 'https://study.duyiedu.com',
})

// 2. 当服务器响应结果中的code不为0时，需要使用alert弹出错误消息msg
// 3. 如果服务器响应头中出现Authorization:token，需要对把响应头中的token保存到localstorage
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data.code !== 0) {
    alert(response.data.msg);
  }
  if (response.headers.authorization) {
    localStorage.setItem('token', response.headers.authorization)
  }
  return response.data.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 4. 请求时，如果发现本地localstorage中包含token，需要将其带入到请求头中 Authorization: Bearer token
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (localStorage.getItem('token')) {
    config.headers.Authorization = "Bearer " + localStorage.getItem('token');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});



/**
 * 登录
 * @param {*} loginId 账号
 * @param {*} loginPwd 密码
 * @return 返回登录成功的用户
 */
async function login(loginId, loginPwd) {
  return await instance.post('/api/user/login', {
    loginId,
    loginPwd
  })
}

login('hahaha', '123123')


/**
 * 注册
 * @param {*} loginId 账号
 * @param {*} loginPwd 密码
 * @param {*} nickname 昵称
 */
async function reg(loginId, loginPwd, nickname) {
  return await instance.post('/api/user/reg', {
    loginId,
    loginPwd,
    nickname
  })
}
reg('hahahsa', '123123', 'sss')
/**
 * 验证账号是否存在
 * @param {*} loginId 账号
 */
async function exists(loginId) {
  return await instance.get('/api/user/exists', {
    params: {
      loginId
    }
  })
}
exists('hahaha')
/**
 * 恢复登录，获取当前登录的用户信息
 */
async function profile() {
  return await instance.get('/api/user/profile')
}
profile()