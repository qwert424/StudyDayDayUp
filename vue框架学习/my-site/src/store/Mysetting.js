import { getSetting } from '@/api/setting';
import { setfavicon, setTitleControl } from '@/utils'
import { serveURL } from '@/basis_URL';
// 全局设置仓库
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
            resp.avatar = serveURL + resp.avatar;
            resp.qqQrCode = resp.qqQrCode === '' ? '' : serveURL + resp.qqQrCode;
            resp.weixinQrCode = resp.weixinQrCode === '' ? '' : serveURL + resp.weixinQrCode;
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