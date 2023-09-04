import { getBanner } from "@/api/banner";
import { baseURL } from "@/basis_URL";
// 导航标语仓库
export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        },
    },
    actions: {
        async asyncGetBanner(context) {
            const resp = await getBanner();
            const newresp = resp.data.map(item => {
                const initMidImg = baseURL + item.midImg;
                const initBigImg = baseURL + item.bigImg;
                return {
                    ...item,
                    initMidImg,
                    initBigImg
                }
            })
            context.commit('setData', newresp);
        }
    }
}