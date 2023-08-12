// 图片懒加载
import EventBus from '@/eventBus';
import lazyLoading from '@/assets/lazyLoading.gif';

// 存储需要加载的图片
let imgs = [];

// 设置图片加载过程
function handleSetImg(item, tempImg) {
    const { el } = item;
    el.src = tempImg.src;
    imgs = imgs.filter((i) => i.el !== el)
}

// 设置处理图片懒加载的条件
function handleSetImgs() {
    // 遍历imgs
    imgs.forEach(item => {
        // 初始化图片
        item.el.src = lazyLoading;
        const Rect = item.el.getBoundingClientRect()
        const top = Rect.top;
        const diff = 150;
        const ClientHeight = document.documentElement.clientHeight;
        // 筛选图片
        if (top > -diff && top < ClientHeight) {
            const tempImg = new Image();
            tempImg.onload = function () {
                EventBus.$emit('onloadComplete', item, tempImg)
            }
            tempImg.src = item.src;
        }
    });
}

export default {
    // 被绑定元素插入父节点时调用
    inserted(el, binding) {
        // 监听滚轮滚动
        EventBus.$on('mainScroll', handleSetImgs)
        EventBus.$on('onloadComplete', handleSetImg)
        const imgsObj = {
            el,
            src: binding.value
        }
        imgs.push(imgsObj);
        // 初始执行
        handleSetImgs()
    },
    unbind(el) {
        EventBus.$off('mainScroll', handleSetImgs)
        EventBus.$off('onloadComplete', handleSetImg)
        imgs = imgs.filter(img => img.el !== el)
    }
}