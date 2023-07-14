//需求：封装一个动画函数
//参数：必要参数+选择参数
//必要参数：起始值 结束值 动画总时间 
//选择参数：动画循行函数 动画结束函数

/**
 * @param {object} options 参数对象
 * options={from(起始值),to(结束值),totolTime(动画总时长|1000),duration(时间间隔|15),tomove(动画循行函数),toend(动画结束函数)}   
 * 
 */
function createAnimation(options) {
    var from = options.from;//动画起始值
    var to = options.to;//动画结束值
    var totolTime = options.totolTime || 1000;//动画总时长
    var duration = options.duration || 15;//动画间隔 默认15ms
    var times = Math.floor(totolTime / duration);//动画次数
    var step = (to - from) / times;//动画步长
    var timerId,//计时器id
        timesIndex = 0;//运行次数 用于判断什么时候运行结束
    // 设置动画计时器
    timerId = setInterval(move, duration);
    function move() {
        from += step;
        timesIndex++;
        if (timesIndex >= times) {
            from = to;
            clearInterval(timerId);
            options.tomove && options.tomove(from);
            options.toend && options.toend();
            return;
        }
        options.tomove && options.tomove(from);
    }
    return timerId;
}
