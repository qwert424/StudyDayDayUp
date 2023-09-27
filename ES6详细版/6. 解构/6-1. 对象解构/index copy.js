const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}

// let name, age, sex, address;
// name = user.name;
// age = user.age;
// sex = user.sex;
// address = user.address;


// 解构时 被解构对象没有的参数 等于undefined 因为解构是先定义 在赋值 即：
// let name, age, sex, address, abc;
// ({ name, age, sex, address,abc } = user);


// 先定义5个变量，然后从对象中读取同名属性，放到变量中
let { name, age, sex, address, abc = 123 } = user//定义abc 结构对象没有abc属性 给abc赋值123

console.log(name, age, sex, address, abc)