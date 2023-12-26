// 登录注册使用的表单
import { useState, useEffect, useRef } from 'react';
import style from './LogAndResForm.module.css';
import { Radio, Form, Checkbox, Input, Button, Row, Col, message } from 'antd';
import { LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { getCaptchaApi, checkLoginIdApi, registerApi, loginApi, getUserInfoByIdApi } from '../../api/interface/LogAndReg';
import { login } from '../../store/userSlice';
import { useDispatch } from 'react-redux'


function LogAndResForm(props) {

    // 网络问题锁
    const [netStyle, setNetStyle] = useState(true);

    // 仓库
    const dispatch = useDispatch();

    // 验证码
    const [captcha, setCaptcha] = useState();

    // 获取验证码 
    async function getCaptchaData() {
        try {
            const resp = await getCaptchaApi();
            setCaptcha(resp);
        } catch (error) {
            message.warning('获取验证码失败，请稍后重试!');
            // 网络问题锁
            setNetStyle(false);
            return null;
        }
    };

    // 验证码校验
    function VerificationCaptcha(resp) {
        if (!resp.data) {
            message.error(resp.msg);
            getCaptchaData();
            setLoadings(false);
            return false;
        }
        return true;
    }

    // 副作用操作
    useEffect(() => {
        getCaptchaData();
    }, []);

    // 加载状态
    const [loadings, setLoadings] = useState(false);

    // 单选框状态
    const [radioVal, setRadioVal] = useState("login");

    // 单选框切换
    const onRadioChange = (e) => {
        setRadioVal(e.target.value);
        getCaptchaData();
        // 清空状态
        if (e.target.value === 'login') {
            registerFormRef.current.resetFields();
        } else {
            loginFormRef.current.resetFields();
            setLoginVal({
                loginId: "",
                loginPwd: "",
                captcha: "",
                remember: false
            })
        }
    };

    // 登录表单
    const [loginVal, setLoginVal] = useState({
        loginId: "",
        loginPwd: "",
        captcha: "",
        remember: false
    });

    // Ref
    const loginFormRef = useRef();

    // 注册表单
    const [registerVal, setRegisterVal] = useState({
        loginId: "",
        captcha: "",
        nickname: ""
    })

    // Ref
    const registerFormRef = useRef();

    // 表单提交
    async function onFinish(formVal) {
        if (!netStyle) {
            message.warning('网络问题，稍后重试!');
            return;
        }
        setLoadings(true);
        if (formVal === 'loginVal') {
            // 登录表单提交
            try {
                const loginResp = await loginApi(loginVal);
                // 1、判断验证码是否正确
                if (!VerificationCaptcha(loginResp)) return
                // 2、判断账号密码是否正确
                if (!loginResp.data.data) {
                    message.error('账号或密码错误');
                    getCaptchaData();
                    setLoadings(false);
                    return;
                }
                // 3、判断账号是否冻结
                if (!loginResp.data.data.enabled) {
                    message.error('账号异常!请联系管理员!');
                    getCaptchaData();
                    setLoadings(false);
                    return;
                }
                // 登录成功
                // 1、保存token 和 仓库保存登录信息
                localStorage.setItem('token', loginResp.data.token);
                // 通过id获取用户信息
                try {
                    const getUserInfoByIdResp = await getUserInfoByIdApi(loginResp.data.data._id);
                    // 这里服务器返回了用户密码 这是不安全的 而且不应把密码存储在仓库
                    const ProcessingData = {
                        ...getUserInfoByIdResp.data,
                        loginPwd: ""
                    }
                    dispatch(login(ProcessingData));
                } catch (error) {
                    message.error('获取用户信息失败!稍后再试!');
                    getCaptchaData();
                    setLoadings(false);
                    return;
                }
                setLoadings(false);
                props.handleCancelModel(loginFormRef, 'login');
            } catch (error) {
                message.warning('登录失败，稍后重试!');
                getCaptchaData();
                setLoadings(false);
                return;
            }
        } else {
            // 注册表单提交
            // 1、验证账号是否可用
            const checkLoginIdResp = await checkLoginIdApi(registerVal.loginId);
            if (checkLoginIdResp.data) {
                // 账号已存在
                message.error("账号已存在");
                getCaptchaData();
                setLoadings(false);
                return;
            }
            // 进行注册操作
            try {
                const registerResp = await registerApi(registerVal);
                // 2、验证验证码是否正确
                if (!VerificationCaptcha(registerResp)) return;
                // 注册成功
                // 1、存储到本地仓库
                // 这里服务器返回了用户密码 这是不安全的 而且不应把密码存储在仓库
                const ProcessingData = {
                    ...registerResp.data,
                    loginPwd: ""
                }
                dispatch(login(ProcessingData));
            } catch (error) {
                message.warning('注册失败，稍后重试!');
                getCaptchaData();
                setLoadings(false);
                return;
            }
            props.handleCancelModel(registerFormRef, 'register');
        }
    }

    /**
     * 绑定状态
     * @param {*} formVal 表单名
     * @param {*} key 键值
     * @param {*} nowVal 修改值
     * @param {*} changeWay 修改方式
     */
    function bindFormInput(formVal, key, nowVal, changeWay) {
        const formObj = { ...formVal };
        formObj[key] = nowVal;
        changeWay(formObj)
    }

    let formEle = null;
    if (radioVal === "login") {
        formEle = (
            <Form
                ref={loginFormRef}
                name="normal_login"
                className={style["Form-Container"]}
                onFinish={() => onFinish("loginVal")}
            >
                {/* 登录账号 */}
                <Form.Item
                    name="loginId"
                    label="登录账号"
                    className={style['Label-Container']}
                    rules={[
                        {
                            required: true,
                            message: '请输入您的账号!',
                        },
                        {
                            max: 12,
                            min: 5,
                            message: '登录账号须在5-10字符之间',
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号..." allowClear={true} size='large' onChange={(event) => { bindFormInput(loginVal, "loginId", event.target.value, setLoginVal) }} />
                </Form.Item>
                {/* 登录密码 */}
                <Form.Item
                    name="password"
                    label="登录密码"
                    className={style['Label-Container']}
                    rules={[
                        {
                            required: true,
                            message: '密码不能为空!',
                        },
                    ]}
                >
                    <Input.Password
                        size='large'
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="请输入密码,新用户默认密码为123456"
                        onChange={(event) => { bindFormInput(loginVal, "loginPwd", event.target.value, setLoginVal) }}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                {/* 验证码 */}
                <Form.Item
                    name="captcha"
                    label="验证码"
                    className={style['Label-Container']}
                    rules={[
                        {
                            required: true,
                            message: '验证码不能为空!',
                        },
                        {
                            len: 4,
                            message: '验证码长度错误!',
                        }
                    ]}
                >
                    <Row>
                        <Col span={15}>
                            <Input
                                type="text"
                                placeholder="请输入验证码..."
                                size='large'
                                onChange={(event) => { bindFormInput(loginVal, "captcha", event.target.value, setLoginVal) }}
                            />
                        </Col>
                        <Col span={8} offset={1}>
                            <div
                                onClick={getCaptchaData}
                                className={style["Captcha-Container"]}
                                dangerouslySetInnerHTML={{
                                    __html: captcha
                                }}
                            ></div>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName={loginVal.remember} noStyle >
                        <Checkbox checked={loginVal['remember']} onChange={(event) => { bindFormInput(loginVal, 'remember', event.target.checked, setLoginVal) }}>记住我</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item className={style["Btn-Container"]}>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginRight: "20px" }} loading={loadings}>
                        登 录
                    </Button>
                    <Button type="primary" htmlType="reset" className="login-form-button">
                        重 置
                    </Button>
                </Form.Item>
            </Form>
        )
    } else {
        formEle = (
            <Form
                ref={registerFormRef}
                name="normal_register"
                className={style["Form-Container"]}
                onFinish={() => onFinish("registerVal")}
            >
                {/* 登录账号 */}
                <Form.Item
                    name="loginId-register"
                    label="登录账号"
                    className={style['Label-Container']}
                    rules={[
                        {
                            required: true,
                            message: '请输入您的账号!',
                        },
                        {
                            max: 12,
                            min: 5,
                            message: '登录账号须在5-10字符之间',
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号..." size='large'
                        onChange={(event) => { bindFormInput(registerVal, "loginId", event.target.value, setRegisterVal) }} />
                </Form.Item>
                {/* 用户昵称 */}
                <Form.Item
                    name="nickname-register"
                    label="用户昵称"
                    className={style['Label-Container']}
                >
                    <Input
                        type="text"
                        size='large'
                        placeholder="请输入昵称,不填写默认为新用户XXX..."
                        onChange={(event) => { bindFormInput(registerVal, "nickname", event.target.value, setRegisterVal) }}
                    />
                </Form.Item>
                {/* 验证码 */}
                <Form.Item
                    name="captcha-register"
                    label="验证码"
                    className={style['Label-Container']}
                    rules={[
                        {
                            required: true,
                            message: '验证码不能为空!',
                        },
                        {
                            len: 4,
                            message: '验证码长度错误!',
                        }
                    ]}
                >
                    <Row>
                        <Col span={15}>
                            <Input
                                type="text"
                                size='large'
                                placeholder="请输入验证码..."
                                onChange={(event) => { bindFormInput(registerVal, "captcha", event.target.value, setRegisterVal) }}
                            />
                        </Col>
                        <Col span={8} offset={1}>
                            <div
                                onClick={getCaptchaData}
                                className={style["Captcha-Container"]}
                                dangerouslySetInnerHTML={{
                                    __html: captcha
                                }}
                            ></div>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item className={style["Btn-Container"]}>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginRight: "20px" }} loading={loadings}>
                        注 册
                    </Button>
                    <Button type="primary" htmlType="reset" className="login-form-button">
                        重 置
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    return (
        <div className={style["LogAndResForm-container"]}>
            {/* 单选框 */}
            <Radio.Group onChange={onRadioChange} defaultValue={radioVal} className={style['Radio-Group']} size='large'>
                <Radio.Button value="login" className={style['Radio-Item']}>登录</Radio.Button>
                <Radio.Button value="register" className={style['Radio-Item']}>注册</Radio.Button>
            </Radio.Group>
            {/* 验证表单 */}
            {formEle}
        </div>
    );
}

export default LogAndResForm;