import { getBanner } from "@/api/banner";
import { serveURL } from "@/basis_URL";
// 导航标语仓库
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
            resp.map(item => {
                item.midImg = serveURL + item.midImg
                item.bigImg = serveURL + item.bigImg
            })
            context.commit('setData', resp);
            context.commit('setIsLoading', false);
        }
    }
}