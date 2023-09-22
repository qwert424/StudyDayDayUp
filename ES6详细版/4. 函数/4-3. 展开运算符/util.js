/**
 * 剩余参数求和
 * @param  {*} ...args 剩余参数
 */
function sum(...args) {
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum += args[i];
    }
    return sum;
}

/**
 * 生成一个自定义长度的随机数组
 * @param {Number} length 长度
 */
function randomArr(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.random());
    }
    return arr
}

// 对自定义长度的随机数组求和 就需要用到展开运算符
console.log(sum(...randomArr(10)));
console.log(sum(2, 1, ...randomArr(10), 4, 5));//展开式可以在任何位置

// 克隆arr1数组到arr2
const arr1 = [1, 24, 5, 6]

const arr2 = [...arr1]
console.log(arr2, arr1 === arr2)//克隆
const arr3 = [12, ...arr1, 12]//可以任意位置

// 浅克隆例子
const obj = {
    name: 'test',
    age: 18,
    address: {
        city: 'beijing'
    }
}

// 对象展开
const obj2 = { ...obj }
console.log(obj === obj2, obj.address === obj2.address)//再次展开 完成深克隆
// 可以对展开后的对象 重新赋值
const obj3 = {
    ...obj,
    name: "aaa",
    address: {
        ...obj.address,
    }
}
console.log(obj3, obj.address === obj3.address)//深克隆
