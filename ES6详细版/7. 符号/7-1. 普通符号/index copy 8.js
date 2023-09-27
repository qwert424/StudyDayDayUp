const Hero = (() => {
    const getRandom = Symbol();

    return class {
        constructor(attack, hp, defence) {
            this.attack = attack;
            this.hp = hp;
            this.defence = defence;
        }

        gongji() {
            //伤害：攻击力*随机数（0.8~1.1)
            const dmg = this.attack * this[getRandom](0.8, 1.1);
            console.log(dmg);
        }

        [getRandom](min, max) { //根据最小值和最大值产生一个随机数
            return Math.random() * (max - min) + min;
        }
    }
})();

const hero = new Hero(100, 100, 100)
const syb = Object.getOwnPropertySymbols(Hero.prototype)[0]
console.log(hero[syb](1, 5))

// 以上是非常规方法 即通过Object.getOwnPropertySymbols()获取到Symbol属性，然后通过其进行操作 要知道 符号是为了私有属性 不是为了安全
