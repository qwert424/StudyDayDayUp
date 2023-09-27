class Person {

    [Symbol.toStringTag] = "Person"
}

const p = new Person();

const arr = [32424, 45654, 32]

console.log(Object.prototype.toString.apply(p));//Symbol.toStringTag 知名符号更改
console.log(Object.prototype.toString.apply(arr))//原生