import LoadingImgUrl from '@/assets/loading.svg';
import Style from './Loading.module.less';

// 获取加载图片
function getLoadingImg(el) {
    return el.querySelector("div[data-loading='true']")
}

// 创建加载图片
function createLoadingImg() {
    const div = document.createElement("div");
    const img = document.createElement("img")
    img.src = LoadingImgUrl;
    div.dataset.loading = "true";
    img.classList.add(Style["img"]);
    div.classList.add(Style["Loading-container"]);
    div.appendChild(img);
    return div;
}

// 因为bind和update都是判断是否有加载图片img元素 进行添加和删除 所以使用简化函数
export default function (el, bingding) {
    const LoadingIm = getLoadingImg(el);
    if (LoadingIm) {
        if (!bingding.value) {
            el.removeChild(LoadingIm);
        }
    } else {
        if (bingding.value) {
            el.appendChild(createLoadingImg());
        }
    }
}

