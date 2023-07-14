// 根据下面的调用示例，完成函数 getDatas
var getDatas = (page=1, num=10, ...args) => {
    console.log(`获取第${page}页的数据，每页显示${num}条`)
}

getDatas(); // 输出：获取第1页的数据，每页显示10条
getDatas(2); // 输出：获取第2页的数据，每页显示10条
getDatas(2, 30); // 输出：获取第2页的数据，每页显示30条
