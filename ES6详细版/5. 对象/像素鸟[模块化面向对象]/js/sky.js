import { CanMoveRect } from './canMoveRectClass.js'
import { skyInitData } from './dataStore.js'

// 天空类
export class Sky extends CanMoveRect {
    constructor() {
        super(skyInitData.skyWidth, skyInitData.skyHeight, skyInitData.skyTop, skyInitData.skyLeft, skyInitData.skySpeedX, skyInitData.skySpeedY, skyInitData.sky)
    }
    individualBehavior() {//类行为
        if (Math.abs(this.left) >= skyInitData.skyWidth / 2) {
            this.left = 0
        }
    }
}


