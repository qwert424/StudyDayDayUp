// 判断是否结束游戏
import { correctBoxPos, MAIN, BOX } from './map.js';

export function ifGameOver() {
    for (let i = 0; i < correctBoxPos.length; i++) {
        if (MAIN[correctBoxPos[i].row][correctBoxPos[i].col] !== BOX) {
            return false;
        }
    }
    return true;
}