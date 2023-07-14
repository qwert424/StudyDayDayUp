// 每隔一段时间开始切换图片
var img = document.querySelector('img');
console.log(img);
var Timer;
var index = 0;
function start() {
    if (Timer) {
        return //已经有计时器了
    }
    Timer = setInterval(function () {
        index = index % 4 + 1;
        img.src = './imgs/' + index + '.jpeg';
    }, 1000)
}
start()

function stop() {
    clearInterval(Timer);
    Timer = null;
}

// 鼠标移入停止切换
// 绑定事件

img.addEventListener('mouseenter', stop);
img.addEventListener('mouseleave', start);
