// /** 
//  * 账户id验证 
//  * @return {boolean} 账户满足不为空且长度大于3小于12 返回true 反之 false
//  */

// function formLoginId() {
//     var Log = document.querySelector('#Login');
//     var input = Log.querySelector('input');
//     var p = Log.querySelector('.msg');
//     var err = "";
//     if (!input.value) {
//         err = '账号不为空';
//     } else if (input.value.length < 3 || input.value.length > 12) {
//         err = '账号长度为3-12位';
//     }
//     p.innerHTML = err
//     err ? Log.classList.add('err') : Log.classList.remove('err');
//     return !err
// }

// /** 
//  * 密码验证 
//  * @return {boolean} 账户满足不为空且长度大于6小于16 返回true 反之 false
//  */

// function formPassword() {
//     var Pas = document.querySelector('#Password');
//     var input = Pas.querySelector('input');
//     var p = Pas.querySelector('.msg');
//     var err = "";
//     if (!input.value) {
//         err = '密码不为空';
//     } else if (input.value.length < 6 || input.value.length > 16) {
//         err = '账号长度为6-16位';
//     }
//     p.innerHTML = err
//     err ? Pas.classList.add('err') : Pas.classList.remove('err');
//     return !err
// }

// /** 
//  * 登录验证 
//  * 账户 密码 均满足则登录 反之不行
//  */

// function formButton() {
//     var r1 = formLoginId();
//     var r2 = formPassword();
//     return r1 && r2;
// }

// // 绑定事件
// document.querySelector('#Login').addEventListener('input', function () {
//     formLoginId()
// });

// document.querySelector('#Password').addEventListener('input', function () {
//     formPassword()
// });

// document.querySelector('form').addEventListener('submit', function (e) {
//     if (!formButton()) {
//         e.preventDefault();
//     }
// })



/**
 * 上面函数进行封装 用回调函数知识
 * @param {string} id 获取所属范围
 * @param {function} callback 回调函数验证
 */

function formHeaper(id, callback) {
    var Log = document.querySelector(id);
    var input = Log.querySelector('input');
    var p = Log.querySelector('.msg');
    var err = callback(input.value);
    p.innerHTML = err
    err ? Log.classList.add('err') : Log.classList.remove('err');
    return !err
}

// 账户验证回调函数
function formLoginId() {
    formHeaper('#Login', function (value) {
        if (!value) {
            return '账号不为空';
        } else if (value.length < 3 || value.length > 12) {
            return '账号长度为3-12位';
        }
    })
}

// 密码验证回调函数
function formPassword() {
    formHeaper('#Password', function (value) {
        if (!value) {
            return '密码不为空';
        } else if (value.length < 6 || value.length > 16) {
            return '账号长度为6-16位';
        }
    })
}


/** 
 * 登录验证 
 * 账户 密码 均满足则登录 反之不行
 */

function formButton() {
    var r1 = formLoginId();
    var r2 = formPassword();
    return r1 && r2;
}

// 绑定事件
document.querySelector('#Login').addEventListener('input', function () {
    formLoginId()
});

document.querySelector('#Password').addEventListener('input', function () {
    formPassword()
});

document.querySelector('form').addEventListener('submit', function (e) {
    if (!formButton()) {
        e.preventDefault();
    }
})


//正则表达式来写邮箱 数字 单价验证

/**
 * 上面函数进行封装 用回调函数知识
 * @param {string} id 获取所属范围
 * @param {function} callback 回调函数验证
 */

function formHeaper(id, callback) {
    var Log = document.querySelector(id);
    var input = Log.querySelector('input');
    var p = Log.querySelector('.msg');
    var err = callback(input.value);
    p.innerHTML = err
    err ? Log.classList.add('err') : Log.classList.remove('err');
    return !err
}

// 邮箱验证回调函数
// function formLoginId() {
//     formHeaper('#Login', function (value) {
//         if (!value) {
//             return '邮箱不为空';
//         }
//         var reg = /^.+@[^\.\s]+(\.[^\.\s]+){1,2}$/;
//         if (!reg.test(value)) {
//             return '邮箱格式不符合';
//         }
//     })
// }

// 数量验证回调函数

// function formLoginId() {
//     formHeaper('#Login', function (value) {
//         if (!value) {
//             return '邮箱不为空';
//         }
//         var reg = /^[1-9]\d*$|^0$/;
//         if (!reg.test(value)) {
//             return '数量格式不符合';
//         }
//     })
// }

// // 单价验证回调函数
function formLoginId() {
    formHeaper('#Login', function (value) {
        if (!value) {
            return '邮箱不为空';
        }
        var reg = /^([0-9]\d*|0).\d{2}$/;
        if (!reg.test(value)) {
            return '数量格式不符合';
        }
    })
}

/** 
 * 登录验证 
 * 账户 密码 均满足则登录 反之不行
 */

function formButton() {
    var r1 = formLoginId();
    var r2 = formPassword();
    return r1 && r2;
}

// 绑定事件
document.querySelector('#Login').addEventListener('input', function () {
    formLoginId()
});

document.querySelector('#Password').addEventListener('input', function () {
    formPassword()
});

document.querySelector('form').addEventListener('submit', function (e) {
    if (!formButton()) {
        e.preventDefault();
    }
})