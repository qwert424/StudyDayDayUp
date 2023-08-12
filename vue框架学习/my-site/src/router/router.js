import Home from '@/view/Home';
import About from '@/view/About';
import Message from '@/view/Message';
import Project from '@/view/Project';
import Blog from '@/view/Blog';
import BlogArticle from '@/view/Blog/detail';

export default [
    // 路由规则
    // 当匹配到路径 / 时，渲染 Foo 组件
    {
        name: 'Home', path: '/', component: Home, meta: {
            title: '首页'
        }
    },
    // 当匹配到路径 /blog 时，渲染 Blog 组件
    {
        name: 'Blog', path: '/blog', component: Blog, meta: {
            title: '文章'
        }
    },
    // 当匹配到路径 /blog/cate/:categroyId 时，渲染 Blog 组件
    {
        name: 'categroyBlog', path: '/blog/cate/:categroyId', component: Blog, meta: {
            title: '文章'
        }
    },
    // 当匹配到路径 /blog/cate/:id 时，渲染 BlogArticle 组件
    {
        name: 'BlogArticle', path: '/blog/:id', component: BlogArticle, meta: {
            title: '文章详情页'
        }
    },
    // 当匹配到路径 /about 时，渲染 About 组件
    {
        name: 'About', path: '/about', component: About,
        meta: {
            title: '关于我'
        }
    },
    // 当匹配到路径 /message 时，渲染 Message 组件
    {
        name: 'Message', path: '/message', component: Message, meta: {
            title: '留言板'
        }
    },
    // 当匹配到路径 /project 时，渲染 Project 组件
    {
        name: 'Project', path: '/project', component: Project, meta: {
            title: '项目&效果'
        }
    },
]