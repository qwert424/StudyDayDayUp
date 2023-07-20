// 此处作为组件 有千千万万个组件 就是通过引用到App.js中
const template = `<button @click="count++">标题：{{title}} 点击数字：{{count}}</button>`;



export default {
    data() {
        return {
            count: 0,
        }
    },
    props: ['title'],
    template,
}