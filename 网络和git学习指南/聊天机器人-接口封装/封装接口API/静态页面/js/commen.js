// 查找DOM元素
function $(selector) {
    return document.querySelector(selector);
}
// 查找DOM元素
function $$(selector) {
    return document.querySelectorAll(selector);
}
// 创建DOM元素
function $$$(selector) {
    return document.createElement(selector);
}