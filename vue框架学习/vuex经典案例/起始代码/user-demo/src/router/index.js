import VueRouter from 'vue-router';
import routes from './routes';
import Vue from 'vue';
import store from '@/store';

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  // 是否有权限
  if (to.meta.auth) {
    // 看状态 1、登录中 2、已登录 3、未登录
    const status = store.getters['LoginStore/status'];
    if (status === 'loading') {
      next({
        name: 'Loading',
        query: {
          redirect: to.fullPath
        },
      })
      return;
    } else if (status === 'unLogin') {
      alert("未登录账号，请先登录！");
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      });
      return;
    }
  }
  next();
})
export default router;
