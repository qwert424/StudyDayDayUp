/**
 * 运行该函数，会逐字打印config.js中的文本
 * 每个字之间的间隔在config.js已有配置
 */
async function run() {
    const duration = require('./config.js').wordDuration;
    let index = 0;
    while (index < require('./config.js').text.length) {
        await require('./delay.js')(duration)
        require('./print.js')(index)
        index++;
    }
}

run();