// 初始化 显示地图 重绘地图
import * as Map from './map.js';

// 获取dom
const gameContainer = document.querySelector('.game-container');
const itemWidth = 45;
const itemHeight = 45;

// 初始化
export function init() {
    // 1、容器宽高
    setContainerSize();
    // 2、画地图
    showMapUI();
}
// 1、设置容器宽高
function setContainerSize() {
    const MapInfo = Map.getMapInfo();
    gameContainer.style.width = MapInfo.MapCol * itemWidth + 'px';
    gameContainer.style.height = MapInfo.MapRow * itemHeight + 'px';
}

// 2、画地图
export function showMapUI() {
    // 1、清空地图
    gameContainer.innerHTML = "";
    // 2、画地图
    Map.MAIN.forEach((item, row) => {
        item.forEach((item, col) => {
            if (item === Map.WALL) {
                // 墙
                createElement("wall", row, col);
            } else if (item === Map.BOX) {
                // 箱子
                const result = Map.correctBoxPos.find(item => item.row === row && col === item.col)
                if (result !== undefined) {
                    // 情况一：正确位置 
                    createElement("correctBox", row, col);
                } else {
                    // 情况二：错误位置
                    createElement("wrongBox", row, col);
                }
            } else if (item === Map.SPACE) {
                // 空白
                const result = Map.correctBoxPos.find(item => item.row === row && col === item.col)
                if (result !== undefined) {
                    // 情况一：正确位置
                    createElement("currect", row, col);
                }
                // 情况二：空白
            } else {
                // 玩家
                createElement("player", row, col);
            }
        })
    })
}

/**
 * 创建元素
 * @param {*} type 类型
 * @param {*} row 行
 * @param {*} col 列
 */
function createElement(type, row, col) {
    const item = document.createElement('div');
    item.classList.add('item', `item-${type}`);
    gameContainer.appendChild(item);
    elementPosition(item, row, col);
}

/**
 * 位置信息
 * @param {*} item 元素
 * @param {*} row 行
 * @param {*} col 列
 */
function elementPosition(item, row, col) {
    item.style.top = row * itemHeight + 'px';
    item.style.left = col * itemWidth + 'px';
}

init();