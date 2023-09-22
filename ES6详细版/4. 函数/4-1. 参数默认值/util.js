/**
 * 生成一个自定义容器
 * @param {string} name 容器名称
 * @param {*} container 父容器
 * @param {String} content 容器内容
 */
function createContainer(name = 'div', container = document.querySelector('#container'), content = "") {
    var div = document.createElement(name);
    if (content) {
        div.innerHTML = content;
    }
    container.appendChild(div);
}
createContainer(undefined, undefined, 'ads')