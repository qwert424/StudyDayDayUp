import { getProject } from '@/api/project'

// 关于我仓库
export default {
    namespaced: true,
    state: {
        isLoading: false,
        data: [],
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
        async asyncGetProject(context) {
            if (context.state.data.length) {
                return;
            }
            context.commit('setIsLoading', true);
            const resp = await getProject();
            context.commit('setData', resp);
            context.commit('setIsLoading', false);
        }

    }
}