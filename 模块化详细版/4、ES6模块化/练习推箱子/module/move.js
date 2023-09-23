// 玩家移动判断 重新绘画
import * as Map from './map.js';

/**
 * 下一个位置 行列
 * @param {*} dir 方向
 * @param {*} nowRow 当前行
 * @param {*} nowCol 当前列
 */
export function nextPos(dir, nowRow, nowCol) {
    let row,
        col;
    if (dir === 'left') {
        // 左
        row = nowRow;
        col = nowCol - 1;
    } else if (dir === 'right') {
        // 右
        row = nowRow;
        col = nowCol + 1;
    } else if (dir === 'up') {
        // 上
        row = nowRow - 1;
        col = nowCol;
    } else {
        // 下
        row = nowRow + 1;
        col = nowCol;
    }
    return { dir, row, col };
}

/**
 * 下一个是什么
 * @param {*} dir 方向
 * @param {*} nextRow 下一个行
 * @param {*} nextCol 下一个列
 */
export function nextItem(dir, nextRow, nextCol) {
    if (Map.MAIN[nextRow][nextCol] === Map.SPACE) {
        // 空白
        changeMap(Map.getPlayerPos(), { row: nextRow, col: nextCol })
        return true;
    } else if (Map.MAIN[nextRow][nextCol] === Map.WALL) {
        // 墙
        return false;
    } else {
        // 箱子
        // 判断 箱子下一个是否有阻挡
        const newnextRow = nextPos(dir, nextRow, nextCol).row;
        const newnextCol = nextPos(dir, nextRow, nextCol).col;
        if (Map.MAIN[newnextRow][newnextCol] !== Map.SPACE) {
            return false;
        } else {
            changeMap({ row: nextRow, col: nextCol }, { row: newnextRow, col: newnextCol })
            changeMap(Map.getPlayerPos(), { row: nextRow, col: nextCol })
            return true;
        }
    }
}

/**
 * 地图改变
 * @param {*} pointOne 第一个点坐标
 * @param {*} pointTwo 第二个点坐标
 */
function changeMap(pointOne, pointTwo) {
    const temp = Map.MAIN[pointOne.row][pointOne.col];
    Map.MAIN[pointOne.row][pointOne.col] = Map.MAIN[pointTwo.row][pointTwo.col]
    Map.MAIN[pointTwo.row][pointTwo.col] = temp;
}