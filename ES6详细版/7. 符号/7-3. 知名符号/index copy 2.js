const arr1 = [1, 2, 3]
const arr2 = ['a', 'b', 'c', 'd']
const arr3 = arr1.concat(arr2)//拼接
// console.log(arr1, arr2, arr3)
// 两种情况：
// 1、[1, 2, 3, 'a', 'b', 'c', 'd']
// 2、[1, 2, 3, ['a', 'b', 'c', 'd']]
// Symbol.isConcatSpreadable 知名符号 指 在进行concat拼接时 通过定义这个知名符号属性来规定被拼接能否拆分
arr2[Symbol.isConcatSpreadable] = false;
const arr4 = arr1.concat(1, 2, arr2)//拼接

console.log(arr1, arr2, arr3,arr4)
