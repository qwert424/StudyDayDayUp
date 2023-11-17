import { defineAsyncComponent } from "vue";
import errorComponent from "../components/errorComponent/index.vue";
import loadingComponent from "../components/loadingComponent/index.vue";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
    trickleSpeed: 50,
    showSpinner: false,
});
/**
 * 延迟函数 模拟网络通讯
 * @param {*} duration 延迟时间
 * @returns 
 */
function delay(duration) {
    if (!duration) {
        duration = random(1000, 5000)
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, duration)
    })
}

/**
 * 范围随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns 
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 异步组件的加载
 * @param {*} Path 组件路径 
 */
export function asyncComponent(Path) {
    return defineAsyncComponent({
        loader: async () => {
            NProgress.start()
            await delay()
            if (Math.random() < 0.5) {
                const comp = await import(Path)
                NProgress.done();
                return comp;
            }
            throw new Error("加载失败")
        },
        errorComponent: errorComponent,
        loadingComponent: loadingComponent
    })
}

/**
 * 异步页面加载
 * @param {*} Path 页面路径 
 */
export function asyncPage(Path) {
    return defineAsyncComponent({
        loader: async () => {
            NProgress.start()
            await delay()
            const page = await import(Path)
            NProgress.done();
            return page
        },
        loadingComponent: loadingComponent
    })
}