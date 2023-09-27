
// const obj = {
//     a: 1,
//     b: 2,
//     [Symbol.for("c")]: 3
// }

// console.log(obj[Symbol.for("c")]);

const obj = {
    name: "kaven",
    age: 18,
    [Symbol.for("c")]: 3
}
console.log(obj[Symbol.for("c")]);//通过Symbol.for获得共享符号属性