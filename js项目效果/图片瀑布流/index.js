// 之前得不到高度 因为图片没加载完成 采用的是setTimeOut方法 现在可以通过onload方法
// 创建数组可以通过 var arr = new Array(长度)
// 填充 用arr.fill(0)


// 封装一个图片瀑布流函数
// 实现：
// 1、图片在窗口resize时调用函数 且 函数防抖
// 2、图片定宽不定高

// 实现思路
// 一个数组来记录每一列的高度top值 将图片插入数组最小列 在计算每一列left值（定位图片）

(function () {

    var container = document.querySelector('.container');

    // 初始化函数
    function init() {
        // 1、瀑布流函数
        flowImg();

        // 2、添加事件 resize事件 和加载事件
        addEvent();
    }

    // 1、获取浏览器宽度、列数 分配多少列
    var dom = {
        Screenwidth: document.documentElement.clientWidth,// 浏览器宽度
        domWidth: function () { //容器宽度
            return Math.floor(this.Screenwidth * 0.9);
        },
        divWidth: 205,//图片宽度
        num: function () {//容器一行容纳数量
            return Math.floor(this.domWidth() / this.divWidth);
        },
        spaceL: function () {//图片空隙
            return Math.floor((this.domWidth() - this.num() * this.divWidth) / (this.num() + 1));
        },
        arr: [],//存储每一列的高度
        addarr: [0, 40, 60, 80, 100, 120, 139],//数组用于每次加载
        index: 0,//加载下标
        key: false,//判断是否加载全部图片
        imgarr: ["./img/0.jpg", "./img/1.jpg", "./img/2.jpg", "./img/3.jpg", "./img/4.jpg", "./img/5.jpg", "./img/6.jpg", "./img/7.jpg", "./img/8.jpg", "./img/9.jpg", "./img/10.jpg", "./img/11.jpg", "./img/12.jpg", "./img/13.jpg", "./img/14.jpg", "./img/15.jpg", "./img/16.jpg", "./img/17.jpg", "./img/18.jpg", "./img/19.jpg", "./img/20.jpg", "./img/21.jpg", "./img/22.jpg", "./img/23.jpg", "./img/24.jpg", "./img/25.jpg", "./img/26.jpg", "./img/27.jpg", "./img/28.jpg", "./img/29.jpg", "./img/30.jpg", "./img/31.jpg", "./img/32.jpg", "./img/33.jpg", "./img/34.jpg", "./img/35.jpg", "./img/36.jpg", "./img/37.jpg", "./img/38.jpg", "./img/39.jpg", "./img/40.jpg", "./img/0.jpg", "./img/1.jpg", "./img/2.jpg", "./img/3.jpg", "./img/4.jpg", "./img/5.jpg", "./img/6.jpg", "./img/7.jpg", "./img/8.jpg", "./img/9.jpg", "./img/10.jpg", "./img/11.jpg", "./img/12.jpg", "./img/13.jpg", "./img/14.jpg", "./img/15.jpg", "./img/16.jpg", "./img/17.jpg", "./img/18.jpg", "./img/19.jpg", "./img/20.jpg", "./img/21.jpg", "./img/22.jpg", "./img/23.jpg", "./img/24.jpg", "./img/25.jpg", "./img/26.jpg", "./img/27.jpg", "./img/28.jpg", "./img/29.jpg", "./img/30.jpg", "./img/31.jpg", "./img/32.jpg", "./img/33.jpg", "./img/34.jpg", "./img/35.jpg", "./img/36.jpg", "./img/37.jpg", "./img/38.jpg", "./img/39.jpg", "./img/40.jpg", "./img/23.jpg", "./img/24.jpg", "./img/25.jpg", "./img/26.jpg", "./img/27.jpg", "./img/28.jpg", "./img/29.jpg", "./img/30.jpg", "./img/31.jpg", "./img/32.jpg", "./img/33.jpg", "./img/34.jpg", "./img/35.jpg", "./img/36.jpg", "./img/37.jpg", "./img/38.jpg", "./img/39.jpg", "./img/40.jpg", "./img/32.jpg", "./img/33.jpg", "./img/34.jpg", "./img/35.jpg", "./img/36.jpg", "./img/37.jpg", "./img/38.jpg", "./img/39.jpg", "./img/40.jpg", "./img/23.jpg", "./img/24.jpg", "./img/25.jpg", "./img/26.jpg", "./img/27.jpg", "./img/28.jpg", "./img/29.jpg", "./img/30.jpg", "./img/31.jpg", "./img/32.jpg", "./img/33.jpg", "./img/34.jpg", "./img/35.jpg", "./img/36.jpg", "./img/37.jpg", "./img/38.jpg", "./img/39.jpg", "./img/40.jpg", "./img/24.jpg", "./img/25.jpg", "./img/26.jpg", "./img/27.jpg", "./img/28.jpg", "./img/29.jpg", "./img/30.jpg", "./img/31.jpg", "./img/32.jpg", "./img/33.jpg", "./img/34.jpg", "./img/35.jpg",]//图片数组
    }
    // 第一次瀑布流函数
    function flowImg() {
        createArr();
        // 容器初始化
        container.style.width = dom.domWidth() + 'px';
        // 创建图片元素|样式
        createElement(dom.addarr[dom.index], dom.addarr[dom.index + 1]);
        // 判断数组arr高度 图片添加到数组最低列
        setTimeout(function () {
            appendImg(dom.addarr[dom.index - 1], dom.addarr[dom.index]);
        }, 100)
    }
    //每个列高度初始化0
    function createArr() {
        dom.arr = [];
        // 创建一个数组记录每个高度
        for (var i = 0; i < dom.num(); i++) {
            dom.arr.push(0);
        }
    }

    // dom加载数据
    function createElement(start, end) {
        // 判断是不是最后一次加载
        if (end > dom.imgarr.length && dom.key === false && start !== undefined && end !== undefined) {
            end = dom.imgarr.length;
        } else if (start === undefined || end === undefined) {
            dom.key = true;
            return;
        }
        // 创建图片元素|样式
        for (var i = start; i < end; i++) {
            var img = document.createElement("img");
            img.style.width = dom.divWidth + "px";
            img.style.position = "absolute";
            img.src = dom.imgarr[i];
            img.style.transition = "all 0.5s"
            container.appendChild(img);
        }

        // 下标加加
        dom.index++;
        // img.onload = appendImg(dom.addarr[dom.index - 1], dom.addarr[dom.index]);
    }

    // 判断数组arr高度 图片添加到数组最低列
    function appendImg(start, end, reflow, tostart) {
        // 重新获取浏览器宽度 重排样式
        tostart && tostart();
        reflow && reflow();
        var imgs = document.querySelectorAll(".container img");
        // 判断是否符合最后一次样式加载
        if (start === undefined || end === undefined || dom.key === true) {
            return;
        } else if (end > imgs.length && start !== undefined && end !== undefined) {
            end = imgs.length;
        }
        var newarr,
            index;
        for (var i = start; i < end; i++) {
            newarr = dom.arr.slice();
            newarr.sort(function (a, b) {
                return a - b;
            })
            // 获取最小值下标
            index = dom.arr.indexOf(newarr[0]);
            // 样式
            imgs[i].style.top = dom.arr[index] + dom.spaceL() + 'px';
            imgs[i].style.left = index * dom.divWidth + dom.spaceL() * (index + 1) + 'px';
            dom.arr[index] = parseInt(imgs[i].style.top) + imgs[i].clientHeight;
        }
        newarr = dom.arr.slice();
        newarr.sort(function (a, b) {
            return b - a;
        })
        // 容器高度
        container.style.height = newarr[0] + dom.spaceL() + 'px';
    }

    // 2、添加事件 resize事件 和加载事件
    function addEvent() {
        // 窗口尺寸变换事件
        window.onresize = test();
        // 滚轮自动添加事件
        document.addEventListener('scroll', test1)
    }

    // 窗口尺寸变换事件函数
    var test = bedounce(function () {
        var imgs = document.querySelectorAll(".container img");
        setTimeout(appendImg(0, imgs.length, createArr, tostart), 100);
    }, 1500);

    // 重新获取浏览器宽度
    function tostart() {
        dom.Screenwidth = document.documentElement.clientWidth;// 浏览器宽度
        container.style.width = dom.domWidth() + 'px';
    }

    // 函数防抖
    function bedounce(fn, duration) {
        var timerId;
        return function () {
            clearInterval(timerId);
            timerId = setInterval(function () {
                fn();
            }, duration);
        }
    }

    // 滚轮自动添加事件函数
    var key = true;
    var test1 = bedounce(function () {
        document.documentElement.scrollTop <= parseInt(container.style.height) - parseInt(document.documentElement.clientHeight) - 350 ? true : add();
    }, 500);

    // 滚轮自动添加事件函数
    function add() {
        if (key) {
            createElement(dom.addarr[dom.index], dom.addarr[dom.index + 1]);
            key = false;
        }
        setTimeout(function () {
            appendImg(dom.addarr[dom.index - 1], dom.addarr[dom.index]);
            key = true;
        }, 100)
    }

    init();

}())