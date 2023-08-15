import { Store, install } from 'vuex';
import Vue from 'vue';
import banner from "./banner";
import Mysetting from "./Mysetting";
import about from "./about";
import project from "./project";

if (!window.Vuex) {
    install(Vue);
}

const store = new Store({
    strict: true,
    modules: {
        banner,
        Mysetting,
        about,
        project
    }
});
export default store;