// 根据下面的调用和注释，完成函数 createOptions
// function createOptions(item) {
//   if (item) {
//     const { time, speed, text } = item;
//     const obj = {
//       time: time || 1000,
//       speed: speed || 50,
//       text: text || "",
//     };
//     console.log(obj);
//     return;
//   }
//   const obj = {
//     time: 1000,
//     speed: 50,
//     text: "",
//   };
//   console.log(obj);
// }

function createOptions(item) {
  item = item || {};
  const obj = {
    time: 1000,
    speed: 50,
    text: '',
    ...item,
  }
  console.log(obj);
}

// createOptions(); // { time: 1000, speed: 50, text: '' }
createOptions({
  time: 500,
}); // { time: 500, speed: 50, text: '' }

createOptions({
  time: 500,
  text: 'hello world',
}); // { time: 500, speed: 50, text: 'hello world' }
