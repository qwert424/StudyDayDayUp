// 自己实现类似Symbol.for 共享符号的操作

const symbolFor = (() => {
    const globe = {}
    return (name) => {
        if (!globe[name]) {
            globe[name] = Symbol(name)
            return globe[name]
        }
        return globe[name];
    }
})()
const syb1 = symbolFor('aaa');
const syb2 = symbolFor('aaa');
console.log(syb1 === syb2);