// 地图文件 记录地图信息

/**
 * 导出每个物品的信息代表值
 * 空白：0
 * 墙：1
 * 玩家：2
 * 箱子：3
 */
export const SPACE = 0;
export const WALL = 1;
export const PLAYER = 2;
export const BOX = 3;

/**
 * 地图信息 二维数组
 */
export const MAIN = [
    [SPACE, SPACE, WALL, WALL, WALL, WALL, WALL, SPACE, SPACE],//第一行
    [SPACE, SPACE, WALL, SPACE, PLAYER, SPACE, WALL, SPACE, SPACE],//第二行
    [SPACE, SPACE, WALL, SPACE, BOX, SPACE, WALL, SPACE, SPACE],//第三行
    [WALL, WALL, WALL, SPACE, SPACE, SPACE, WALL, WALL, WALL],//第四行
    [WALL, SPACE, SPACE, SPACE, BOX, SPACE, SPACE, SPACE, WALL],//第五行
    [WALL, SPACE, BOX, BOX, BOX, BOX, BOX, SPACE, WALL],//第六行
    [WALL, SPACE, SPACE, SPACE, BOX, SPACE, SPACE, SPACE, WALL],//第七行
    [WALL, WALL, SPACE, BOX, BOX, BOX, SPACE, WALL, WALL],//第八行
    [SPACE, WALL, SPACE, SPACE, SPACE, SPACE, SPACE, WALL, SPACE],//第九行
    [SPACE, WALL, SPACE, SPACE, BOX, SPACE, SPACE, WALL, SPACE],//第十行
    [SPACE, WALL, SPACE, SPACE, SPACE, SPACE, SPACE, WALL, SPACE],//第十一行
    [SPACE, WALL, WALL, WALL, WALL, WALL, WALL, WALL, SPACE],//第十二行
]

/**
 * 正确箱子坐标（行、列）
 */
export const correctBoxPos = [
    { row: 3, col: 4 },
    { row: 4, col: 4 },
    { row: 5, col: 2 },
    { row: 5, col: 3 },
    { row: 5, col: 4 },
    { row: 5, col: 5 },
    { row: 5, col: 6 },
    { row: 6, col: 4 },
    { row: 7, col: 4 },
    { row: 8, col: 4 },
    { row: 9, col: 4 },
    { row: 10, col: 4 }
]

/**
 * 玩家 位置
 */
export function getPlayerPos() {
    const playerPos = {};
    MAIN.forEach((item, i) => {
        const player = item.find(item => item === PLAYER)
        const playerCol = item.indexOf(PLAYER)
        if (player !== undefined) {
            playerPos.row = i;
            playerPos.col = playerCol;
        }
    })
    return playerPos;
}

/**
 * 计算地图行列值
 */
export function getMapInfo() {
    return {
        MapRow: MAIN.length,
        MapCol: MAIN[0].length,
    }
}