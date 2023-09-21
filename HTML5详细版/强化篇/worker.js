importScripts('./sum.js')//引入外部js 可以直接用方法函数计算

this.onmessage = function (e) {
    // console.log(e)
    let result = 0;
    for (let i = 0; i < e.data.count; i++) {
        result += i;
    }
    this.postMessage({ result, sum: sum(1, 3) });
    this.close();
}