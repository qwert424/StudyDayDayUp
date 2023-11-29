import { defineStore } from 'pinia'

// options Api 方式
export const useCounterStore = defineStore('Counter', {
    state: () => {
        return {
            num: 0
        }
    },
    getters: {
        doubleNum: (state) => {
            return state.num * 2
        }
    },
    actions: {
        increaseNum() {
            this.num++
        },
        decreaseNum() {
            this.num--
        },
        // 异步变化
        async asyncIncreaseNum() {
            await new Promise((resolve) => setInterval(resolve, 1000))
            this.num++
        },
        async asyncDecreaseNum() {
            await new Promise((resolve) => setInterval(resolve, 1000))
            this.num--
        }
    }
})