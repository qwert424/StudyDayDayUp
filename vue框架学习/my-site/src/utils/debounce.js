// 防抖函数
export default function debounce(fn, delay = 1000) {
    let timerId = null;
    return (args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}