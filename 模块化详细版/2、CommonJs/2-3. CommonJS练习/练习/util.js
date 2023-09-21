// 工具类导出

module.exports = {
    /**
     * 随机打乱数组排序
     * @param {Array} arr
     */
    sortRandom(arr) {
        return arr.sort(() => {
            return Math.random() - 0.5
        })
    },
    /**
     * 打印牌面
     * @param {Array} arr 
     * @param {string} name 
     */
    printCard(name, arr) {
        return console.log(name + ": " + arr.join(' '))
    }
}