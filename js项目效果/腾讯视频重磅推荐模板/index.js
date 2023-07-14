(function () {

    // 获取元素
    var navContainer = document.querySelector('.nav-container');
    var navTop = document.querySelector('.nav-top');
    var navAside = document.querySelector('.nav-aside')
    var ul = navAside.querySelector('ul');
    var newdata = Array.prototype.slice.call(data)
    var liHeight = 25;
    var ulHeight = 145;
    var timerId = null,
        time = 1000;
    var index = 0;
    var numarr = [];

    // 初始化
    function init() {
        // 生成数据
        createSj();
        // 生成初始背景
        createImg();
        // 循环播放计时器
        setRun();
        // 绑定事件
        addEvent();
    }
    init();


    // 绑定事件
    function addEvent() {
        // 跳转页面事件
        navContainer.onclick = function () {
            window.location.href = '#';
        };

        // 取消冒泡事件
        navTop.onclick = cancelBubble;
        navAside.onclick = cancelBubble;

        // 列表事件绑定
        ul.addEventListener('mouseenter', addMouseEnterEvent)
        for (var i = 0; i <= ul.children.length; i++) {
            (function (i) {
                ul.childNodes[i].addEventListener('mouseenter', addMouseEnterEvent)
                ul.childNodes[i].addEventListener('click', function () {
                    window.location.href = '#';
                })
            }(i))
        }
    }

    // 取消冒泡事件
    function cancelBubble(e) {
        e.cancelBubble = true;
        return
    }

    // 随机生成数据
    function createSj() {
        for (var i = 0; i < newdata.length; i++) {
            numarr.push(i)
        }
        numarr.sort(function () {
            return Math.floor(Math.random() - 0.5);
        })
        for (var i = 0; i < numarr.length; i++) {
            if (ul.children.length * liHeight > ulHeight || newdata[numarr[i]].title === "") {
                continue;
            }
            var li = document.createElement("li");
            var a = document.createElement("a");
            var span = document.createElement("span");
            a.innerText = newdata[numarr[i]].title
            a.title = newdata[numarr[i]].desc
            span.innerText = newdata[numarr[i]].desc
            a.appendChild(span);
            li.appendChild(a);
            ul.appendChild(li);
        }
    }

    // 生成背景图片
    function createImg() {
        for (var i = 0; i < newdata.length; i++) {
            if (ul.firstElementChild.innerText === newdata[i].title) {
                navContainer.style.backgroundImage = "url(" + newdata[i].img + ")";
                navContainer.style.backgroundColor = newdata[i].bg
                navContainer.style.cursor = "pointer"
                navTop.style.cursor = "context-menu"
                navAside.style.cursor = "context-menu"

            }
        }
    }

    // 循环播放计时器
    function setRun() {
        if (timerId) {
            return;
        }
        var children = ul.children;

        timerId = setInterval(function () {
            if (index === children.length) {
                children[index - 1].classList.remove('on')
                index = 0;
            }
            if (index >= 1 && index < children.length) {
                children[index].previousElementSibling.classList.remove('on')
            }
            children[index].classList.add('on')
            navContainer.style.backgroundImage = "url(" + newdata[numarr[index]].img + ")";
            navContainer.style.backgroundColor = newdata[numarr[index]].bg
            index++;
        }, time)
    }

    // 进入事件
    function addMouseEnterEvent(e) {
        ul.addEventListener("mouseleave", addMouseLeaveEvent)
        clearInterval(timerId);
        timerId = null;
        // console.log(ul.children[index - 1].classList)
        if (index !== 0) {
            ul.children[index - 1].classList.remove('on')
        }
        if (e.target.tagName === "LI") {
            change(e.target);
        }
    }

    // 离开事件
    function addMouseLeaveEvent() {
        navAside.removeEventListener('mouseleave', addMouseLeaveEvent);
        setRun();
    }

    // 切换图片
    function change(name) {
        for (var i = 0; i < ul.children.length; i++) {
            ul.children[i].classList.remove('on')
            if (ul.children[i] === name) {
                index = i;
            }
        }
        name.classList.add('on')
        navContainer.style.backgroundImage = "url(" + newdata[numarr[index]].img + ")";
        navContainer.style.backgroundColor = newdata[numarr[index]].bg
        index++;
        navContainer.onclick = function () {
            window.location.href = '#';
        };
    }

}())