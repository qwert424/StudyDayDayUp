import Vuex from 'vuex';
import Vue from 'vue';
import banner from "./banner";
import Mysetting from "./Mysetting";
import about from "./about";
import project from "./project";
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    modules: {
        banner,
        Mysetting,
        about,
        project
    }
});
window.store = store;
export default store;