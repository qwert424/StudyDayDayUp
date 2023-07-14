// 采用立即执行函数 防止变量污染
var change = (function () {
    // 轮播图的切换 核心原理 在加上后面学习的动画
    // 实现功能：
    // 1、自动播放 计时器
    // 2、鼠标移入结束自动播放 事件+计时器
    // 3、实现图片的切换 包括img路径 a链接地址 
    // 4、实现点点的动态生成 
    // 5、实现点击点点切换图片 函数
    // 6、实现点击按钮切换图片  函数

    // 数据
    var datas = [
        {
            img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/15c05b32cf948b594477dfc3eb69fb69.jpg?w=2452&h=920',
            link: 'https://www.mi.com/mi11le-5g-ne',
        },
        {
            img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a532e33470d046b3f044d5ea49fc5e9e.png?thumb=1&w=2452&h=920&f=webp&q=90',
            link: 'https://www.mi.com/xiaomipad5',
        },
        {
            img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
            link: 'https://www.mi.com/a/h/22033.html?sign=b60a6ca9167bce2d1ed8ee319cf83c75',
        },
        {
            img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/af7be8f65065f405f57f46a02731f78d.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
            link: 'https://www.mi.com/a/h/22812.html?sign=aab397a7ecf2ae4c1765e9d11fdccca6',
        },
    ];

    function $(target) {
        return document.querySelector(target);
    }

    var a = $('#banner a'),
        img = $('#banner a img'),
        bannerDots = $('#banner .banner-dots'),
        banner = $('#banner'),
        btnRight = $('#banner .Rbtn'),
        btnLeft = $('#banner .Lbtn');

    var Timer,
        index = 0;

    // console.log(btnRight)

    // HTML代码
    // <!-- 横幅图 -->
    // <a href="">
    //     <img src="./img/89b9804e4b794f230252bc99fb55faa5.jpg" alt="">
    // </a>
    // <!-- 按钮 -->
    // <div class="Rbtn btn"><i class="iconfont icon-xiangyoujiantou"></i></div>
    // <div class="Lbtn btn"><i class="iconfont icon-xiangzuojiantou"></i></div>
    // <!-- 点点 -->
    // <div class="banner-dots">
    //     <span class="selected"></span>
    //     <span></span>
    //     <span></span>
    // </div>

    /**
     * 实现初始化图片
     */
    function init() {
        // 初始化点点
        for (var i = 0; i < datas.length; i++) {
            bannerDots.appendChild(document.createElement('span'));
        }

        change(0);
        autoPlay();
        spanChange();

        // 鼠标绑定事件
        banner.onmouseenter = stopPlay;
        banner.onmouseleave = autoPlay;
        bannerDots.onclick = spanChange;
        btnRight.onclick = next;
        btnLeft.onclick = prvi;
    }
    init()

    /**
     * 实现切换功能
     * @param {number} index 通过下标切换
     */
    function change(index) {
        a.href = datas[index].link
        img.src = datas[index].img

        // span样式切换
        var spanSelected = $('#banner .banner-dots .selected');
        if (spanSelected) {
            spanSelected.className = '';
        }
        var span = bannerDots.children[index];
        span.className = 'selected';
    }

    /**
     * 实现自动播放
     */
    function autoPlay() {
        if (Timer) {
            return;
        }
        Timer = setInterval(function () {
            index++;
            if (index > datas.length - 1) {
                index = 0;
            }
            change(index);
        }, 1500)
    }

    /**
     * 实现停止自动播放
     */
    function stopPlay() {
        clearInterval(Timer);
        Timer = null;
    }

    /**
     * 下一张
     */
    function next() {
        index++;
        if (index > datas.length - 1) {
            index = 0;
        }
        change(index);
    }

    /**
     * 上一张
     */
    function prvi() {
        index--;
        if (index < 0) {
            index = datas.length - 1;
        }
        change(index);
    }

    /**
     * 点点切换
     */
    function spanChange() {
        for (let i = 0; i < bannerDots.children.length; i++) {
            bannerDots.children[i].onclick = function () {
                index = i;
                change(i);
            }
        }
    }
}())