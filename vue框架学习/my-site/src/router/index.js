import Vue from "vue";
import VueRouter from 'vue-router'
import routes from '@/router/router'
import { setTitleControl } from '@/utils'
if(!window.VueRouter){
    // CDN 会污染全局变量
    Vue.use(VueRouter); // Vue.use(插件)  在Vue中安装插件
}
const router = new VueRouter({
    routes,
    mode: 'history'
});

router.afterEach((to, from) => {
    if (to.meta.title) {
        setTitleControl.setRouterTitleControl(to.meta.title)
    }
})
export default router;