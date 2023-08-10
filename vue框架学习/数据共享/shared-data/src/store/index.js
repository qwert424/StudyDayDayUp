import vuex from 'vuex';
import Vue from 'vue';
import stortInfo from './storeInfo';

Vue.use(vuex);//使用插件

const store = new vuex.Store(
  stortInfo,// 仓库配置
)

export default store;//导出store
