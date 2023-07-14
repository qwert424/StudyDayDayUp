//实现拖拽

var moveBar = document.querySelector('.move-bar');
var note = document.querySelector('.note');

// 监听事件 鼠标按下事件

moveBar.onmousedown = function (e) {
    // 监听鼠标移动事件 和 鼠标抬起事件
    // 算出鼠标位置 视口宽高 和 元素的左上角坐标 元素尺寸
    var x = e.clientX;
    var y = e.clientY;
    // 算出元素的左上角坐标
    var eX = note.getBoundingClientRect().left;
    var eY = note.getBoundingClientRect().top;
    // 算出元素尺寸
    var ew = note.clientWidth;
    var eh = note.clientHeight;
    // 算出视口宽高
    var clientX = document.documentElement.clientWidth;
    var clientY = document.documentElement.clientHeight;

    var maxLeft = clientX - ew;
    var maxTop = clientY - eh;

    document.onmousemove = function (e) {
        // 算出移动距离
        var disX = e.clientX - x;
        var disY = e.clientY - y;
        var left = disX + eX;
        var top = disY + eY;

        note.style.left = left + "px";
        note.style.top = top + "px";
        if (top < 0 && left < 0) {
            note.style.left = 0;
            note.style.top = 0;
        } else if (left < 0 && top > maxTop) {
            note.style.left = 0;
            note.style.top = maxTop + 'px';
        } else if (top < 0 && left > maxLeft) {
            note.style.left = maxLeft + 'px';
            note.style.top = 0;
        } else if (top > maxTop && left > maxLeft) {
            note.style.left = maxLeft + 'px';
            note.style.top = maxTop + 'px';
        } else if (left < 0) {
            note.style.left = 0;
        } else if (top < 0) {
            note.style.top = 0;
        } else if (left > maxLeft) {
            note.style.left = maxLeft + 'px';
        } else if (top > maxTop) {
            note.style.top = maxTop + 'px';
        }

        document.onmouseup = function () {
            // 取消监听鼠标移动和鼠标抬起事件
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
}