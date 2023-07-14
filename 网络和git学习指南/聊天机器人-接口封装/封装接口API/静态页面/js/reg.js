(()=>{
    const LoginIdvalidate = new User("txtLoginId", async function (val) {
        if (!val) {
            return "请填写账号";
        }
        const resp = await API.exists(this.input.value)
        if (resp.data) {
            return "该账号已被占用，请重新选择一个账号名";
        }
    })
    
    const Nicknamevalidate = new User("txtNickname", async function (val) {
        if (!val) {
            return "请填写昵称";
        }
    })
    
    const LoginPwdvalidate = new User("txtLoginPwd", async function (val) {
        if (!val) {
            return "请填写密码";
        }
    })
    
    const LoginPwdConfirmvalidate = new User("txtLoginPwdConfirm", async function (val) {
        if (!val) {
            return "请填写密码";
        }
        if (val !== LoginPwdvalidate.input.value) {
            return "两次密码不一致";
        }
    })
    
    const form = $('.user-form')
    
    form.onsubmit = async (e) => {
        e.preventDefault();
        const result = await User.validateAll(LoginIdvalidate, Nicknamevalidate, LoginPwdvalidate, LoginPwdConfirmvalidate);
        if (!result) {
            return;
        }
        const data = new FormData(form)
        const resp = await API.reg(Object.fromEntries(data.entries()))
        if (resp.code === 0) {
            alert("注册成功，点击确定跳转登录界面")
            location.href = './login.html'
        }
    };
})()