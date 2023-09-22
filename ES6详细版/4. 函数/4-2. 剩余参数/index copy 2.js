function test(...args1, ...args2) {//错误 只能有一个剩余参数
    console.log(args1)
    console.log(args2)
}

test(1, 32, 46, 7, 34);