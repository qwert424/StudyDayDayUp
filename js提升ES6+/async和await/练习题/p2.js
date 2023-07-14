// 完成delay函数
// 该函数可以等待一段指定的时间
// 返回Promise
function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve() }, duration)
    })
}

// 利用delay函数，等待3次，每次等待1秒，每次等待完成后输出ok
async function test(num) {
    for (let i = 0; i < num; i++) {
        await delay(1000);
        console.log("ok");
    }
}
test(3)

// delay(1000).then(() => {
//     console.log("ok")
//     return delay(1000);
// }).then(() => {
//     console.log("ok")
//     return delay(1000);
// }).then(() => {
//     console.log("ok")
//     return delay(1000);
// });
// 等待1秒->ok->等待1秒->ok->等待1秒->ok
