// 1、可计算成员名 也是用[]包着计算属性
// const method = 'print'
// class Test {
//     constructor(name) {
//         this.name = name
//     }
//     [method]() {
//         console.log(this)
//     }
// }
// const a = new Test('a');
// a[method]()

// 2. getter和setter 和es5的方法：Object.defineProperty 类似 更加简洁 且不在原型上
// class Test {
//     constructor(name, age) {
//         this.name = name;
//         // 以前的方法
//         // Object.defineProperty(this, 'age', {
//         //     get() {
//         //         return age;
//         //     },
//         //     set(val) {
//         //         this.age = val;
//         //         return this.age;
//         //     }
//         // })

//         // Es6方法
//         // 方法一：通过函数的方法来 即getAge setAge 但是不像我们之前直接实例.age 获取 而是通过实例.getAge()不方便
//         // 方法二： 如下
//         this.age = age;
//     }
//     //创建一个age属性，并给它加上getter，读取该属性时，会运行该函数
//     get age() {
//         return this._age + "岁";
//     }

//     //创建一个age属性，并给它加上setter，给该属性赋值时，会运行该函数
//     set age(age) {
//         if (typeof age !== "number") {
//             throw new TypeError("age property must be a number");
//         }
//         if (age < 0) {
//             age = 0;
//         }
//         else if (age > 1000) {
//             age = 1000;
//         }
//         this._age = age;
//     }
// }
// const a = new Test('fang', 18);
// console.log(a.age, a)

// 3、静态成员 即构造函数的本身成员 简单的例子 不通过实例 就可以知道的参数就是静态资源 比如 我们买了一辆车子 可以定制颜色、座椅 这个可以成为实例成员属性 还有一些发动机 我们不通过实例就可以直接访问知道 就是静态资源 亦或者象棋构造函数 我们可以定义棋子名称颜色 但是它的大小就可以通过静态成员设置 不用通过实例访问
// class Car {
//     constructor(name, color) {
//         this.name = name;
//         this.color = color;
//     }
//     get color() { return "你的爱车是：" + this._color + '色'; }
//     set color(val) { return this._color = val }

//     static width = "4米"
//     static height = "2米"
// }
// // const car = new Car('haha', 'red');
// // console.log(car)
// // 静态方法 通过构造函数直接访问不需要创建实例
// console.log(Car.width)
// console.dir(Car)

// 4、字段初始化器 即有的属性构造函数本身 或者实例本身都有默认值 可以通过字段初始化器 还有一种情况 想要使得方法的this指向一直正确 就通过箭头函数指向当前对象
// class Test {
//     // 字段初始化器
//     a = 1;
//     b = 2;
//     // 以上相当于在实例属性内：this.a = 1;...
//     static c = 3;//相当于在构造器本身使用字段初始化器
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     print() {
//         console.log(this.name, this.age);
//     }//相当于原型上的方法

//     printNew = () => {
//         console.log(this.name, this.age);
//     }//相当于在实例属性内添加了一个方法 占用内存 不是在原型上了this.printNew=()=>{...} 此时的this指向一直指向Test对象 所以不会出现问题
// }
// const a = new Test('fang', 18);
// console.log(a);//Test {a: 1, b: 2, name: 'fang', age: 18}

// 为了避免有人这样使用原型上的方法
// const newPrint = a.print;
// newPrint()//test.js:86 Uncaught TypeError: Cannot read properties of undefined (reading 'name') 因为严格模式下this指向为undefined

// const NewPrint = a.printNew;
// NewPrint()//成功

// 5、类表达式 即：
// const A=class Print{
//     constructor(){

//     }
// }
// const a=new A();

// 6、装饰符 即通过一个函数“指令” 使用场景 即一个构造函数内可能一个方法过期了 但是不像影响之前的代码 就可以通过装饰符除了 给发开者一个提示
// @自定义装饰符名称
// function 自定义装饰符名称(target, methodName, description) {
//     //构造函数名
//     //过期方法名
//     // 描述
// }
// 例子：
// class Test {
//     constructors() {

//     }

//     @overTime
//     print() {
//         console.log(this)
//     }
// }
// function overTime(target, methodName, description) {
//     // console.log(target, methodName, description)
//     const oldDes = description.value;
//     description.value = function (...args) {
//         console.warn(`${methodName}过期了`);
//         oldDes.apply(this, args);
//     }
// }