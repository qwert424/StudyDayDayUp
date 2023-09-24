// 两种构造函数练习
// ES6之前：
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }
// Person.prototype.getAge = function () {
//     console.log(this.age)
// }
// const person = new Person("方", 18);
// console.log(person);
// person.getAge();
// for (const key in person) {
//     console.log(key)
// }
// const x = new person.getAge();//不合理
// 老方法缺点：
// 1、原型方法 和 构造函数属性 书写分离 不利于阅读
// 2、可以不通过new调用 即普通函数调用 不好 虽然可以通过new.target控制 仍然麻烦
// 3、遍历时候会将原型上的方法遍历出来 不遍历
// 4、即使是原型的方法也可以new 不合理

// 现在的 方法 ES6 类
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getAge() {
        console.log(this.age)
    }
}
const person = new Person("方", 18);
person.getAge();
console.log(person)
for (const key in person) {
    console.log(key)
}
const x = new person.getAge();//person.getAge is not a constructor

// 现在的优点：
// 1、一个整体 可读性好
// 2、与let、const一样 不会污染全局 且不能在定义前使用 即暂时性死区 且严格模式运行
// 3、原型上的属性不会被遍历
// 4、必须new创建
// 5、原型方法不可以new
