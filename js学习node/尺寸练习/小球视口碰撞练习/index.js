// 小球右下角移动 碰到视口反弹 碰撞颜色改变

var circle = document.querySelector('.circle');
// 视口尺寸
var clientX = document.documentElement.clientWidth;
var clientY = document.documentElement.clientHeight;
// 元素尺寸
var ew = circle.clientWidth;
var eh = circle.clientHeight;
// 前进speed
var xSpeed = 1;
var ySpeed = 1;
// 最大距离
var maxLeft = clientX - ew;
var maxTop = clientY - eh;

setInterval(function () {
    // 获取左上角坐标
    var Lrect = circle.getBoundingClientRect().left;
    var Trect = circle.getBoundingClientRect().top;
    var left = Lrect + xSpeed;
    var top = Trect + ySpeed;
    if (Trect > maxTop) {
        top = maxTop;
        ySpeed = -ySpeed;
        circle.style.backgroundColor = randomColor()
    }
    if (Trect < 0) {
        top = 0;
        ySpeed = -ySpeed;
        circle.style.backgroundColor = randomColor()
    }
    if (Lrect > maxLeft) {
        left = maxLeft;
        xSpeed = -xSpeed;
        circle.style.backgroundColor = randomColor()
    }
    if (Lrect < 0) {
        left = 0;
        xSpeed = -xSpeed;
        circle.style.backgroundColor = randomColor()
    }

    circle.style.left = left + 'px';
    circle.style.top = top + 'px';

}, 10)

// 随机颜色
function Random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
} 
function randomColor() {
    return 'rgb(' + Random(0, 255) + ',' + Random(0, 255) + ',' + Random(0, 255) + ')'
}
