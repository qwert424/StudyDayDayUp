import { getAbout } from '@/api/about'

// 关于我仓库
export default {
    namespaced: true,
    state: {
        isLoading: false,
        data: ""
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        },
        setIsLoading(state, payload) {
            state.isLoading = payload;
        }
    },
    actions: {
        async asyncGetAbout(context) {
            if (context.state.data) {
                return;
            }
            context.commit('setIsLoading', true);
            const resp = await getAbout();
            context.commit('setData', resp);
            context.commit('setIsLoading', false);
        }

    }
}