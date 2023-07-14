(function () {

    var obj = [{
        img: "./img/prize_1.png",
        title: "IphoneX"
    }, {
        img: "./img/prize_2.png",
        title: "现金50元"
    }, {
        img: "./img/prize_3.png",
        title: "HUAWEI"
    }, {
        img: "./img/prize_8.png",
        title: "U盘"
    }, {
        img: "./img/prize_4.png",
        title: "现金10元"
    }, {
        img: "./img/prize_6.png",
        title: "电脑优惠券"
    }, {
        img: "./img/prize_7.png",
        title: "手机优惠券"
    }, {
        img: "./img/prize_5.png",
        title: "谢谢参与"
    }]

    // 初始化函数
    function init() {
        // 初始化
        createPicItem();

        // 绑定事件
        addEvent();
    }

    // 封装函数
    function $(select) {
        return document.querySelector(select);
    }
    function $$(select) {
        return document.querySelectorAll(select);
    }

    var picItem = $$('.pic-item')
    var end = $('.end');
    var main = $('.main');
    var counter = $('.main-item span');
    var X = $('.end .item .top .fr')
    var again = $('.end .item .bottom span');
    var num = 2;
    var btn = $('.main-item .btn');
    var timerId = null;
    var timerId2 = null;
    var time = 100;
    var index = -1;

    function createPicItem() {
        counter.innerText = num;
        if (num <= 0) {
            btn.classList.add('disabled');
        }
        for (var i = 0; i < obj.length; i++) {
            var div = document.createElement('div');
            var span = document.createElement('span');
            div.style.backgroundImage = "Url(" + obj[i].img + ")";
            span.innerText = obj[i].title
            div.classList.add('img')
            picItem[i].appendChild(div);
            picItem[i].appendChild(span);
        }
    }

    function addEvent() {
        btn.addEventListener('click', start)
        X.addEventListener('click', function () {
            end.style.display = 'none'
        })
        again.addEventListener('click', function () {
            end.style.display = 'none';
            start();
        })
    }

    // 开始游戏
    function start() {
        if (timerId || num <= 0) {
            return
        }
        num--;
        counter.innerText = num;

        var waittime = function () { return Math.floor(Math.random() * 5000 + 4000) }();
        if (num <= 0) {
            btn.classList.add('disabled');
        }
        timerId = setInterval(function () {
            index = ++index % picItem.length;
            picItem.forEach(function (node) {
                node.classList.remove('selected')
            })
            picItem[index].classList.add('selected');
        }, time)
        if (!timerId2) {
            timerId2 = setTimeout(function () {
                clearInterval(timerId);
                clearTimeout(timerId2);
                timerId = null;
                timerId2 = null;
                end.style.display = 'block';
                index === 8 ? main.innerText = obj[index - 1].title : main.innerText = obj[index].title;
                num === 0 ? again.innerText = '结束' : again.innerText = '再来一次'
            }, waittime)
        }
    }

    init()

}())