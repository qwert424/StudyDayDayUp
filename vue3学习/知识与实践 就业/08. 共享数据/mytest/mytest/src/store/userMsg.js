import * as getUser from '../api/getUser';

export default {
    namespaced: true,
    state: {
        User: null,
        isLoading: false,
    },
    mutations: {
        setUser(state, payload) {
            state.User = payload;
        },
        setLoading(state, payload) {
            state.isLoading = payload;
        }
    },
    actions: {
        // 异步登录
        async login({ commit }, { id, pwd }) {
            // 设置加载状态
            commit('setLoading', true);
            // 调用登录接口
            const res = await getUser.login(id, pwd);
            commit('setUser', res);
            // 设置加载状态
            commit('setLoading', false);
        },
        // 登出
        async loginOut({ commit }) {
            // 设置加载状态
            commit('setLoading', true);
            // 调用登出接口
            await getUser.loginOut();
            commit('setUser', null);
            // 设置加载状态
            commit('setLoading', false);
        },
        // 验证
        async whoami({ commit }) {
            // 设置加载状态
            commit('setLoading', true);
            // 调用验证接口
            const res = await getUser.whoami();
            commit('setUser', res);
            // 设置加载状态
            commit('setLoading', false);
        },
    }
}