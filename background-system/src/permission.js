import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist 白名单

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = store.getters.token //获取Token
  const hasUserInfo = store.getters.userInfo//获取用户信息

  if (to.meta.auth) {
    // 需要鉴权
    // 是否登录、有用户信息
    if (hasUserInfo) {
      next();
      NProgress.done();
      return;
    }
    if (hasToken) {
      // 没有用户信息，有token
      // 判断是否已拉取完user_info信息
      try {
        await store.dispatch('user/getInfo', hasToken);
        next();
      } catch (e) {
        Message.error(JSON.parse(e).msg);
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`);
      } finally {
        NProgress.done();
      }
    } else {
      // 没有token
      Message.error("请先登录!");
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  } else {
    // 不需要鉴权
    //  是否登录页
    if (to.path !== '/login') {
      next();
      NProgress.done();
      return;
    }
    // 是否登录、有用户信息
    if (hasUserInfo) {
      Message.warning("您已登录! 无需重复登录");
      next({ path: '/' })//首页
      NProgress.done();
      return;
    }
    if (hasToken) {
      try {
        await store.dispatch('user/getInfo', hasToken);
        next({ path: '/' });
      } catch (e) {
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`);
      } finally {
        NProgress.done();
      }
    } else {
      next();
      NProgress.done();
    }
  }

  // 以下是vue-element-admin自己的鉴权流程
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')
  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})