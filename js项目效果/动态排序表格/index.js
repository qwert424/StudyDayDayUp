// var checkAll = document.querySelector('#checkAll');
// var checks = document.querySelectorAll('input');
// var tbody = document.querySelector('tbody');

// var number = checkAll.parentNode.nextElementSibling;
// var nameUsr = checkAll.parentNode.nextElementSibling.nextElementSibling;
// var age = checkAll.parentNode.nextElementSibling.nextElementSibling.nextElementSibling;

// // 上面可以通过循环表头thead 的 tr 来优化

// // 添加事件
// function init() {
//     addEvent()
// }
// init();

// function addEvent() {
//     checkAll.addEventListener('click', togel);

//     for (var i = 1; i < checks.length; i++) {
//         (function () {
//             checks[i].addEventListener('click', ifchecked);

//         }())
//     }

//     number.addEventListener('click', test);
//     age.addEventListener('click', test1);
//     nameUsr.addEventListener('click', test2);
// }

// function test() {
//     var obj = getArr()
//     var newarr = obj.numarr.slice(0,);
//     newarr.sort(function (a, b) { return a - b })
//     for (var i = 0; i < newarr.length; i++) {
//         if (obj.numarr[i] !== newarr[i]) {
//             sort(obj.numarr, obj.parents)
//         }
//     }
// }
// function test1() {
//     var obj = getArr()
//     var newarr = obj.agearr.slice(0,);
//     newarr.sort(function (a, b) { return a - b })
//     for (var i = 0; i < newarr.length; i++) {
//         if (obj.agearr[i] !== newarr[i]) {
//             sort(obj.agearr, obj.parents)
//         }
//     }
// }
// function test2() {
//     var obj = getArr()
//     sort(obj.names, obj.parents)
// }

// function getArr() {
//     var checks = document.querySelectorAll('input');
//     var numarr = [];//编号数组
//     var agearr = [];//年龄数组
//     var parents = [];//父类数组
//     var names = [];//名字数组
//     for (var i = 1; i < checks.length; i++) {
//         parents.push(checks[i].parentNode.parentNode);
//         numarr.push(parseInt(checks[i].parentNode.nextElementSibling.innerText));
//         names.push(checks[i].parentNode.nextElementSibling.nextElementSibling.innerText);
//         agearr.push(parseInt(checks[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText));
//     }
//     return { parents, numarr, names, agearr }
// }

// // 切换状态
// function togel() {
//     checkAll.checked ? allCheck() : allCancel();
// }

// // 全部取消
// function allCancel() {
//     for (var i = 0; i < checks.length; i++) {
//         checks[i].checked = false;
//     }
// }

// // 全部选择
// function allCheck() {
//     for (var i = 0; i < checks.length; i++) {
//         checks[i].checked = true;
//     }
// }

// // 判断条件
// function ifchecked() {
//     this.checked === false ? checkAll.checked = this.checked : 0
//     var arr = [];
//     for (var i = 1; i < checks.length; i++) {
//         arr.push(checks[i].checked)
//     }

//     checkAll.checked = !arr.includes(false)
// }

// //排序
// function sort(arr, parent) {
//     for (var i = 0; i < arr.length; i++) {
//         for (var j = i; j < arr.length; j++) {
//             if (arr[i] > arr[j]) {
//                 // arr[i] = arr[i] + arr[j];
//                 // arr[j] = arr[i] - arr[j];
//                 // arr[i] = arr[i] - arr[j];
//                 tbody.insertBefore(parent[i], parent[j + 1])
//             }
//         }
//     }
// }

// 优化点：
// 1、立即执行函数 不干扰全局
// 2、循环获取 不繁杂代码 
// 3、绑定多用函数总理 方便阅读 
// 4、对比的时候 用到数组的sort方法 中文用A.localeCompare（b,'zh'）比较
// 5、appendchild 方法在有的情况下 会加入在最后一个 并且删除原先的 没有就加最后

var checkAll = document.querySelector('#checkAll');
var tbody = document.querySelector('tbody');
var checks = tbody.querySelectorAll('input');

// 初始化执行
function init() {
    // 多选框绑定事件
    addEvent();

    // 判断事件绑定
    titleAddEvent()
}

init();

// 多选框事件绑定
function addEvent() {
    checkAll.addEventListener('click', togel);

    // for (var i = 0; i < checks.length; i++) {
    //     (function (i) {
    //         // checks[i].addEventListener('click', ifchecked);
    //     }(i))
    // }

    tbody.addEventListener('click', checked);

}

// 切换状态
function togel() {
    checkAll.checked ? allCheck() : allCancel();
}

// 全部取消
function allCancel() {
    for (var i = 0; i < checks.length; i++) {
        checks[i].checked = false;
    }
}

// 全部选择
function allCheck() {
    for (var i = 0; i < checks.length; i++) {
        checks[i].checked = true;
    }
}

// 判断条件
// function ifchecked() {
//     var arr = [];
//     for (var i = 0; i < checks.length; i++) {
//         arr.push(checks[i].checked)
//     }
//     checkAll.checked = !arr.includes(false)
// }
function checked(e) {
    if (e.target.tagName === 'INPUT') {
        var curindex = 0;
        for (var i = 0; i < checks.length; i++) {
            checks[i].checked && curindex++;
        }
        checkAll.checked = curindex === checks.length
    }
}

// 标题事件绑定
function titleAddEvent() {
    var title = document.querySelector("thead tr");

    for (var i = 0; i < title.children.length; i++) {
        (function (i) {
            var index = i;
            if (index === 0) return;
            title.children[i].addEventListener("click", function (e) {
                sortArr(index)
            })
        }(i))
    }
}

// 判断函数
function sortArr(index) {
    var numarr = Array.prototype.slice.call(tbody.children);
    if (index === 1 || index === 3) {
        numarr.sort(function (a, b) {
            return parseInt(a.children[index].innerText) - parseInt(b.children[index].innerText);
        })
    } else {
        numarr.sort(function (a, b) {
            // 字符串比较用localeCompare方法
            return a.children[index].innerText.localeCompare(b.children[index].innerText, 'zh-CN')
            // return String.prototype.localeCompare.call(a.children[index].innerText, b.children[index].innerText)
        })
    }
    for (var i = 0; i < numarr.length; i++) {
        tbody.appendChild(numarr[i]);
    }

}