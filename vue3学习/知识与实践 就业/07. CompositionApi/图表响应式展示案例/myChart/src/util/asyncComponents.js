import { defineAsyncComponent } from "vue";
import errorComponent from "../components/errorComponent/index.vue";
import loadingComponent from "../components/loadingComponent/index.vue";

/**
 * 延迟函数 模拟网络通讯
 * @param {*} duration 延迟时间
 * @returns 
 */
function delay(duration) {
    if (!duration) {
        duration = random(1000, 2000)
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
            await delay()
            if (Math.random() < 0.9) {
                return import(Path)
            }
            throw new Error("加载失败")
        },
        errorComponent: errorComponent,
        loadingComponent: loadingComponent
    })
}