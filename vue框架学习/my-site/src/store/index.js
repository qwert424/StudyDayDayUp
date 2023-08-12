import Vuex from 'vuex';
import Vue from 'vue';
import banner from "./banner";
import Mysetting from "./Mysetting";
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    modules: {
        banner,
        Mysetting
    }
});
window.store = store;
export default store;