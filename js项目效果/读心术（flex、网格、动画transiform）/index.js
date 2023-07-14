(function () {
    // 读心术游戏
    // 需求：
    // 1、随机生成右侧图案字典
    // 2、9的倍数图案相同
    // 3、点击开始游戏有动画效果 结束游戏询问玩家
    // 思路：
    // 游戏开始前 初始化确定答案
    // 随机生成图片 封装随机数函数
    // 下标要明确

    // 游戏主方法
    function main() {
        // 游戏初始化
        init();
        // 绑定事件
        addEvent();
    }

    // 封装方法(DOM查询、随机数)
    function $(select) {
        return document.querySelector(select);
    }
    function $$(select) {
        return document.querySelectorAll(select);
    }
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // 数据存储
    var obj = {
        arr: ['./img/values/0.png', './img/values/1.png', './img/values/2.png', './img/values/3.png', './img/values/4.png', './img/values/5.png', './img/values/6.png', './img/values/7.png', './img/values/8.png', './img/values/9.png', './img/values/10.png', './img/values/11.png', './img/values/12.png', './img/values/13.png', './img/values/14.png', './img/values/15.png'],
        imgcount: function () {
            return this.arr.length - 1;
        },
        answerIndex: null,
        index: null,
        isGameOver: false,
        RightItem: $('.right-item'),
        LeftTop: $('.left-item .top'),
        mask: $('#mask'),
        answer: $('#answer'),
        row: 20,
        col: 5,
        gridnum: function () {
            return this.row * this.col;
        }
    };

    // 初始化游戏
    var init = function () {
        // 1、清空对应区域的内容 重新生成图案
        obj.RightItem.innerHTML = "";

        // 生成一个答案
        obj.answerIndex = randomNumber(0, obj.imgcount());

        // 创建图案字典
        for (var i = 0; i < obj.gridnum(); i++) {
            // 9的倍数
            if (i % 9 === 0) {
                obj.index = obj.answerIndex;
            } else {
                obj.index = randomNumber(0, obj.imgcount());
            }
            // 字符串模板
            obj.RightItem.innerHTML += `<div>
            <span class="numbers">${i}</span>
            <span class="pic"><img src= ${obj.arr[obj.index]} / ></span>
            </div>`;
        }
    }

    // 添加事件
    var addEvent = function () {
        obj.LeftTop.addEventListener('click', clickEvent)
    }

    // 展示答案
    var showAnswer = function () {
        obj.mask.style.opacity = 0;
        obj.answer.src = obj.arr[obj.answerIndex]
        obj.answer.style.opacity = 1;
        obj.isGameOver = true;
    }

    // 点击事件
    var clickEvent = function (e) {
        e.currentTarget.style.transition = "all 2s";
        e.currentTarget.style.transform = "rotate(1800deg)";
        e.currentTarget.addEventListener("transitionend", showAnswer)
        if (obj.isGameOver) {
            if (window.confirm('是否再来一次？')) {
                obj.mask.style.opacity = 1;
                obj.answer.style.opacity = 0;
                obj.isGameOver = false;
                e.currentTarget.style = "";
                e.currentTarget.removeEventListener('transitionend', showAnswer)
                main();
            } else {
                obj.LeftTop.removeEventListener('click', clickEvent)
            }
        }
    }

    main();

}())