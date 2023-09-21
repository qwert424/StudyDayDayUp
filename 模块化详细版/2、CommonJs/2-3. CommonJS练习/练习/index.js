// 主程序 扑克牌的洗牌发牌

// 生成54张扑克牌
const poker = require('./poker');
let pokerArr = [];
for (var i = 1; i <= 13; i++) {
    for (var j = 1; j <= 4; j++) {
        pokerArr.push(new poker.createPoker(j, i).toString());
    }
}
pokerArr.push(new poker.createPoker(null, 14).toString());
pokerArr.push(new poker.createPoker(null, 15).toString());

// 打乱循序
const util = require('./util');
util.sortRandom(pokerArr)

// 发扑克 三位玩家 和 桌面3张
const player1 = pokerArr.slice(0, 17);
const player2 = pokerArr.slice(17, 34);
const player3 = pokerArr.slice(34, 51);
const table = pokerArr.slice(51);

// 打印出每张牌
util.printCard("player1", player1);
util.printCard("player2", player2);
util.printCard("player3", player3);
util.printCard("table", table);