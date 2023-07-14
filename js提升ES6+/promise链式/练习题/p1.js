// 下面代码的输出结果是什么
const pro1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const pro2 = pro1.then((data) => {
  console.log(data);//1
  return data + 1;//2
});

const pro3 = pro2.then((data) => {
  console.log(data);//2
});

console.log(pro1, pro2, pro3);//pending

setTimeout(() => {
  console.log(pro1, pro2, pro3);//promise
}, 2000);
