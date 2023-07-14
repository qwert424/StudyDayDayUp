// var ul = document.querySelector('ul');
// var num = 0;

// setInterval(function () {
//     num++;
//     num = num % 4;
//     ul.scrollTop = 30 * num;

// }, 1500);

// 现在对以上代码进行一下优化：
// 1、为了不变量冲突 立即执行函数
// 2、为了不硬编译 值变量化
// 3、js生成元素
// 4、动画 不僵硬变化
// 5、学会使用变量明

// JS就是知道初始化什么 交互什么 此代码无交互

(function () {

    // 获取js操作区域
    var ul = document.querySelector('ul');

    // 克隆第一子元素到最后一项 知识点 克隆节点（true 克隆内容 false 不克隆内容）
    var newEle = ul.firstElementChild.cloneNode(true);
    ul.appendChild(newEle);

    // 每个一段时间来进行切换 也就是切换scollTop的值
    // 不要硬编译 
    var duration = 2000;//定义等待时间
    var curIndex = 0;//定义下标
    var num = ul.children.length;//子元素节点数量
    var scrollHeight = 30//定义每次变化值

    // 定义动画：总时长、切分多少次运动
    var allTime = 300//定义动画总时长
    var time = 10//定义动画间隔时间
    var count = allTime / time;//每次动画次数 
    var timerId = null;//定义计时器Id
    var start;//定义动画起始数据
    var end;//定义动画结束数据
    var step;//定义动画幅度

    setInterval(change, duration);

    function change() {
        start = curIndex * scrollHeight;
        curIndex++;
        end = curIndex * scrollHeight;
        step = (end - start) / count;
        timerId = setInterval(function () {
            start += step;
            if (start >= end) {
                clearInterval(timerId);
                if (curIndex === num - 1) {
                    start = 0;
                    curIndex = 0;
                }
            }
            ul.scrollTop = start;
        }, time);
    }

}())

// 下面为参考代码
// (function () {
//     // 初始化：一开始做什么
//     var list = document.querySelector('.list');
//     // 1. 将列表中的第一个元素，克隆到列表的最后一个
//     function cloneFirstItem() {
//       var firstItem = list.children[0];
//       var newItem = firstItem.cloneNode(true);
//       list.appendChild(newItem);
//     }
//     cloneFirstItem();
  
//     // 2. 滚动：每隔一段时间，将列表滚动到下一个位置
//     var duration = 2000; // 滚动的间隔时间
//     setInterval(moveNext, duration);
//     var itemHeight = 30; // 每一项的高度
//     var curIndex = 0; // 目前展示的是第几项
//     // 将列表滚动到下一个位置
//     function moveNext() {
//       var from = curIndex * itemHeight; // 开始的滚动高度
//       curIndex++;
//       var to = curIndex * itemHeight; // 下一项的滚动高度
//       // 让list的scrollTop，从from慢慢变为to
//       // 慢慢变为：在一段时间内，每隔一小段时间，变化一点
//       var totalDuration = 300; // 变化的总时间
//       var duration = 10; // 变化的间隔时间
//       var times = totalDuration / duration; //变化的次数
//       var dis = (to - from) / times; // 每次变化的量
//       var timerId = setInterval(function () {
//         from += dis;
//         if (from >= to) {
//           // 到达目标值了
//           clearInterval(timerId); // 停止计时器
//           // 滚动完成后，如果是最后一项
//           if (curIndex === list.children.length - 1) {
//             from = 0;
//             curIndex = 0;
//           }
//         }
//         list.scrollTop = from;
//       }, duration);
//     }
//   })();
  