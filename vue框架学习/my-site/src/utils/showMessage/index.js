import getRootElement from '@/utils/getComponentRootDom';
import Icon from '@/components/Icon';
import Style from '@/utils/showMessage/showMessage.module.less';
/**
 * 弹窗信息函数 showMessage
 * @param {Object} options 参数对象
 * @param {string} content 文本内容 
 * @param {string} type 类型 默认info 1、info 2、error 3、warn 4、success
 * @param {Number} duration 弹出时间 默认2000ms
 * @param {HTMLElement} container 容器 居中容器 不传入为document.body
 * @param {Function} callback 回调函数
 */
export default function (options) {
    // 参数处理
    const content = options.content || "感谢";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    // 获取图标组件渲染的Dom根元素
    const IconDom = getRootElement(Icon, { type })
    IconDom.style.fontSize = 20 + 'px';
    // 创建dom元素
    const msgDom = document.createElement("div");
    msgDom.classList.add(`${Style.MessageBox}`, `${Style["MessageBox-" + type]}`)
    msgDom.innerHTML = `<span> ${IconDom.outerHTML}</span><span>${content}</span>`;
    container !== document.body ? getComputedStyle(container).position === 'static' ? container.style.position = "relative" : false : false;
    container.appendChild(msgDom);
    // 浏览器强制渲染
    msgDom.clientWidth;
    // 回归正常位置
    msgDom.style.opacity = 1;
    msgDom.style.transform = "translate(-50%, -50%)";
    // 一段时间后离开并删除元素
    setTimeout(() => {
        msgDom.style.opacity = 0;
        msgDom.style.transform = "translate(-50%, -50%) translateY(-25px)";
        msgDom.addEventListener("transitionend", function () {
            this.remove();
            options.callback && options.callback();
        }, { once: true });
    }, duration);
} 