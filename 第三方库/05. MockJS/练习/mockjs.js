Mock.setup({
    timeout: 1000 // 网络延时400毫秒
})
Mock.mock('/api/cart', 'get', {
    "code": 0, // 无错误
    "msg": "", // 错误消息
    "data|1-20": [
        // 主体数据
        {
            "productName": "@csentence(7,12)", // 商品名称
            "productUrl": "@dataImage('80x80','testimage')", // 商品图片url地址
            "unitPrice|1-1000": 0, // 商品单价
            "count|1-10": 0 // 购物数量
        }
    ]
})