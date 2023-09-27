import { CanMoveRect } from './canMoveRectClass.js'
import { pipeInitData, landInitData } from './dataStore.js'
import { randomNumber } from './util.js'

const gameContainer = document.querySelector('.game-container');

// 柱子类
class Pipe extends CanMoveRect {
    constructor(height, top, dom) {
        super(pipeInitData.pipeWidth, height, top, pipeInitData.pipeLeft, pipeInitData.pipeSpeedX, pipeInitData.pipeSpeedY, dom)
    }
    // 实例方法
    individualBehavior() {//类行为
        if (this.left < -8000) {
            this.dom.remove();
        }
    }
}

function createPipeDom() {
    const upPipe = document.createElement('div');
    upPipe.className = "pipe up";
    const downPipe = document.createElement('div');
    downPipe.className = "pipe down";
    gameContainer.appendChild(upPipe);
    gameContainer.appendChild(downPipe);
    return {
        upPipe,
        downPipe
    }
}

// 双柱子对
class Pipes {
    constructor() {
        this.pipeDom = createPipeDom();
        this.upPipe = new Pipe(randomNumber(50, 228), 0, this.pipeDom.upPipe)
        this.downPipe = new Pipe(landInitData.landTop - this.upPipe.height - pipeInitData.pipeWhite, this.upPipe.height + pipeInitData.pipeWhite, this.pipeDom.downPipe)
    }
    // 实例方法
    /**
   * 该柱子对是否已经移出了视野
   */
    get useLess() {
        return this.upPipe.left < -this.upPipe.width;
    }

    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

// 批量柱子对
export class createPipes {
    constructor() {
        this.Allpipes = []
        this.timerId = null;
        this.time = 1500;
    }
    // 实例方法
    start() {
        if (this.timerId) {
            return
        }
        this.timerId = setInterval(() => {
            this.Allpipes.push(new Pipes())
            for (let i = 0; i < this.Allpipes.length; i++) {
                var pair = this.Allpipes[i];
                if (pair.useLess) {
                    //没用的柱子对
                    this.Allpipes.splice(i, 1);
                    i--;
                }
            }
        }, this.time);
    }
    stop() {
        clearInterval(this.timerId);
        this.timerId = null;
    }
}

