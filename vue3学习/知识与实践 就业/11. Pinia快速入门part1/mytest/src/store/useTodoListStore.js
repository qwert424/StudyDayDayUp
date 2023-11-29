import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import { useCounterStore } from './useCounterStore';

// composition Api 方式
export const useTodoListStore = defineStore('TodoList', () => {
    const state = reactive({
        items: [
            {
                text: "学习 Pinia",
                isCompleted: true,
            },
            {
                text: "打羽毛球",
                isCompleted: false,
            },
            {
                text: "玩游戏",
                isCompleted: true,
            },
        ],
        counter: 100
    })

    const doubleCounter = computed(() => {
        return state.counter * 2
    })

    const otherCounter = computed(() => {
        const otherStore = useCounterStore()
        return otherStore.num
    })

    function increaseDoubleCounter() {
        state.counter++
    }

    function handleAdd(item) {
        state.items.push({
            text: item,
            isCompleted: false,
        })
    }
    function handleChange(index) {
        state.items[index].isCompleted = !state.items[index].isCompleted
    }
    function handleDel(index) {
        state.items.splice(index, 1)
    }
    return {
        state,
        doubleCounter,
        increaseDoubleCounter,
        otherCounter,
        handleAdd,
        handleChange,
        handleDel
    }
})