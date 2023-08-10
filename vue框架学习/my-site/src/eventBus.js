// 事件总线：{ 
// 1、提供监听事件的接口 $on
// 2、提供取消监听事件的接口 $off
// 3、提供触发事件的接口（可传递参数） $emit
// 4、提供触发事件后自动通知监听者 
// }

// 方法一：用vue实例 实例对象包含$on $off $emit

// 方法二：自己写一个事件总线包含$on $off $emit

// 方法三：在vue的原型链上添加$bus

// 方法一：
// import Vue from 'vue'
// export default new Vue({});

// 方法二：
// const event = {};
// export default {
//     $on(eventName, handlefunc) {
//         if (!event[eventName]) {
//             event[eventName] = new Set();
//         }
//         event[eventName].add(handlefunc);
//     },
//     $off(eventName, handlefunc) {
//         if (!event[eventName]) {
//             return;
//         }
//         event[eventName].delete(handlefunc);
//     },
//     $emit(eventName, ...data) {
//         if (!event[eventName]) {
//             return;
//         }
//         event[eventName].forEach(func => {
//             func(...data);
//         });
//     },

// }

// 方法三：
import Vue from 'vue';
const app = new Vue({});
Vue.prototype.$bus = app;

export default app;

// 测试事件总线
// import eventBus from "./eventBus"

// const handle1 = function (data) {
//   console.log("handel1", data)
// }
// const handle2 = function (data) {
//   console.log("handel2", data)
// }
// eventBus.$on("test", handle1)
// eventBus.$on("test", handle2)
// eventBus.$on("test1", handle1)
// window.eventBus = eventBus;
// window.handle1 = handle1;
// window.handle2 = handle2;

// on监听事件：mainScroll(滚动监听) setScrollToTop(回到顶部) onloadComplete(加载完成)

