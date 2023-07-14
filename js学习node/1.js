// 延迟函数
function debounce(fn, delay) {
    var timerId;
    var newthis = this;
    var arr = Array.prototype.slice.call(arguments);
    return function () {
        timerId = setTimeout(function () {
            fn.apply(newthis, arr);
        }, delay);
    }
}

var test=function () {
    debounce(function () {},1000)
}


