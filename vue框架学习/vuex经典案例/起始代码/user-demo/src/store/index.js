import Vuex from 'vuex';
import Vue from 'vue';
import LoginStore from './LoginStore';
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: { LoginStore },
})
window.store = store;
export default store;