// const hero = {
//     attack: 30,
//     hp: 300,
//     defence: 10,
//     gongji() { //攻击
//         //伤害：攻击力*随机数（0.8~1.1)
//         const dmg = this.attack * this.getRandom(0.8, 1.1);
//         console.log(dmg);
//     },
//     getRandom(min, max) { //根据最小值和最大值产生一个随机数
//         return Math.random() * (max - min) + min;
//     }
// }

// class Hero {
//     constructor(attack, hp, defence) {
//         this.attack = attack;
//         this.hp = hp;
//         this.defence = defence;
//     }

//     gongji() {
//         //伤害：攻击力*随机数（0.8~1.1)
//         const dmg = this.attack * this.getRandom(0.8, 1.1);
//         console.log(dmg);
//     }

//     getRandom(min, max) { //根据最小值和最大值产生一个随机数
//         return Math.random() * (max - min) + min;
//     }
// }

// 以上不管是类 还是对象 我们可以发现 随机数方法是一个公开的 外部可以通过常规方法如：hero.getRandom()来调用 那么怎么通过普通符号来设置私有属性呢？

// 以类为例：
const Hero = (() => {
    const sybTest = Symbol('私有属性、符号属性名');//只有函数作用域内有效
    return class {
        constructor(attack, hp, defence) {
            this.attack = attack;
            this.hp = hp;
            this.defence = defence;
        }
        gongji() {
            //伤害：攻击力*随机数（0.8~1.1)
            const dmg = this.attack * this[sybTest](0.8, 1.1);
            console.log(dmg);
        }

        [sybTest](min, max) { //根据最小值和最大值产生一个随机数
            return Math.random() * (max - min) + min;
        }
    }
})()
const hero = new Hero(100, 100, 100);
hero.gongji();
// hero[sybTest]()//Uncaught ReferenceError: sybTest is not defined