import { Sky } from './sky.js'
import { Land } from './land.js';
import { Bird } from './bird.js';
import { createPipes } from './pipe.js';

// 游戏类
export class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land();
        this.bird = new Bird();
        this.createPipes = new createPipes();
        this.timerId = null;
        this.gameOver = false;
    }
    // 实例方法
    start() {//开始游戏
        if (this.timerId) { return; }
        if (this.gameOver) { return; }
        this.createPipes.start();
        this.timerId = setInterval(() => {
            this.createPipes.Allpipes.forEach(item => {
                item.move(0.8)
            })
            this.sky.move(1);
            this.land.move(1);
            this.bird.move(2.5);
            this.bird.changeStyle();
            if (this.isgameOver()) {//游戏结束
                this.gameOver = true;
                this.stop();
                setTimeout(() => {
                    const result = confirm('游戏结束!是否重新开始?');
                    if (result) {
                        window.location.reload();
                    } else {
                        return false;
                    }
                }, 100)
            }
        }, 100)
    }
    stop() {//停止游戏
        clearInterval(this.timerId);
        this.timerId = null;
        this.createPipes.stop();
    }
    event() {//事件监听
        document.addEventListener('click', () => {
            this.bird.jump();
        })
        document.addEventListener('keydown', (e) => {
            if (e.key === " ") {
                this.bird.jump();
            }
            if (e.key === "Enter") {
                if (this.timerId) {
                    this.stop();
                } else {
                    this.start();
                }
            }
        })
    }
    isgameOver() {// 游戏结束判断
        if (this.bird.top === this.land.top - this.bird.height || this.bird.top === 0) {//鸟判断
            return true;
        }
        // 碰撞判断
        for (let i = 0; i < this.createPipes.Allpipes.length; i++) {
            const pair = this.createPipes.Allpipes[i];
            //看柱子对pair是否跟bird进行了碰撞
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
    }
    /**
   * 判断两个矩形是否碰撞
   * @param {*} rec1 
   * @param {*} rec2 
   */
    isHit(rec1, rec2) {
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        const centerX1 = rec1.left + rec1.width / 2;
        const centerY1 = rec1.top + rec1.height / 2;
        const centerX2 = rec2.left + rec2.width / 2;
        const centerY2 = rec2.top + rec2.height / 2;
        const disX = Math.abs(centerX1 - centerX2); //中心点横向距离
        const disY = Math.abs(centerY1 - centerY2);//中心点总想距离
        if (disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2
        ) {
            return true;
        }
        return false;
    }
}

