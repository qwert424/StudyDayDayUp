import manageCookie from "./封装cookie.js";

const domBox = document.querySelector('#box');

const CookieLeft = manageCookie.getCookie("left");
const CookieTop = manageCookie.getCookie("top");

domBox.style.left = CookieLeft;
domBox.style.top = CookieTop;
let offsetX;
let offsetY;

// 鼠标按下
function mouseDownHandle(e) {
    document.addEventListener("mousemove", mouseMoveHandle)
    document.addEventListener("mouseup", mouseUpHandle)
    offsetX = e.offsetX;
    offsetY = e.offsetY;
}
// 鼠标移动
function mouseMoveHandle(e) {
    const disX = e.clientX - offsetX;
    const disY = e.clientY - offsetY;
    domBox.style.left = disX + "px";
    domBox.style.top = disY + "px";
}
// 鼠标抬起
function mouseUpHandle() {
    document.removeEventListener("mousemove", mouseMoveHandle)
    document.removeEventListener("mouseup", mouseUpHandle)
    const top = getComputedStyle(domBox).top;
    const left = getComputedStyle(domBox).left;
    manageCookie.setCookie("left", left)
    manageCookie.setCookie("top", top)
}
domBox.addEventListener("mousedown", mouseDownHandle)


