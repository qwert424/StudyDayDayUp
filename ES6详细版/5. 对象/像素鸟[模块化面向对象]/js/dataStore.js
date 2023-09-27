// 游戏数据仓库

// 鸟
const bird = document.querySelector('.bird');//鸟
const birdStyle = getComputedStyle(bird)//鸟的样式
const birdWidth = parseFloat(birdStyle.width);//鸟的宽度
const birdHeight = parseFloat(birdStyle.height);//鸟的高度
export const birdInitData = {
    birdAcceleration: 0.5,//鸟的加速度
    birdTop: 150,// 鸟的初始位置top
    birdLeft: 100,// 鸟的初始位置left
    birdSpeedY: 0,//鸟的初始Y速度
    birdSpeedX: 0,//鸟的初始X速度
    birdWidth,//鸟的宽度
    birdHeight,//鸟的高度
    birdFly: 1,//鸟飞行样式
    bird,//鸟dom
}

// 游戏容器
const GameContainer = document.querySelector('.game-container');//游戏容器
const GameContainerStyle = getComputedStyle(GameContainer)//游戏容器的样式
const GameContainerWidth = parseFloat(GameContainerStyle.width);//游戏容器的宽度
const GameContainerHeight = parseFloat(GameContainerStyle.height);//游戏容器的高度

export const GameContainerInitData = {
    GameContainerWidth,//游戏容器宽度
    GameContainerHeight,//游戏容器高度
    GameContainer,//游戏容器
}

// 天空
const sky = document.querySelector('.sky');//天空
const skyStyle = getComputedStyle(sky)//天空的样式
const skyWidth = parseFloat(skyStyle.width);//天空的宽度
const skyHeight = parseFloat(skyStyle.height);//天空的高度
export const skyInitData = {
    skyTop: 0,// 天空的初始位置top
    skyLeft: 0,// 天空的初始位置left
    skySpeedY: 0,//天空的初始Y速度
    skySpeedX: -10,//天空的初始X速度
    skyWidth,//天空的宽度
    skyHeight,//天空的高度
    sky,//天空dom
}

//大地
const land = document.querySelector('.land');//大地
const landStyle = getComputedStyle(land)//大地的样式
const landWidth = parseFloat(landStyle.width);//大地的宽度
const landHeight = parseFloat(landStyle.height);//大地的高度
const landTop = parseFloat(landStyle.top);//大地的top
export const landInitData = {
    landTop,// 大地的初始位置top
    landLeft: 0,// 大地的初始位置left
    landSpeedY: 0,//大地的初始Y速度
    landSpeedX: -20,//大地的初始X速度
    landWidth,//大地的宽度
    landHeight,//大地的高度
    land//大地dom
}

// 柱子
export const pipeInitData = {
    // 柱子的初始位置top
    pipeLeft: GameContainerWidth,// 柱子的初始位置left
    pipeSpeedY: 0,//柱子的初始Y速度
    pipeSpeedX: -20,//柱子的初始X速度
    pipeWidth: 52,//柱子的宽度
    //柱子的高度
    //柱子dom
    pipeWhite: 150// 柱子间空隙y
}