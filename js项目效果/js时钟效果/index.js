// (function () {
//     function init() {
//         createInterval()
//     }

//     var hourLimgs = document.querySelector('.clock-item .hour .l .imgs')
//     var hourRimgs = document.querySelector('.clock-item .hour .r .imgs')
//     var minuteLimgs = document.querySelector('.clock-item .minute .l .imgs')
//     var minuteRimgs = document.querySelector('.clock-item .minute .r .imgs')
//     var secondLimgs = document.querySelector('.clock-item .second .l .imgs')
//     var secondRimgs = document.querySelector('.clock-item .second .r .imgs')

//     var timerId = null;
//     secondRimgs.style.top = 0;
//     secondRimgs.style.transition = "all 0.5s linear"
//     var dis = -100;
//     console.log(hourLimgs, hourRimgs, minuteLimgs, minuteRimgs, secondRimgs, secondLimgs)


//     // 创建定时器
//     var createInterval = function ( ) {
//         if (timerId) {
//             return;
//         }
//         timerId = setInterval(secondRimgsChange, 1000)
//     };

//     // 秒变化函数
//     var secondRimgsChange = function () {
//         if (secondRimgs.style.transition === 'none 0s ease 0s') {
//             secondRimgs.style.transition = 'all 0.5s linear'
//         }
//         secondRimgs.style.top = dis + 'px';
//         dis -= 100;
//         secondRimgs.addEventListener('transitionend', function () {
//             if (dis === -1100) {
//                 secondRimgs.style.top = 0;
//                 dis = -100
//                 secondRimgs.style.transition = 'none 0s'
//             }
//         }
//         )
//     }


//     init();
// }())

// 优化思路：
// 1、逻辑代码就是一个封装定时器
// 2、函数循行是改变top值、添加动画  并且动画结束后 将第一个元素节点添加在最后 然后改变top值

(function () {
    function init() {

        createInterval();
    }

    var hourLimgs = document.querySelector('.clock-item .hour .l .imgs')
    var hourRimgs = document.querySelector('.clock-item .hour .r .imgs')
    var minuteLimgs = document.querySelector('.clock-item .minute .l .imgs')
    var minuteRimgs = document.querySelector('.clock-item .minute .r .imgs')
    var secondLimgs = document.querySelector('.clock-item .second .l .imgs')
    var secondRimgs = document.querySelector('.clock-item .second .r .imgs')
    var createInterval = function () {
        interval(secondRimgs, 1000);
        interval(secondLimgs, 10000);
        interval(minuteRimgs, 60000);
        interval(minuteLimgs, 600000);
        interval(hourRimgs, 3600000);
        interval(hourLimgs, 36000000);
    }

    var interval = function (node, duration) {
        node.style.top = 0;
        setInterval(function () {
            var firstElement = node.firstElementChild;
            node.style.transition = "all 0.5s linear"
            node.style.top = -100 + 'px';

            node.addEventListener('transitionend', function () {
                node.appendChild(firstElement);
                node.style.transition = "none"
                node.style.top = 0;
            })
        }, duration);
    }

    init()

}())