// 遍历对象 user， 将其每一个属性变为 getter 和 setter， 保持读写功能不变
// 读取属性时，输出：正在读取xxx属性，值为xxx
// 给属性赋值时，输出：正在设置xxx属性，新的值为xxx
const user = {
  name: 'monica',
  age: 17,
  sex: 'female',
};
for (let [key, value] of Object.entries(user)) {
  Object.defineProperty(user, `${key}`, {
    get() {
      console.log(`正在读取${key}属性，值为${value}`)
      return value;
    },
    set(val) {
      value = val;
      console.log(`正在设置${key}属性，新的值为${value}`)
    }
  });
}

user.age +=  10;