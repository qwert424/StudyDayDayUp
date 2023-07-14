(() => {
    const LoginIdvalidate = new User("txtLoginId", async function (val) {
        if (!val) {
            return "请填写账号";
        }
    })

    const LoginPwdvalidate = new User("txtLoginPwd", async function (val) {
        if (!val) {
            return "请填写密码";
        }
    })

    const form = $('.user-form')

    form.onsubmit = async (e) => {
        e.preventDefault();
        const result = await User.validateAll(LoginIdvalidate, LoginPwdvalidate);
        if (!result) {
            return;
        }
        const data = new FormData(form)
        const resp = await API.login(Object.fromEntries(data.entries()))
        if (resp.code === 0) {
            alert("登录成功，点击确定跳转机器人聊天界面")
            location.href = './index.html'
        } else {
            alert("登录失败，账号或密码错误");
            LoginIdvalidate.p.innerText = "账号或密码错误";
            LoginPwdvalidate.p.innerText = "账号或密码错误";
            LoginPwdvalidate.input.value = ""
        }
    };
})()