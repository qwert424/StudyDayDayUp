import { CanMoveRect } from './canMoveRectClass.js'
import { landInitData } from './dataStore.js'

// 大地类
export class Land extends CanMoveRect {
    constructor() {
        super(landInitData.landWidth, landInitData.landHeight, landInitData.landTop, landInitData.landLeft, landInitData.landSpeedX, landInitData.landSpeedY, landInitData.land)
    }
    individualBehavior() {//类行为
        if (Math.abs(this.left) >= landInitData.landWidth / 2) {
            this.left = 0
        }
    }
}


