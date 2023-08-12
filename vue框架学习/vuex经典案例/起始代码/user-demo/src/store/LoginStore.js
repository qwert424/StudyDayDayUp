// 登录仓库
import { Login, LoginOut, whoAmI } from '@/api/user'

export default {
    namespaced: true,
    state: {
        userData: null,
        isLoading: false,
    },
    mutations: {
        setUser(state, payload) {
            state.userData = payload;
        },
        setisLoading(state, payload) {
            state.isLoading = payload;
        }
    },
    getters: {
        status(state) {
            if (state.isLoading) {
                // 登入中
                return 'loading';
            } else if (state.userData) {
                // 已登录
                return 'login';
            } else {
                // 未登录
                return 'unLogin';
            }
        }
    },
    actions: {
        async AsyncsetLogin(context, payload) {
            context.commit('setisLoading', true);
            const resp = await Login(payload.LoginId, payload.LoginPwd)
            context.commit('setUser', resp)
            context.commit('setisLoading', false);
            return resp;
        },
        async AsyncsetLoginOut(context) {
            context.commit('setisLoading', true);
            await LoginOut();
            context.commit('setUser', null);
            context.commit('setisLoading', false);
        },
        async AsyncsetwhoAmI(context) {
            context.commit('setisLoading', true);
            const resp = await whoAmI();
            context.commit('setUser', resp);
            context.commit('setisLoading', false);
        }
    }
}