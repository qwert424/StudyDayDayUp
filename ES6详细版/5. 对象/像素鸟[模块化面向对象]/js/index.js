import { Game } from './game.js'

// 游戏开始
const game = new Game();
game.event();

alert("3秒后游戏开始!");
setTimeout(() => {
    game.start();
}, 3000)
