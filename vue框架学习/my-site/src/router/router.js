import notFount from "@/view/notFount";
// 使用路由懒加载 进行包的优化
import 'nprogress/nprogress.css';
import { start, done, configure } from 'nprogress';
configure({
    trickleSpeed: 200, showSpinner: false
});

/**
 * 异步组件加载函数
 * @param {Function} Func 异步组件加载函数
 */
function getAsyncComponent(Func) {
    return async () => {
        start();
        const comp = await Func();
        done();
        return comp;
    }
}

export default [
    // 路由规则
    // 当匹配到路径 / 时，渲染 Foo 组件
    {
        name: 'Home',
        path: '/',
        component: getAsyncComponent(() => import(/* webpackChunkName:"Home" */ "@/view/Home")),
        meta: {
            title: '首页'
        }
    },
    // 当匹配到路径 /blog 时，渲染 Blog 组件
    {
        name: 'Blog',
        path: '/blog',
        component: getAsyncComponent(() => import(/*webpackChunkName:"Blog" */ "@/view/Blog")),
        meta: {
            title: '文章'
        }
    },
    // 当匹配到路径 /blog/cate/:categroyId 时，渲染 Blog 组件
    {
        name: 'categroyBlog',
        path: '/blog/cate/:categroyId',
        component: getAsyncComponent(() => import(/* webpackChunkName:"Blog" */ "@/view/Blog")),
        meta: {
            title: '文章'
        }
    },
    // 当匹配到路径 /blog/cate/:id 时，渲染 BlogArticle 组件
    {
        name: 'BlogArticle',
        path: '/blog/:id',
        component: getAsyncComponent(() => import(/* webpackChunkName:"BlogArticle" */ "@/view/Blog/detail")),
        meta: {
            title: '文章详情页'
        }
    },
    // 当匹配到路径 /about 时，渲染 About 组件
    {
        name: 'About',
        path: '/about',
        component: getAsyncComponent(() => import(/* webpackChunkName:"About" */ "@/view/About")),
        meta: {
            title: '关于我'
        }
    },
    // 当匹配到路径 /message 时，渲染 Message 组件
    {
        name: 'Message',
        path: '/message',
        component: getAsyncComponent(() => import(/* webpackChunkName:"Message" */ "@/view/Message")),
        meta: {
            title: '留言板'
        }
    },
    // 当匹配到路径 /project 时，渲染 Project 组件
    {
        name: 'Project',
        path: '/project',
        component: getAsyncComponent(() => import(/* webpackChunkName:"Project" */ "@/view/Project")),
        meta: {
            title: '项目&效果'
        }
    },
    // 当匹配到路径 /* 时，渲染 404 组件
    {
        name: 'NotFound',
        path: '*',
        component: notFount,
        meta: {
            title: '404 Not Found',
        }
    },
]