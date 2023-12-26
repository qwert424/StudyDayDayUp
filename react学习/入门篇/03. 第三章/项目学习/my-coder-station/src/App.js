import './App.css';
import { useState } from 'react';
import { Layout, Modal, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import NavHeader from './components/NavHeader/NavHeader.jsx';
import PageFooter from './components/PageFooter/PageFooter.jsx';
import LogAndResForm from './components/LogAndResForm/LogAndResForm.jsx';
// 路由
import Router from './router/index.jsx';

const { Header, Content, Footer } = Layout;

function App() {
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
    formType && formType === 'login' ? openLoginNotification() : openRegisterNotification()
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
