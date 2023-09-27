const syb = Symbol();

const obj = {
    [syb]: 1,
    a: 2,
    b: 3
}

// for (const prop in obj) {
//     console.log(prop)
// }

// console.log(Object.keys(obj))
// console.log(Object.getOwnPropertyNames(obj))
// //得到的是一个符号属性的数组
// console.log(Object.getOwnPropertySymbols(obj))//也是获得数组 即 符号函数生成的符号
// console.log(syb === Object.getOwnPropertySymbols(obj)[0])//指向同一个地址

// 以上说明 符号是不可枚举的 且只能通过getOwnPropertySymbols方法获取

