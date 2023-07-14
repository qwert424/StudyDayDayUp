(function () {
    // 图片验证码验证
    // 主程序
    function main() {
        // 初始化
        init();
        // 添加事件
        addEvent();
    }

    // 封装函数 获得dom元素
    function $(select) {
        return document.querySelector(select);
    }
    function $$(select) {
        return document.querySelectorAll(select);
    }
    // 随机数封装
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // 数据存储
    var obj = {
        top: $('.container .top'),
        tip: $('.main .tip'),
        block: $('.main-bottom .block'),
        imgs: ['./imgs/t1.png', './imgs/t2.png', './imgs/t3.png', './imgs/t4.png', './imgs/t5.png'],
        imgslen: function () {
            return this.imgs.length - 1;
        },
        mainBottom: $('.main .main-bottom'),
        pic: $('.main .pic'),
        imgItem: $('.main .pic-code'),
        whiteBlock: $('.main .white-block'),
        markBlock: $('.main .mark'),
        imgW: function () {
            return this.imgItem.clientWidth;
        },
        imgH: function () {
            return this.imgItem.clientHeight;
        },
    };

    // 初始化
    var init = function () {
        var goodimg = $('.main .pic .good');
        if (goodimg) {
            goodimg.remove();
            obj.whiteBlock.style.opacity = 1;
            obj.markBlock.style.opacity = 1;
        };
        obj.block.removeEventListener('mousedown', isclick);
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', isend);
        document.removeEventListener('transitionend', main);
        obj.mainBottom.style.fontSize = 16 + 'px';
        obj.tip.innerText = '拖动图片完成验证';
        obj.tip.style.color = '#000';
        obj.block.style.transition = 'none';
        obj.markBlock.style.transition = 'none';
        obj.imgItem.src = obj.imgs[randomNumber(0, obj.imgslen())];
        obj.whiteBlock.style.left = randomNumber(70, obj.imgW() - 50) + 'px';
        obj.whiteBlock.style.top = randomNumber(0, obj.imgH() - 50) + 'px';
        obj.markBlock.style.background = `url(${obj.imgItem.src}) no-repeat left top`
        obj.markBlock.style.backgroundPosition = ` -${obj.whiteBlock.style.left} -${obj.whiteBlock.style.top}`
        obj.markBlock.style.top = obj.whiteBlock.style.top;
        obj.markBlock.style.left = 5 + 'px';
        obj.block.style.width = 36 + 'px';
    }

    // 添加事件
    var addEvent = function () {
        // 鼠标点击事件
        obj.top.addEventListener('click', main);
        // 鼠标按下
        obj.block.addEventListener('mousedown', isclick);
        // 鼠标抬起事件
        document.addEventListener('mouseup', isend);
    }

    // 点击移动
    var isclick = function () {
        document.addEventListener('mousemove', move);
    }

    // 移动函数
    var move = function (e) {
        obj.block.style.width = e.pageX - obj.block.getBoundingClientRect().left + 18 + 'px';
        obj.markBlock.style.left = parseInt(obj.block.style.width) - 40 + 'px';
        obj.mainBottom.style.fontSize = 0;
        ismove();
    }

    // 移动边界判断
    var ismove = function () {
        if (parseInt(obj.markBlock.style.left) <= 5) {
            obj.markBlock.style.left = 5 + 'px';
        }
        if (parseInt(obj.block.style.width) <= 36) {
            obj.block.style.width = 36 + 'px';
        } else if (parseInt(obj.block.style.width) >= 268) {
            addErrTip();
        }
    }

    // 是否结束
    var isend = function () {
        if (Math.abs(parseInt(obj.markBlock.style.left) - parseInt(obj.whiteBlock.style.left)) < 8) {
            obj.block.removeEventListener('mousedown', isclick);
            document.removeEventListener('mouseup', isend);
            obj.tip.innerText = '验证成功';
            obj.tip.style.color = 'green';
            obj.whiteBlock.style.opacity = 0;
            obj.markBlock.style.opacity = 0;
            var img = document.createElement('img');
            img.classList.add('good');
            obj.pic.appendChild(img)
            img.style.transition = 'all 2s'
            setTimeout(function () {
                img.style.transform = 'translate(-50%,-50%) rotate(720deg) ';
                img.style.borderRadius = 0;
                img.style.width = 278 + 'px';
                img.style.height = 200 + 'px';
            }, 100)
        } else {
            if (parseInt(obj.block.style.width) !== 36) {
                addErrTip();
            } else {
                obj.mainBottom.style.fontSize = 16 + 'px';
            }
        }
        document.removeEventListener('mousemove', move);
    }

    var addErrTip = function () {
        obj.block.style.transition = 'all 1s'
        obj.markBlock.style.transition = 'all 1s'
        obj.block.style.width = 36 + 'px';
        obj.markBlock.style.left = 5 + 'px';
        obj.mainBottom.style.fontSize = 16 + 'px';
        obj.tip.innerText = '验证失败';
        obj.tip.style.color = 'red'
        document.addEventListener('transitionend', main);
    }

    main();

}())