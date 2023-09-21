// 构造函数 扑克牌的构造函数
/**
     * 扑克牌构造函数
     * @param {Number} color
     * @param {Number} number
     */
function createPoker(color, number) {
    this.color = color;
    this.number = number;
}

// 构造扑克牌 画出来
createPoker.prototype.toString = function () {
    const colorArr = ['♣', '♥', '♦', '♠']
    const numberArr = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'joker', 'JOKER']
    let str = '';
    this.number < 14 ? str = colorArr[this.color - 1] + numberArr[this.number - 1] : str = numberArr[this.number - 1]
    return str;
}

module.exports = {
    createPoker
}

// module.exports = createPoker
// module.exports .prototype.toString = function () {
//     const colorArr = ['♣', '♥', '♦', '♠']
//     const numberArr = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'joker', 'JOKER']
//     let str = '';
//     this.number < 14 ? str = colorArr[this.color - 1] + numberArr[this.number - 1] : str = numberArr[this.number - 1]
//     return str;
// }