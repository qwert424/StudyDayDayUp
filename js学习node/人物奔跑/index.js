//创建奔跑动作

var img = document.createElement("img");
document.body.appendChild(img);
img.style.position = "absolute";
img.style.left = 0;
/**
 * 每个一段时间，切换英雄图片，让英雄动起来
 * @param {*} i 
 */

var index = 0;
setInterval(function () {
    index = (index % 4) + 1;
    img.src = "./img/" + index + ".png";
    // if (index === 5) {
    //     index = 1;
    // }
    // 优化：
}, 1000)

/**
 * 每个一段时间 让英雄右动起来
 * @param {*} i 
 */
var i = 10;
setInterval(function () {
    i += 10;
    img.style.left = i + "px";
}, 1000)