import Vuex from 'vuex';
import Vue from 'vue';
import LoginStore from './LoginStore';
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: { LoginStore },
    strict: true,//严格模式 只能通过mutation来改变数据
})
export default store;