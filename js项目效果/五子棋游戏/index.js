// 五子棋
// 实现：
// 1、初始化棋盘
// 2、每次下棋 判断是否结束游戏
// 结束游戏显示旗子数字（第几颗下的）

// 优化思路：
// 1、table来绘制表格 设置行间自定义属性 通过字符串模板来定义行 列   border-collapse: collapse;
// 2、通过数组arr来存储已经存在的下过的棋子 
// 3、棋子信息通过数组（行、列、颜色）存储在arr中
// 4、思路 定义棋子所属的td单元格 就是第一个棋子位于第一个格子 所以 存在 最后一行和最后一列的格子存储两个棋子 且右下角存储四个棋子
// 5、通过相同的自定义属性 行 列 将棋子和格子对应起来 
// 6、通过arr数组的find(function(node){return node.x和棋子的x})判断循环arr数组是否横、竖、斜结束游戏 
// 7、通过存入符合要求的棋子来加结束游戏样式




(function () {
    // 初始化操作
    function init() {
        // 创建棋盘焦点数组
        createChessArr();
        // 创建棋盘
        createChess();
    }

    var container = document.querySelector('.item');
    // 数据存储
    var obj = {
        col: 15,//行 焦点
        row: 15,//列 焦点
        Col: 14,//行 方格
        Row: 14,//列 方格
        index: 0,//下标
        arr: [],//焦点坐标
    }

    // 创建焦点坐标数组
    var createChessArr = function () {
        for (var i = 0; i < obj.col; i++) {
            obj.arr[i] = [];
            for (var j = 0; j < obj.row; j++) {
                obj.arr[i][j] = [i, j, iskey = false, isBlack = false]//生成棋盘数组 分别存储行 列 是否有棋子 是否黑棋
            }
        }
    }

    // 创建棋盘
    var createChess = function () {
        for (var i = 0; i < obj.Col; i++) {
            for (var j = 0; j < obj.Row; j++) {
                var li = document.createElement("li");
                li.classList.add("check");
                li.innerText = `${i}\u00A0\u00A0\u00A0${j}`;//内容为当前格子行列
                container.appendChild(li);
                (function (i, j) {
                    li.onclick = function (e) {
                        judge.call(this, e);//判断旗子落点
                    }
                }(i, j))
            }
        }
    }

    // 添加点击事件判断 棋子落点问题 clientWidth
    var judge = function (e) {
        if (e.target.tagName !== 'LI') {
            return;
        }
        var x = this.getBoundingClientRect().left//方块距离浏览器x距离
        var y = this.getBoundingClientRect().top//方块距离浏览器y距离
        var disX = e.pageX - x;
        var disY = e.pageY - y;
        var width = this.clientWidth / 2;//方块宽度一半
        var height = this.clientHeight / 2;//方块高度一半
        var C = parseInt(this.innerText.substring(0, 2));//取出行
        var R = parseInt(this.innerText.substring(3));//取出列
        // 判断落点位置
        if (disX < width && disY < height) {
            if (obj.arr[C][R][2]) {
                return;
            }
            obj.arr[C][R][2] = true;
            chessDis.call(this, -15, -15, C, R)
        } else if (disX > width && disY < height) {
            if (obj.arr[C][R + 1][2]) {
                return;
            }
            obj.arr[C][R + 1][2] = true;
            chessDis.call(this, 15, -15, C, R + 1)
        } else if (disX > width && disY > height) {
            if (obj.arr[C + 1][R + 1][2]) {
                return;
            }
            obj.arr[C + 1][R + 1][2] = true;
            chessDis.call(this, 15, 15, C + 1, R + 1)
        } else {
            if (obj.arr[C + 1][R][2]) {
                return;
            }
            obj.arr[C + 1][R][2] = true;
            chessDis.call(this, -15, 15, C + 1, R)
        }
    }

    //旗子位置
    var chessDis = function (left, top, C, R) {
        var div = document.createElement('div');
        div.classList.add('chess');
        if (obj.index % 2 === 0) {
            div.classList.add('black')
            obj.arr[C][R][3] = 'black';
        } else {
            div.classList.add('white');
            obj.arr[C][R][3] = 'white';
        }
        div.innerText = obj.index;
        div.style.left = left + 'px';
        div.style.top = top + 'px';
        this.appendChild(div)
        obj.index++;
        isGameOver.call(this, C, R);
    }


    var isGameOver = function (C, R) {
        var minX,//R
            maxX,//R
            minY,//C
            maxY,//C
            YnumB = 0,//黑棋数量
            YnumW = 0,// 白棋子数量
            XnumB = 0,//黑棋数量
            XnumW = 0,// 白棋子数量
            ZnumB = 0,//黑棋数量
            ZnumW = 0;// 白棋子数量

        // 竖
        if (C - 4 <= 0) {
            minY = 0;
            maxY = C + 4;
        } else if (C + 4 >= 14) {
            minY = C - 4;
            maxY = 14;
        } else {
            minY = C - 4;
            maxY = C + 4;
        }
        for (var i = minY; i <= maxY; i++) {
            if (obj.arr[i][R][3] === 'white' && YnumB !== 5) {
                YnumB = 0;
                YnumW++;
            } else if (obj.arr[i][R][3] === 'black' && YnumW !== 5) {
                YnumB++;
                YnumW = 0;
            }
        }
        YnumB === 5 ? show('black') : YnumW === 5 ? show('white') : false;

        // 横
        if (R - 4 <= 0) {
            minX = 0;
            maxX = R + 4;
        } else if (R + 4 >= 14) {
            minX = R - 4;
            maxX = 14;
        } else {
            minX = R - 4;
            maxX = R + 4;
        }
        for (var i = minX; i <= maxX; i++) {
            if (obj.arr[C][i][3] === 'white' && XnumB !== 5) {
                XnumB = 0;
                XnumW++;
            } else if (obj.arr[C][i][3] === 'black' && XnumW !== 5) {
                XnumB++;
                XnumW = 0;
            }
        }
        XnumB === 5 ? show('black') : XnumW === 5 ? show('white') : false;

        // 斜
        if (C > R) {
            if (C + 4 < 14 && R - 4 <= 0) {
                minY = C - R;
                maxY = C + 4;
                minX = 0;
                maxX = R + 4;
            } else if (C + 4 >= 14 && R - 4 <= 0) {
                minY = C - R;
                maxY = 14;
                minX = 0;
                maxX = R + (14 - C);
            } else if (C + 4 >= 14 && R - 4 > 0) {
                minY = C - 4;
                maxY = 14;
                minX = R - 4;
                maxX = R + (14 - C);
            } else {
                minY = C - 4;
                maxY = C + 4;
                minX = R - 4;
                maxX = R + 4;
            }
        } else {
            if (C - 4 <= 0 && R + 4 < 14) {
                minY = 0;
                maxY = C + 4;
                minX = R - C;
                maxX = R + 4;
            } else if (R + 4 >= 14 && C - 4 <= 0) {
                minY = 0;
                maxY = C + (14 - R);
                minX = R - C;
                maxX = 14;
            } else if (C + 4 >= 0 && R + 4 >= 14) {
                minY = C - 4;
                maxY = C + (14 - R);
                minX = R - 4;
                maxX = 14;
            } else {
                minY = C - 4;
                maxY = C + 4;
                minX = R - 4;
                maxX = R + 4;
            }
        }
        var j = minX;
        for (var i = minY; i <= maxY; i++) {
            if (obj.arr[i][j][3] === 'white' && ZnumB !== 5) {
                ZnumB = 0;
                ZnumW++;
            } else if (obj.arr[i][j][3] === 'black' && ZnumW !== 5) {
                ZnumB++;
                ZnumW = 0;
            }
            j++;
        }
        ZnumB === 5 ? show('black') : ZnumW === 5 ? show('white') : false;

        // 斜
        if (C - 4 <= 0 && R - 4 <= 0) {
            minY = 0;
            maxY = C + R;
            minX = 0;
            maxX = C + R;
        } else if (C - 4 <= 0 && R - 4 > 0 && R <= 14 - C) {
            minY = 0;
            maxY = C + 4;
            minX = R - 4;
            maxX = C + R;
        } else if (C - 4 > 0 && R - 4 <= 0 && C <= 14 - R) {
            minY = C - 4;
            maxY = C + R;
            minX = 0;
            maxX = R + 4;
        } else if (C + 4 < 14 && R + 4 >= 14 && C >= 14 - R) {
            minY = C - (14 - R);
            maxY = C + 4;
            minX = R - 4;
            maxX = 14;
        } else if (C + 4 >= 14 && R + 4 >= 14) {
            minY = C - (14 - R);
            maxY = 14;
            minX = R - (14 - C);
            maxX = 14;
        } else if (C + 4 >= 14 && R + 4 < 14 && R > 14 - C) {
            minY = C - 4;
            maxY = 14;
            minX = R - (14 - C);
            maxX = R + 4;
        } else {
            minY = C - 4;
            maxY = C + 4;
            minX = R - 4;
            maxX = R + 4;
        }
        ZnumB = 0;
        ZnumW = 0;
        j = maxX;
        for (var i = minY; i <= maxY; i++) {
            if (obj.arr[i][j][3] === 'white' && ZnumB !== 5) {
                ZnumB = 0;
                ZnumW++;
            } else if (obj.arr[i][j][3] === 'black' && ZnumW !== 5) {
                ZnumB++;
                ZnumW = 0;
            }
            j--;
        }
        ZnumB === 5 ? show('black') : ZnumW === 5 ? show('white') : false;
    }

    // 结束游戏 样式添加
    var show = function (styleChess) {
        var chess = document.querySelectorAll(".chess");
        chess.forEach(function (node) {
            node.style.fontSize = 14 + 'px'
        })
        if (styleChess === 'black') {
            var chessBlack = document.querySelectorAll('.black');
            chessBlack.forEach(function (node) {
                node.classList.add('checked');
            })
        } else {
            var chessWhite = document.querySelectorAll('.white');
            chessWhite.forEach(function (node) {
                node.classList.add('checked');
            })
        }
        var li = document.querySelectorAll('.check');
        li.forEach(function (node) {
            node.onclick = false;
        })
    }

    init();
}())