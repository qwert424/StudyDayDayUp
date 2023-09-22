/**
 * 计算最大值、最小值
 * @param {*} value
 */
function maxAndmin(arr) {
    const max = Math.max(...arr)
    const min = Math.min(...arr)
    return {
        max, min
    }
}

/**
 * 获取数据
 */
function getArr() {
    const inputs = [...document.querySelectorAll("input")];
    const arr = [];
    inputs.forEach(item => {
        arr.push(item.value)
    })
    return arr;
}
// 点击事件
document.querySelector('#btn').addEventListener('click', function () {
    const result = maxAndmin(getArr())
    document.querySelector("#spanmin").innerHTML = result.min;
    document.querySelector("#spanmax").innerHTML = result.max;
})

//curry：柯里化，用户固定某个函数的前面的参数，得到一个新的函数，新的函数调用时，接收剩余的参数

/**
 * 计算函数
 */
function cale(a, b, c, d) {
    return a + b * c - d;
}

// 假设现在前两个值都是固定的1，2；写一个柯里化函数 实现这个操作
function curry(fn, ...args) {
    return function (...nextArgs) {
        // 剩余参数
        const allArgs = [...args, ...nextArgs];
        // 剩余参数为空时，执行函数
        if (allArgs.length >= fn.length) {
            return fn(...allArgs);
        } else {
            return curry(fn, ...allArgs);
        }
    }
}

