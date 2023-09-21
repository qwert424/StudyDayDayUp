define(function (require, exports, module) {
    var b = require.async("b", function (b) {
        console.log("b模块的内部代码", b)
    })
    console.log("a模块的内部代码")
    module.exports = "a模块的内容"
})