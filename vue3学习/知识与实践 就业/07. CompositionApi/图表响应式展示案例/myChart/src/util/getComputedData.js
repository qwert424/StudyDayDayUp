import { computed, ref, watch } from 'vue'
import gasp from 'gsap'
const colorArr = ["#334552", "#B34335", "#6E9FA5", "#A2C3AC", "#C8846C"];
/**
 * 通过该函数 获取所需的所以值 
 * @param {*} obj 原始值
 * @param {*} max 最大宽度
 */
export function getComputedData(obj, max) {
    const nowDataRef = ref([])
    const targetDataRef = computed(() => {
        return obj.value.map((item, index) => {
            return {
                ...item,
                width: item.value / getMax(obj) * max,
                color: colorArr[index % 5]
            }
        })
    })

    watch(targetDataRef, () => {
        for (let i = 0; i < targetDataRef.value.length; i++) {
            if (!nowDataRef.value[i]) {
                nowDataRef.value[i] = {
                    ...targetDataRef.value[i],
                    width: 0,
                    value: 0
                }
            }
            gasp.to(nowDataRef.value[i], {
                ...targetDataRef.value[i],
                duration: 1,
            })
        }
    }, { immediate: true })
    return nowDataRef
}

/**
 * 获取原始值的值最大值
 * @param {*} obj 
 * @returns 
 */
function getMax(obj) {
    return Math.max(...obj.value.map(item => item.value))
}