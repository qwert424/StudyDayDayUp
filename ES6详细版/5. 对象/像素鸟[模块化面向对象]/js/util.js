// 随机数
/**
 * 范围随机数
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}