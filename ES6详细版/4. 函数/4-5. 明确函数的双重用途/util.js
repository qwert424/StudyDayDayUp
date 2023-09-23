// 写一个构造函数 区分是通过什么方式使用这个函数的
// function Person(fir, las) {
//     this.firstName = fir;
//     this.lastName = las;
//     this.fullName = `${this.firstName} ${this.lastName}`;
// }
Person.prototype.print = function () {
    console.log(this.fullName);
}
// 通过new Person this指向Person
// 通过Person() this指向window

// new Person('无敌', "龙傲天").print();
// Person('无敌', "龙傲天")//window.fullName='无敌 龙傲天' 

// 原始方法 通过判断this是不是Person的实例来区分
// function Person(fir, las) {
//     if (this instanceof Person) {
//         this.firstName = fir;
//         this.lastName = las;
//         this.fullName = `${this.firstName} ${this.lastName}`;
//     } else {
//         throw new Error('不是通过new创建')
//     }
// }
// Person('无敌', "龙傲天")//util.js:23 Uncaught Error: 不是通过new创建
// 但是可以通过apply、call改变this指向
// Person.call(new Person(), '无敌', "龙傲天")//不符合要求

// ES6提出新的api new.target完美解决是不是通过new运行函数
function Person(fir, las) {
    if (new.target === undefined) {
        throw new Error('不是通过new创建')
    }
    this.firstName = fir;
    this.lastName = las;
    this.fullName = `${this.firstName} ${this.lastName}`;
}

new Person('无敌', "龙傲天").print();
Person('无敌', "龙傲天")//util.js:33 Uncaught Error: 不是通过new创建

