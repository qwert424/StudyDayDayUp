//创建一个符号

const syb1 = Symbol("这是随便写的一个符号");
const syb2 = Symbol("这是随便写的一个符号");

console.log(syb1, syb2);
console.log(syb1 === syb2)

// 以上是符号函数生成的普通函数是唯一的
