// 工具类

// 格式化时间
export function formatDate(timstamp) {
    const myDate = new Date(parseInt(timstamp));

    const year = myDate.getFullYear().toString().padStart(2, '0');
    const month = (myDate.getMonth() + 1).toString().padStart(2, '0');
    const date = myDate.getDate().toString().padStart(2, '0');
    const hour = myDate.getHours().toString().padStart(2, '0');
    const minute = myDate.getMinutes().toString().padStart(2, '0');
    const second = myDate.getSeconds().toString().padStart(2, '0');

    const day = myDate.getDay();
    const weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

    return `${year}-${month}-${date} ${hour}:${minute}:${second} ${weeks[day]}`;
}