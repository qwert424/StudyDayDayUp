import { getBanner } from "@/api/banner";

export default {
    namespaced: true,
    state: {
        isLoading: false,
        data: []
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
        async asyncGetBanner(context) {
            if (context.state.data.length) {
                return;
            }
            context.commit('setIsLoading', true);
            const resp = await getBanner();
            context.commit('setData', resp);
            context.commit('setIsLoading', false);
        }

    }
}