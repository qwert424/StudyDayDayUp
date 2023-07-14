const obj = {
  a: 1,
  b: 2,
  c: 3,
};
// 遍历对象的所有属性名
// console.log(Object.keys(obj))
// for (const item of Object.keys(obj)) {
//   console.log(item)
// }

// for (var key in obj) {
//   console.log(key)
// }

// Object.keys(obj).forEach(function (key) {
//   console.log(key);
// })

// 遍历对象的所有属性值
// console.log(Object.values(obj))
// for (const item of Object.values(obj)) {
//   console.log(item)
// }

// Object.values(obj).forEach(function (key) {
//   console.log(key);
// })

// 遍历对象的所有属性名和属性值
// console.log(Object.entries(obj))

// for (const [k, v] of Object.entries(obj)) {
//   console.log(k, v);
// }

// Object.entries(obj).forEach(function ([k, v]) {
//   console.log(k, v);
// })

// 复制obj的所有属性到一个新的对象
// const newobj = {
//   ...obj
// }
// console.log(Object.is(newobj, obj));

// 复制obj除a以外的所有属性到一个新的对象
// const { a, ...newobj } = obj;
// console.log(newobj);