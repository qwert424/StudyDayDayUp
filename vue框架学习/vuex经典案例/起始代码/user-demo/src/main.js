import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 是否已经登录
store.dispatch("LoginStore/AsyncsetwhoAmI")

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
