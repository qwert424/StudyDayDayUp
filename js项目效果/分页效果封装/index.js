// 实现分页的封装
// 实现：
// 1、初始化样式 禁止 选中
// 2、点击跳转 判断 起始 和 末尾 的样式 disabled
// 3、自动生成中间数字内容
// 新知识： 选择事件 让用户不能选中 onselectstart 或者css 添加样式user-select:none

// 下面代码可以优化的点在于 添加onclick事件可以在生成函数的时候赋值！
// 就可以优化判断 和 事件添加的很多繁杂代码

(function () {

    // 初始化样式生成
    function init() {
        // 生成初始内容
        createitem();

        // 添加事件
        addEvent();
    }

    var container = document.querySelector('.page-container');

    // 数据容器
    var obj = {
        index: 5,//起始数字
        num: 10,//中间内容数量
        allnum: 15,//分页总数
    };

    // 生成内容
    function createitem() {
        // 创建首页和上一页
        createSame("首页", 'first');
        createSame("上一页", 'prov');

        // 创建尾页和下一页
        createSame("下一页", 'next');
        createSame("尾页", 'end');

        // 生成尾数
        var span = document.createElement('span');
        span.innerText = obj.index + '/' + obj.allnum
        container.appendChild(span)

        // 判断 生成中间内容样式数据
        count(obj.index, obj.num, obj.allnum)

        // 创建内容
        createSpecial(obj.index, obj.minnum, obj.maxnum);
    }

    // 首页和上一页、尾页和下一页普通样式
    var createSame = function (contend, fn) {
        var a = document.createElement("a");
        a.innerText = "" + contend;
        a.id = fn
        a.style.width = 'auto';
        a.style.padding = ' 0 20px 0 20px'
        container.appendChild(a)
    }

    // 判断 生成中间内容样式数据
    var count = function (index, num, allnum) {
        if (index > allnum) {
            return;
        }

        // minnum: function () { return this.index - this.num / 2 },//中间内容展示最小值
        // maxnum: function () { return this.minnum() + this.num - 1 }//中间内容展示最大值

        // 判断条件
        if (num >= allnum) {
            minnum = 1;
            maxnum = allnum;
        } else if (index <= Math.floor(num / 2)) {
            minnum = 1;
            maxnum = num;
        } else if (index >= allnum - Math.floor(num / 2)) {
            minnum = allnum - num + 1;
            maxnum = allnum;
        } else {
            minnum = index - Math.floor(num / 2);
            maxnum = minnum + num - 1;
        }

        // 存储数据
        obj.maxnum = maxnum;
        obj.minnum = minnum;
    }


    // 创建中间数字
    /**
     * 
     * @param {number} index 当前下标
     * @param {number} minnum 中间最小数
     * @param {number} maxnum 中间最大数
     */
    var createSpecial = function (index, minnum, maxnum) {
        // 循环 
        for (var i = maxnum; i >= minnum; i--) {
            var a = document.createElement("a");
            a.innerText = "" + i;
            if (i === index) {
                a.classList.add('selected');
            }
            container.insertBefore(a, container.children[2]);
        }

        // 判断是否禁用
        judge(obj.index, obj.minnum, obj.maxnum);

        // 中间事件
        for (var i = 0; i < obj.num; i++) {
            (function (i) {
                container.children[i + 2].addEventListener('click', function () {
                    sameClick(i)
                })
            }(i))
        }
    }

    // 添加事件
    var addEvent = function () {
        // next事件
        var next = document.querySelector('#next');
        next.addEventListener('click', nextClick);

        // prov事件
        var prov = document.querySelector('#prov');
        prov.addEventListener('click', provClick);

        // 首页事件
        var first = document.querySelector('#first');
        first.addEventListener('click', firstClick);

        // 末尾事件
        var end = document.querySelector('#end');
        end.addEventListener('click', endClick);

        // 不能选中 不会出现多次点击出现蓝块
        container.onselectstart = new Function("return false");
    }

    // 判断是否禁用
    var judge = function (index, minnum, maxnum) {
        var first = document.querySelector('#first');
        var prov = document.querySelector('#prov');
        var next = document.querySelector('#next');
        var end = document.querySelector('#end');

        if (maxnum === minnum) {
            first.classList.add('disabled');
            prov.classList.add('disabled');
            next.classList.add('disabled');
            end.classList.add('disabled');
            next.removeEventListener('click', nextClick);
            prov.removeEventListener('click', provClick);
            first.removeEventListener('click', firstClick);
            end.removeEventListener('click', endClick);
        } else if (index === minnum) {
            first.classList.add('disabled');
            prov.classList.add('disabled');
            prov.removeEventListener('click', provClick);
            first.removeEventListener('click', firstClick);
        } else if (index === maxnum) {
            next.classList.add('disabled');
            end.classList.add('disabled');
            next.removeEventListener('click', nextClick);
            end.removeEventListener('click', endClick);
        } else {
            first.classList.remove('disabled');
            prov.classList.remove('disabled');
            next.classList.remove('disabled');
            end.classList.remove('disabled');
            next.addEventListener('click', nextClick);
            prov.addEventListener('click', provClick);
            first.addEventListener('click', firstClick);
            end.addEventListener('click', endClick);
        }

    }

    // next事件函数
    var nextClick = function () {
        deleteElement();
        obj.index++;
        again();
    }

    // prov事件函数
    var provClick = function () {
        deleteElement();
        obj.index--;
        again();
    }

    //  first事件函数
    var firstClick = function () {
        deleteElement();
        obj.index = 1;
        again();
    }

    //  end事件函数
    var endClick = function () {
        deleteElement();
        obj.index = obj.allnum;
        again();
    }

    //  中间事件函数
    var sameClick = function (i) {
        // 获取位置下标
        Array.prototype.slice.call(container.children).forEach(function (child, node) {
            if (child.getAttribute('class') === 'selected') {
                if (i === node - 2) { return }
                i > node - 2 ? obj.index = obj.index + (i - node + 2) : obj.index = obj.index - node + 2 + i
            }
        })
        deleteElement();
        again();
    }

    var deleteElement = function () {
        // 判断 生成中间内容样式数据
        for (var i = 0; i < obj.num; i++) {
            container.children[2].remove();
        }
    }

    var again = function () {
        count(obj.index, obj.num, obj.allnum)
        // 创建内容
        createSpecial(obj.index, obj.minnum, obj.maxnum);
        var span = document.querySelector('span');
        span.innerText = obj.index + '/' + obj.allnum
    }

    init();
}())