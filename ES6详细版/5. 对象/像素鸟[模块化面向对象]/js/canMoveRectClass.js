// 结合天空、大地、鸟、柱子的共同点 写出一个公共抽象类
/**
 * 可移动的矩形
 * width:宽度；height:高度；top：顶部；left：左边；xSpeed：x轴速度；ySpeed：y轴速度；dom：dom元素
 * 速度有正有负 负为左边 正为右边
 */
export class CanMoveRect {
    // 构造器
    constructor(width, height, top, left, xSpeed, ySpeed, dom) {
        if (new.target === CanMoveRect) {//抽象类
            throw new TypeError("抽象类不能实例化");
        }
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.rander();
    }
    // 实例方法
    rander() {//根据实例属性更改dom元素style
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.top = this.top + "px";
        this.dom.style.left = this.left + "px";
    }
    move(duration) {//根据速度时间计算top、left值
        const xDis = this.xSpeed * duration;
        const yDis = this.ySpeed * duration;
        this.left += xDis;
        this.top += yDis;
        if (this.individualBehavior) {
            this.individualBehavior(duration);
        }
        this.rander();
    }
}
