import './App.css';
import { useState, useEffect } from 'react';
import { Layout, Modal, notification, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import NavHeader from './components/NavHeader/NavHeader.jsx';
import PageFooter from './components/PageFooter/PageFooter.jsx';
import LogAndResForm from './components/LogAndResForm/LogAndResForm.jsx';
import { getUserByTokenApi, getUserInfoByIdApi } from './api/interface/LogAndReg.js'
import { useDispatch } from 'react-redux';
import { login } from './store/userSlice.js'

// 路由
import Router from './router/index.jsx';

const { Header, Content, Footer } = Layout;

function App() {

  // 仓库
  const dispatch = useDispatch();

  // 恢复登录
  async function whoami() {
    // 条件判断1、本地有没有token值
    if (localStorage.getItem('token')) {
      try {
        const getUserByTokenResp = await getUserByTokenApi();
        // 条件判断2、token值是否过期
        if (!getUserByTokenResp.data) {
          message.error('token已过期，请重新登录');
          localStorage.removeItem('token');
          return null;
        }
        // token值正确 根据返回值id获取用户信息
        // 通过id获取用户信息
        try {
          const getUserInfoByIdResp = await getUserInfoByIdApi(getUserByTokenResp.data._id);
          // 这里服务器返回了用户密码 这是不安全的 而且不应把密码存储在仓库
          const ProcessingData = {
            ...getUserInfoByIdResp.data,
            loginPwd: ""
          }
          dispatch(login(ProcessingData));
        } catch (error) {
          message.error('获取用户信息失败!稍后再试!');
          return;
        }

      } catch (error) {
        return null;
      }
    }
  };

  // 副作用
  useEffect(() => {
    whoami()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // 模态框信息
  const [openModal, setOpenModal] = useState(false);
  // 展示模态框
  const showModal = () => {
    setOpenModal(true);
  };
  //  关闭模态框
  const handleCancel = (value, formType) => {
    value && value.current && value.current.resetFields();
    setOpenModal(false);
    formType && (formType === 'login' ? openLoginNotification() : openRegisterNotification())
  };


  // 气泡提示框
  const [api, contextHolder] = notification.useNotification();
  const openRegisterNotification = () => {
    api.open({
      message: '注册 成功',
      description:
        '新用户默认密码为:123456',
      icon: (
        <SmileOutlined
          style={{
            color: '#108ee9',
          }}
        />
      ),
    });
  };
  const openLoginNotification = () => {
    api.open({
      message: '登录 成功',
      description:
        '欢迎使用 Coder Station !',
      icon: (
        <SmileOutlined
          style={{
            color: '#108ee9',
          }}
        />
      ),
    });
  };

  return (
    <div className="App" >
      {/* 布局组件 */}
      < Layout >
        {/* 页头 */}
        <Header
          className='Header-Container'
        >
          <NavHeader showModal={showModal} />
        </Header>
        {/* 主区域 */}
        < Content
          className='Content-Container'
        >
          <Router />
        </ Content>
        {/* 页尾 */}
        < Footer
          className='Footer-Container'
        >
          <PageFooter />
        </ Footer>
      </Layout >
      {/* 模态框 */}
      <Modal
        destroyOnClose={true}
        title="注册 登录"
        centered
        keyboard
        footer={null}
        open={openModal}
        onCancel={handleCancel}
      >
        <LogAndResForm handleCancelModel={handleCancel} />
      </Modal >
      {/* 气泡提示 */}
      {contextHolder}
    </div>
  );
}

export default App;
