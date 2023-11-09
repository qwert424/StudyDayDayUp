import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

// 没有Vue实例
// import Vue from 'vue'
// console.log(createApp())
// console.log(Vue())main.js:6 Uncaught SyntaxError: The requested module '/@modules/vue.js' does not provide an export named 'default'

createApp(App).mount('#app')
