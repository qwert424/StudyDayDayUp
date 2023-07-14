(function () {

    // 初始程序
    function init() {
        // 生成图片
        createImg();

        // 绑定事件
        addEvent();
    }

    //获取DOM元素
    var imgItem = document.querySelector('.img-item');
    var imgShow = document.querySelector('.img-show');
    var imgs = document.querySelector('.container .imgs');
    var width = imgItem.clientWidth;
    var height = imgItem.clientHeight;
    var imgItemTop = imgItem.getBoundingClientRect().y;
    var imgItemLeft = imgItem.getBoundingClientRect().x;

    // 生成图片函数
    function createImg() {
        imgItem.firstElementChild.src = './img/imgA_2.jpg'
        var arr = ['A', 'B', 'C'];
        for (var i = 0; i < imgs.children.length; i++) {
            imgs.children[i].firstElementChild.src = './img/img' + arr[i] + '_1.jpg'
        }
    }

    // 生成蒙版 和展示图片
    function createMask(left, top) {
        var Mask = document.createElement('div');
        Mask.style.position = 'absolute';
        left >= width - 100 ? left = width - 100 : left;
        top >= height - 100 ? top = height - 100 : top;
        Mask.style.left = left + 'px';
        Mask.style.top = top + 'px';
        Mask.style.width = '100px';
        Mask.style.height = '100px';
        Mask.style.background = 'Url(' + './img/bg.png' + ')'
        imgItem.appendChild(Mask);
        var selected = document.querySelector('.img.selected');
        imgShow.style.display = 'block';
        imgShow.style.backgroundImage = 'Url(' + selected.firstElementChild.getAttribute('src').replace(1, 3) + ')';
        imgShow.style.backgroundSize = 900 + 'px'
    }



    // 绑定事件
    function addEvent() {
        // 图片列表绑定事件
        for (var i = 0; i < imgs.children.length; i++) {
            (function (i) {
                imgs.children[i].addEventListener('click', change);
            }(i))
        }

        // 鼠标样式事件
        imgItem.addEventListener('mouseenter', createBj);

    }

    // 图片列表绑定事件切换函数
    function change() {
        var selected = document.querySelector('.img.selected');
        selected.classList.remove('selected');
        this.classList.add('selected');
        imgItem.firstElementChild.src = this.firstElementChild.getAttribute('src').replace(1, 2)
    }

    // 蒙版生成
    function createBj(e) {
        imgItem.removeEventListener('mouseenter', createBj);
        imgItem.addEventListener('mouseleave', deleteBj);
        imgItem.addEventListener('mousemove', bjmove);
        var left = e.pageX - imgItemLeft;
        var top = e.pageY - imgItemTop;
        createMask(left, top)
    }

    // 蒙版取消
    function deleteBj() {
        imgItem.addEventListener('mouseenter', createBj);
        imgItem.removeEventListener('mouseleave', deleteBj);
        imgItem.removeEventListener('mousemove', bjmove);
        imgItem.removeChild(this.children[1]);
        imgShow.setAttribute('style', "")
        imgShow.style.display = 'none';
    }

    // 蒙版移动
    function bjmove(e) {
        var Mask = this.children[1];
        var left = e.pageX - imgItemLeft;
        var top = e.pageY - imgItemTop;
        left >= 0 && left < 50 ? left = 0 : left >= width - 50 ? left = width - 100 : left -= 50;
        top >= 0 && top < 50 ? top = 0 : top >= height - 50 ? top = height - 100 : top -= 50;
        Mask.style.left = left + 'px';
        Mask.style.top = top + 'px';

        imgShow.style.backgroundPositionX = -left * 3 + 'px';
        imgShow.style.backgroundPositionY = -top * 3 + 'px';
    }

    init();
}())