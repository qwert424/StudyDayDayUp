import { CanMoveRect } from './canMoveRectClass.js'
import { birdInitData, landInitData } from './dataStore.js'

// 鸟类
export class Bird extends CanMoveRect {
    constructor() {
        super(birdInitData.birdWidth, birdInitData.birdHeight, birdInitData.birdTop, birdInitData.birdLeft, birdInitData.birdSpeedX, birdInitData.birdSpeedY, birdInitData.bird)
        this.birdFly = birdInitData.birdFly;
        this.birdAcceleration = birdInitData.birdAcceleration;
    }
    individualBehavior(duration) {//类行为
        this.ySpeed = this.birdAcceleration * duration + this.ySpeed;
        if (this.top < 0) {
            this.top = 0;
        }
        if (this.top > landInitData.landTop - this.height) {
            this.top = landInitData.landTop - this.height;
        }
    }
    jump() {//跳 空格
        this.ySpeed = -5;
    }
    changeStyle() {//切换形态
        this.birdFly %= 3;
        this.birdFly++;
        this.dom.className = `bird fly${this.birdFly}`;
    }
}


