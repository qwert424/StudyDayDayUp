import { getSetting } from '@/api/setting';
import { setfavicon, setTitleControl } from '@/utils'
export default {
    namespaced: true,
    state: {
        data: null
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        }
    },
    actions: {
        async getSettingData(context) {
            const resp = await getSetting();
            context.commit('setData', resp);
            if (resp.favicon) {
                setfavicon(resp.favicon)
            }
            if (resp.siteTitle) {
                setTitleControl.setNetTitleControl(resp.siteTitle)
            }
        }
    }
}