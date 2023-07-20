import Vue from './vue.browser.js';
import App from './App.js'

// 这个js文件作为模板入口 且Vue实例的渲染模板操作
new Vue({
    render: h => h(App),//渲染App
}).$mount("#app")