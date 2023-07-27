import Vue from "vue";
import VueRouter from 'vue-router'
import routes from '@/router/router'
Vue.use(VueRouter); // Vue.use(插件)  在Vue中安装插件
export default new VueRouter({
    routes,
    mode: 'history'
});