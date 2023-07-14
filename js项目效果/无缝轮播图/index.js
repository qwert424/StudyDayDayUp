// // 效果实现：
// // 1、无缝切换
// // 2、自动切换
// // 3、事件绑定
// // 4、动画切换
// (function () {

//     // 初始化程序
//     function init() {
//         // 1、创建图片
//         createImg();
//         // 2、设置自动播放
//         auto();
//         // 3、添加事件
//         addEvent();

//     }

//     // 获取元素
//     var container = document.querySelector('.container');
//     var imgcontainer = document.querySelector('.imgs');
//     var dotsItem = document.querySelector('.dots-item');
//     var dotsItems = document.querySelectorAll('.dots-item li');
//     var Lbutton = document.querySelector('.lbtn');
//     var Rbutton = document.querySelector('.rbtn');

//     var imgs = [{ src: "./img/Wallpaper1.jpg" }, { src: "./img/Wallpaper2.jpg" }, { src: "./img/Wallpaper3.jpg" }, { src: "./img/Wallpaper4.jpg" }, { src: "./img/Wallpaper5.jpg" }]
//     var timerId1 = null;
//     var key = true;

//     // 初始化创建图片函数
//     var createImg = function () {
//         for (var i = 0; i < imgs.length; i++) {
//             var a = document.createElement("a");
//             var img = document.createElement("img");
//             a.href = "#";
//             a.setAttribute("index", i);
//             dotsItems[i].setAttribute("index", i);
//             img.src = imgs[i].src;
//             a.appendChild(img);
//             imgcontainer.appendChild(a);
//         }
//     }

//     // 设置自动播放
//     var auto = function () {
//         timerId1 = setInterval(moveNext, 1000);
//     }

//     // 切换下一张图片
//     var moveNext = function () {
//         if (key) {
//             key = false;
//             var imga = imgcontainer.querySelector('a')
//             var imgas = imgcontainer.querySelectorAll('a')
//             imga.classList.add('again')

//             var Animationobject = {
//                 from: 0,
//                 to: -500,
//                 allTime: 500,
//                 tomove: function (left) {
//                     imgcontainer.style.left = left + 'px';
//                 },
//                 toend: function () {
//                     key = true;
//                     imgas.forEach(function (node) {
//                         if (node.classList[0] === 'again') {
//                             imgcontainer.appendChild(node)
//                             node.classList.remove('again')
//                         }
//                     })
//                     var index = parseInt(imgcontainer.firstElementChild.getAttribute('index'));
//                     dotsItems.forEach(function (node) {
//                         node.classList.remove('selected')
//                     })
//                     dotsItems[index].classList.add('selected')
//                     imgcontainer.style.left = 0
//                 }
//             }
//             createAnimation(Animationobject)
//         }
//     }

//     // 切换上一张图片
//     var movePrve = function () {
//         if (key) {
//             key = false;
//             var imga = imgcontainer.lastElementChild;
//             var imgas = imgcontainer.querySelectorAll('a')
//             imgcontainer.insertBefore(imga, imgas[0])
//             var Animationobject = {
//                 from: -500,
//                 to: 0,
//                 allTime: 500,
//                 tomove: function (left) {
//                     imgcontainer.style.left = left + 'px';
//                 },
//                 toend: function () {
//                     key = true;
//                     var index = parseInt(imgcontainer.firstElementChild.getAttribute('index'));
//                     dotsItems.forEach(function (node) {
//                         node.classList.remove('selected')
//                     })
//                     dotsItems[index].classList.add('selected')
//                     imgcontainer.style.left = 0
//                 }
//             }
//             createAnimation(Animationobject)
//         }
//     }

//     // 事件监听
//     function addEvent() {
//         container.addEventListener('mouseenter', function () {
//             clearInterval(timerId1)
//         })
//         container.addEventListener('mouseleave', function () {
//             auto()
//         })
//         dotsItem.addEventListener('click', function (e) {
//             dotsItems.forEach(function (node) {
//                 node.classList.remove('selected')
//             })
//             e.target.classList.add('selected')
//             var imga = imgcontainer.querySelectorAll('a')
//             for (var i = 0; i < imga.length; i++) {
//                 if (imga[i].getAttribute('index') === e.target.getAttribute('index')) {
//                     return
//                 }
//                 imgcontainer.appendChild(imga[i]);
//             }
//         })
//         Lbutton.addEventListener('click', function () {
//             movePrve()
//         })
//         Rbutton.addEventListener('click', function () {
//             moveNext()
//         })
//     }

//     // var Animationobject={
//     //     from:?,
//     //     to:?,
//     //     allTime:?,
//     //     duration:?,
//     //     tomove:?,
//     //     toend:?
//     // }
//     // 动画函数
//     var createAnimation = function (Animationobject) {
//         var from = Animationobject.from;//起始
//         var to = Animationobject.to;//结束
//         var allTime = Animationobject.allTime || 1000;//动画总时长
//         var times = Animationobject.duration || 15;//动画间隔
//         var count = Math.floor(allTime / times);//动画次数
//         var step = (to - from) / count;//步长

//         var timerId2 = null;//计时器Id
//         var index = 0;//下标

//         timerId2 = setInterval(move, times)

//         function move() {

//             from += step;
//             index++;
//             if (index >= count) {
//                 from = to;
//                 clearInterval(timerId2);
//                 Animationobject.tomove && Animationobject.tomove(from)
//                 Animationobject.toend && Animationobject.toend();
//                 return
//             }
//             Animationobject.tomove && Animationobject.tomove(from)
//         }
//     }

//     init();
// }())

// 
// 代码优化：实现js动态生成数据 修改一些细节
// 通过dom存储 可以更加方便变量取用
// 

// 效果实现：
// 1、无缝切换
// 2、自动切换
// 3、事件绑定
// 4、动画切换
(function () {

    // 初始化程序
    function init() {
        // 1、创建图片
        createImg();
        dom.imgcontainer.style.width = dom.imgcontainer.children.length * dom.width + "px";
        // 2、创建dots
        createDots();
        // dots的状态改变
        dotChange()
        // // 3、添加事件
        addEvent();
        // // 4、设置自动播放
        auto();
    }

    // 封装获取元素
    function $(selector) {
        return document.querySelector(selector);
    }

    var dom = {
        container: $('.container'),
        imgcontainer: $('.imgs'),
        dotsItem: $('.dots-item'),
        Lbutton: $('.lbtn'),
        Rbutton: $('.rbtn'),
        width: 500,
        timerId1: null,//计时器id
        key: true,//是否切换动画
        cursorindex: 0,// 下标
        duration: 2000
    }

    var imgs = [{ src: "./img/Wallpaper1.jpg" }, { src: "./img/Wallpaper2.jpg" }, { src: "./img/Wallpaper3.jpg" }, { src: "./img/Wallpaper4.jpg" }, { src: "./img/Wallpaper5.jpg" }]

    // 初始化创建图片函数
    var createImg = function () {
        for (var i = 0; i < imgs.length; i++) {
            create(i);
        }
        function create(index) {
            var a = document.createElement("a");
            var img = document.createElement("img");
            a.href = "#";
            img.src = imgs[index].src;
            a.appendChild(img);
            dom.imgcontainer.appendChild(a);
        }
        create(0);
    }

    // 初始化创建Dots函数
    function createDots() {
        for (var i = 0; i < imgs.length; i++) {
            var li = document.createElement("li");
            dom.dotsItem.appendChild(li);
        }
    }

    // dots的状态改变
    function dotChange() {
        // var dots = dom.dotsItem.querySelectorAll('li')
        // // 1、删除其他选中样式
        // dots.forEach(function (node) {
        //     node.classList.remove('selected');
        // })
        var selecteddot = $('.selected')
        if (selecteddot) {
            selecteddot.classList.remove('selected')
        }

        // 2、添加选中样式
        var index = dom.cursorindex % dom.dotsItem.children.length
        dom.dotsItem.children[index].classList.add('selected');
    }

    // 移动
    function move(newindex, onend) {
        if (dom.key === false || newindex === dom.cursorindex) {
            return;
        }
        dom.key = false;
        var obj = {
            from: parseInt(dom.imgcontainer.style.left) || 0,
            to: -newindex * dom.width,
            allTime: 800,
            tomove: function (left) {
                dom.imgcontainer.style.left = left + "px";
            },
            toend: function () {
                dom.key = true;
                onend && onend();
            }
        }
        createAnimation(obj);
        dom.cursorindex = newindex;
        dotChange();
    }

    function next() {
        var newindex = dom.cursorindex + 1;
        var onend;
        if (newindex === dom.imgcontainer.children.length - 1) {
            onend = function () {
                dom.imgcontainer.style.left = 0;
                dom.cursorindex = 0;
            }
        }
        move(newindex, onend)
    }

    function prov() {
        var newindex = dom.cursorindex - 1;
        if (newindex === -1) {
            var maxindex = dom.imgcontainer.children.length - 1;
            dom.imgcontainer.style.left = -maxindex * dom.width + 'px';
            newindex = maxindex - 1;
        }
        move(newindex)
    }

    function addEvent() {
        // 下标事件
        for (var i = 0; i < dom.dotsItem.children.length; i++) {
            (function (i) {
                dom.dotsItem.children[i].addEventListener('click', function () {
                    move(i);
                })
            }(i))
        }
        // 左按键
        dom.Lbutton.addEventListener('click', prov)
        dom.Rbutton.addEventListener('click', next)

        dom.container.addEventListener('mouseenter', function () {
            clearInterval(dom.timerId1);
        })
        dom.container.addEventListener('mouseleave', function () {
            auto()
        })
    }

    // 自动播放
    function auto() {
        dom.timerId1 = setInterval(function () {
            next();
        }, dom.duration);
    }

    // var Animationobject={
    //     from:?,
    //     to:?,
    //     allTime:?,
    //     duration:?,
    //     tomove:?,
    //     toend:?
    // }

    // 动画函数
    var createAnimation = function (Animationobject) {
        var from = Animationobject.from;//起始
        var to = Animationobject.to;//结束
        var allTime = Animationobject.allTime || 1000;//动画总时长
        var times = Animationobject.duration || 15;//动画间隔
        var count = Math.floor(allTime / times);//动画次数
        var step = (to - from) / count;//步长

        var timerId2 = null;//计时器Id
        var index = 0;//下标

        timerId2 = setInterval(move, times)

        function move() {

            from += step;
            index++;
            if (index >= count) {
                from = to;
                clearInterval(timerId2);
                Animationobject.tomove && Animationobject.tomove(from)
                Animationobject.toend && Animationobject.toend();
                return
            }
            Animationobject.tomove && Animationobject.tomove(from)
        }
    }

    init();

}())
