import Counter from '../components/Counter.vue'
import todoList from '../components/todoList.vue'
import shoppingcart from '../components/shoppingcart.vue'

export default [
    { path: '/counter', name: 'counter', component: Counter },
    { path: '/todoList', name: 'todoList', component: todoList },
    { path: '/shoppingcart', name: 'shoppingcart', component: shoppingcart }
]