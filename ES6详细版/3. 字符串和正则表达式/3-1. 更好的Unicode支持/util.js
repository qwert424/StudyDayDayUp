/**
 * 判断是否为32bit文字
 * @param {String} str
 */
function if32bit(str, i = 0) {
    return str.codePointAt(i) > 0xffff;
}
// console.log("if32bit:", if32bit("𠮷"));

/**
 * 通过码点的方法判断字符串的长度
 * @param {String} str
 */
function stringLengthOfCodePoint(str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        if (if32bit(str, i)) {
            i++;
        }
        len++;
    }
    return len;
}
// console.log("ab𠮷𠮷a的码点长度：", stringLengthOfCodePoint("ab𠮷𠮷b"))
