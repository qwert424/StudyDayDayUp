// 伪数组定义 Symbol.isConcatSpreadable
const arr = [1]
const obj = {
    0: 1,
    1: 2,
    length: 2,
    [Symbol.isConcatSpreadable]: true
}
const arr2 = arr.concat(obj)
console.log(arr, obj, arr2)//[1, {…}]

const arr3 = arr.concat(obj)
console.log(arr3)