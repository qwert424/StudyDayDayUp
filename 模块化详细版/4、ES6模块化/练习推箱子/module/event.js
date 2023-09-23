// 事件绑定
import { ifGameOver } from './game.js';
import * as Move from './move.js';
import { getPlayerPos } from './map.js';
import { showMapUI } from './init.js';

let GameOver = false;
// 按键事件
document.addEventListener('keydown', keydown)

function keydown(e) {
    if (GameOver) {
        return;
    }
    if (e.key === 'ArrowDown') {
        const pos = Move.nextPos('down', getPlayerPos().row, getPlayerPos().col)
        Move.nextItem('down', pos.row, pos.col)
        showMapUI();
    } else if (e.key === 'ArrowUp') {
        const pos = Move.nextPos('up', getPlayerPos().row, getPlayerPos().col)
        Move.nextItem('up', pos.row, pos.col)
        showMapUI();
    } else if (e.key === 'ArrowLeft') {
        const pos = Move.nextPos('left', getPlayerPos().row, getPlayerPos().col)
        Move.nextItem('left', pos.row, pos.col)
        showMapUI();
    } else {
        const pos = Move.nextPos('right', getPlayerPos().row, getPlayerPos().col)
        Move.nextItem('right', pos.row, pos.col)
        showMapUI();
    }
    if (ifGameOver()) {
        GameOver = true;
        alert('Game Over');
        document.removeEventListener('keydown', keydown)
    }
}