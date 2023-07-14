// // 获取绑定事件的h2元素
// var h2 = document.querySelectorAll('.menucontainer .menu h2');

// // 计算列表高度
// var li = document.querySelector('.menucontainer .menu .submenu li');
// var height = parseInt(getComputedStyle(li, null).height);

// // 动画总时长
// var time = 1000;

// // 绑定事件
// for (var i = 0; i < h2.length; i++) {
//     (function () {
//         h2[i].addEventListener('click', function () {
//             var submenu = this.nextElementSibling;
//             var condition = submenu.getAttribute('condition');
//             var playsubmenu = document.querySelectorAll('.submenu[condition="playing"]')
//             if ((playsubmenu.length === 0 && !condition) || (playsubmenu.length === 0 && condition)) {
//                 var beforeOpen = document.querySelector('.submenu[condition="opened"]');
//                 if (beforeOpen) {
//                     closeSubmenu(beforeOpen);
//                 }
//                 togelSubmenu(submenu);
//             }
//         })
//     }())
// }

// // 切换子菜单状态
// function togelSubmenu(submenu) {
//     var condition = submenu.getAttribute('condition');
//     if (condition === 'opened') {
//         closeSubmenu(submenu)
//     } else if (condition === 'closed' || !condition) {
//         openSubmenu(submenu)
//     }

// }

// // 打开子菜单
// function openSubmenu(submenu) {

//     var condition = submenu.getAttribute('condition');
//     if (condition === 'playing' || condition === 'opened') {
//         return;
//     }

//     var nowheight = parseInt(getComputedStyle(submenu).height);
//     var len = submenu.children.length;
//     submenu.setAttribute('condition', 'playing');

//     var obj = {
//         from: nowheight,
//         to: height * len,
//         totolTime: time,
//         tomove: function (n) {
//             submenu.style.height = n + "px";
//         },
//         toend: function () {
//             submenu.setAttribute('condition', 'opened');
//         }
//     }

//     createAnimation(obj)

// }

// // 关闭子菜单
// function closeSubmenu(submenu) {

//     var condition = submenu.getAttribute('condition');
//     if (condition === 'playing' || condition === 'closed' || !condition) {
//         return;
//     }

//     var nowheight = parseInt(getComputedStyle(submenu).height);
//     submenu.setAttribute('condition', 'playing');

//     var obj = {
//         from: nowheight,
//         to: 0,
//         totolTime: time,
//         tomove: function (n) {
//             submenu.style.height = n + "px";
//         },
//         toend: function () {
//             submenu.setAttribute('condition', "closed");
//         }
//     }

//     createAnimation(obj)

// }

// 优化
// 获取绑定事件的h2元素
var h2 = document.querySelectorAll('.menucontainer .menu h2');

// 计算列表高度
var li = document.querySelector('.menucontainer .menu .submenu li');
var height = parseInt(getComputedStyle(li, null).height);

// 动画总时长
var time = 1000;
var open,
    close,
    key = true;

// 绑定事件
for (var i = 0; i < h2.length; i++) {
    (function () {
        h2[i].addEventListener('click', function () {
            var playsubmenu = document.querySelectorAll('.submenu[condition="openplaying"],.submenu[condition="closeplaying"]');
            if (playsubmenu.length < 1) {
                var submenu = this.nextElementSibling;
                var beforeOpen = document.querySelectorAll('.submenu[condition="opened"]');
                if (beforeOpen.length) {
                    for (var i = 0; i < beforeOpen.length; i++) {
                        if (beforeOpen[i] !== submenu) {
                            closeSubmenu(beforeOpen[i]);
                            setTimeout(function () { openSubmenu(submenu) }, time + 500)
                        } else if (beforeOpen[i] === submenu) {
                            togelSubmenu(submenu);
                        }
                    }
                } else {
                    togelSubmenu(submenu);
                }
            } else if (playsubmenu.length === 1) {
                var submenu = this.nextElementSibling;
                var condition = playsubmenu[0].getAttribute("condition");
                if (playsubmenu[0] === submenu) {
                    togelSubmenu(submenu);
                } else if (playsubmenu[0] !== submenu && condition !== 'closeplaying') {
                    closeSubmenu(playsubmenu[0]);
                    setTimeout(function () { openSubmenu(submenu) }, time + 500)
                } else if (playsubmenu[0] !== submenu && condition === 'closeplaying') {
                    setTimeout(function () { openSubmenu(submenu) }, time)
                }
            }
        }
        )
    }())
}

// 切换子菜单状态
function togelSubmenu(submenu) {
    var condition = submenu.getAttribute('condition');
    if (condition === 'closed' || !condition) {
        openSubmenu(submenu)
    } else if (condition === 'closeplaying') {
        openSubmenu(submenu)
    } else if (condition === 'openplaying') {
        closeSubmenu(submenu)
    } else (
        closeSubmenu(submenu)
    )
}

// 打开子菜单
function openSubmenu(submenu) {
    var condition = submenu.getAttribute('condition');
    if (condition === 'opened') {
        return;
    }
    if (close) {
        clearInterval(close);
        close = null;
    }
    var nowheight = parseInt(getComputedStyle(submenu).height);
    var len = submenu.children.length;
    submenu.setAttribute('condition', 'openplaying');

    var obj = {
        from: nowheight,
        to: height * len,
        totolTime: time,
        tomove: function (n) {
            submenu.style.height = n + "px";
        },
        toend: function () {
            submenu.setAttribute('condition', 'opened');
        }
    }
    open = (createAnimation(obj))

}

// 关闭子菜单
function closeSubmenu(submenu) {
    var condition = submenu.getAttribute('condition');
    if (condition === 'closed' || !condition) {
        return;
    }
    if (open) {
        clearInterval(open);
        open = null;
    }
    var nowheight = parseInt(getComputedStyle(submenu).height);
    submenu.setAttribute('condition', 'closeplaying');
    var obj = {
        from: nowheight,
        to: 0,
        totolTime: time,
        tomove: function (n) {
            submenu.style.height = n + "px";
        },
        toend: function () {
            submenu.setAttribute('condition', "closed");
        }
    }
    close = (createAnimation(obj));
}
