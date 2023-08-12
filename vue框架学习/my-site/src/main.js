import Vue from 'vue';
import App from './App.vue';
import "./Style/global.module.less";
import '@/mock';//mockjs模拟拦截数据
import router from '@/router';//路由
import '@/eventBus';//事件总线
import store from '@/store';//vuex

// 标题
document.title = 'loadind...'

// 配置全局指令
import vLoading from '@/directives/Loading';
Vue.directive('Loading', vLoading)

// 实例方法 消息弹窗
import { showMessage } from './utils';
Vue.prototype.$showMessage = showMessage;

// 全局设置 仓库
store.dispatch('Mysetting/getSettingData')

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

