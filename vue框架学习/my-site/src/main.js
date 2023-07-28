import Vue from 'vue';
import App from './App.vue';
import "./Style/global.module.less";
import router from '@/router';//路由

// import '@/mock';//mockjs模拟拦截数据
// import '@/api';//请求远程数据

// 实例方法 消息弹窗
import { showMessage } from './utils';
Vue.prototype.$showMessage = showMessage;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')