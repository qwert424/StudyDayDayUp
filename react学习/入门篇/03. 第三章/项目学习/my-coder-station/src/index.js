import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 引入antd组件库相关文件
import zhCN from "antd/es/locale/zh_CN"; // 中文语言包
import { ConfigProvider } from "antd";

// 引入路由相关文件
import { BrowserRouter } from "react-router-dom";

// 引入仓库相关文件
import store from './store/store';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
