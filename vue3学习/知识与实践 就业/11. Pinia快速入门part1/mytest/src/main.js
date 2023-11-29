import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
// 路由
import router from './router'
// pinia仓库
import { createPinia } from 'pinia'
const pinia = createPinia()
// 插件
import { myPlugin1, myPlugin2 } from './plugin/'
pinia.use(myPlugin1)
pinia.use(myPlugin2)

createApp(App).use(router).use(pinia).mount('#app')
