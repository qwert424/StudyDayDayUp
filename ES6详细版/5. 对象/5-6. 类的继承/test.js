// 继承
// 原始方法
// function Animal(type, name, sex) {
//     this.name = name;
//     this.type = type;
//     this.sex = sex;
// }
// Animal.prototype.jiao = function () {
//     console.log("汪汪")
// }
// function Dog(name, sex) {
//     Animal.call(this, "狗", name, sex);
// }
// const dog = new Dog('旺财', '公');
// // console.log(dog)
// // 原始方法 不会使得Dog构造函数的原型隐士指向Animal.prototype 指向Object
// // dog.jiao()//test.js:17 Uncaught TypeError: dog.jiao is not a function
// // console.dir(Dog.prototype)//Object
// // 所以需要用Object.setPrototypeOf 改变隐式指向
// Object.setPrototypeOf(Dog.prototype, Animal.prototype);
// dog.jiao()
// 上面方法很不方便

// ES6方法
// class Animal {
//     constructor(type, name, sex) {
//         this.name = name;
//         this.type = type;
//         this.sex = sex;
//     }
//     jiao() {
//         console.log("汪汪")
//     }
//     print() {
//         console.log(this.name, this.type, this.sex)
//     }
// }
// class Dog extends Animal {
//     // 情况一：没有构造器constructor 直接使用父类的构造器
//     // 情况二：有构造器constructor 必须要调用一次父类构造器 super调用
//     constructor(name, sex) {
//         super('狗', name, sex);
//     }
//     print() {
//         // super.print();
//         console.log(this)
//     }
// }
// // const dog = new Dog('nihao', '公')
// // console.log(dog)//Dog {name: '公', type: 'nihao', sex: undefined}不符合我们的需求
// // const dog = new Dog('nihao', '公')
// // console.log(dog)//Dog {name: 'nihao', type: '狗', sex: '公'}
// // 也解决了原型的问题
// // console.log(Dog.prototype.__proto__ === Animal.prototype)//true
// // 构造函数的方法在原型链上依次寻找 可以“覆盖”继承类 即优先使用自己的同名方法 正常情况下不管是super还是什么 this指向都是具体类的对象
// // const dog = new Dog('nihao', '公')
// // dog.print()//Dog {name: 'nihao', type: '狗', sex: '公'}
// // 对于父类方法的重写 也是通过super来调用父类方法 在书写自己的方法
// // const dog = new Dog('nihao', '公')
// // dog.print()//nihao 狗 公 Dog { name: 'nihao', type: '狗', sex: '公' }

// 抽象类
// 即根据我们的思维 我们认为我们不能通过Animal来构造对象 所以应该将Animal类变成抽象类 不能通过new Animal来构造对象
// class Animal {
//     constructor(type, name, sex) {
//         if (new.target === Animal) {
//             throw new Error('抽象类不能被实例化')
//         }
//         this.name = name;
//         this.type = type;
//         this.sex = sex;
//     }
//     jiao() {
//         console.log("汪汪")
//     }
//     print() {
//         console.log(this.name, this.type, this.sex)
//     }
// }
// class Dog extends Animal {
//     // 情况一：没有构造器constructor 直接使用父类的构造器
//     // 情况二：有构造器constructor 必须要调用一次父类构造器 super调用
//     constructor(name, sex) {
//         super('狗', name, sex);
//     }
//     print() {
//         // super.print();
//         console.log(this)
//     }
// }
// const animal = new Animal('狗', 'nihao', '公')
// console.log(animal)//test.js:67 Uncaught Error: 抽象类不能被实例化