//仓库配置

// 模拟异步延迟方法
function delay(duration) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), duration)
    })
}

window.delay = delay;
export default {
    // 仓库的初始状态（数据）
    state: {
        count: 0,
    },
    mutations: {
        increase(state) {
            state.count++;
        },
        decrease(state) {
            state.count--;
        },
        power(state, payload) {
            state.count **= payload;
        }
    },
    actions: {
        async asyncIncrease(context) {
            await delay(2000)
            context.commit('increase');
        },
        async asyncDecrease(context) {
            await delay(2000)
            context.commit('decrease');
        },
        async asyncPower(context, payload) {
            await delay(2000)
            context.commit('power', payload);
        }
    }
}