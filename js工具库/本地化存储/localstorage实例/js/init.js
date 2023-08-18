import Data from './getData.js'; //获取数据
let obj = {};//存储对象
// 初始化
document.querySelector('.Item-Container').innerHTML = Data.map((item, i) => {
    let liststr = '';
    let pricestr = '';
    pricestr += (+item.list[0].price).toFixed(2);
    item.list.forEach((item) => {
        liststr += `<span data-id="${item.id}">${item.color}</span>`
    })
    return `<!-- 商品Item -->
    <div class="Item">
        <!-- 图片 -->
        <img src="./img/img_0${(i + 1)}-1.png" alt="" class="IMG">
        <!-- 描述 -->
        <div class="desc">
            <!-- 名称 -->
            <h2 class="name item">${item.name}</h2>
            <!-- 样式列表 -->
            <div class="list">${liststr}</div>
        </div>
        <!-- 价格 -->
        <span class="price item">${pricestr}元</span>
        <!-- 数量 -->
        <div class="count">
            <!-- 减 -->
            <span class="decr">-</span>
            <!-- 数量 -->
            <span class="num">0</span>
            <!-- 加 -->
            <span class="incr">+</span>
        </div>
        <!-- 按钮 -->
        <button class="button add">加入购物车</button>
    </div>
    `
}).join('')

// 还原购物车
function init() {
    obj = JSON.parse(localStorage.getItem('item')) || {}
    setShoppingDom();
}
init();

//添加事件
// window本地存储事件
window.addEventListener("storage", function () {
    init();
    delButtonEvent();
})

// 种类点击事件
const list = document.querySelectorAll('.list')
list.forEach((item, i) => {
    const newarr = Array.prototype.slice.call(item.children)
    newarr.index = i + 1;
    newarr.forEach((item, index, obj) => {
        item.onclick = (e) => {
            obj.forEach(item => e.target === item ? null : item.classList.remove('active'));
            item.classList.toggle('active');
            // 改变图片
            item.parentElement.parentElement.previousElementSibling.src = item.parentElement.querySelector('.active') ? `./img/img_0${obj.index}-${index + 1}.png` : `./img/img_0${obj.index}-1.png`
        }
    })
})

// 数量事件
document.querySelectorAll('.count').forEach(item => {
    // 减事件
    item.children[0].onclick = () => {
        item.children[1].innerHTML--;
        if (item.children[1].innerHTML < 0) {
            item.children[1].innerHTML = 0;
        }
    }
    // 加事件
    item.children[2].onclick = () => {
        item.children[1].innerHTML++;
    }
})

// 按钮事件
document.querySelectorAll('.add').forEach((item, i) => {
    item.onclick = () => {
        const active = item.parentElement.querySelector('.active');
        if (!active) {
            alert('请选中颜色!')
            return;
        }
        const count = +item.parentElement.querySelector('.num').innerHTML;
        if (count === 0) {
            alert('请添加数量!')
            return;
        }
        const color = active.innerHTML;
        const id = active.dataset.id;
        const src = item.parentElement.querySelector('.IMG').src;
        const price = +(count * Data[i].list[i].price).toFixed(2);
        const name = item.parentElement.querySelector('.name').innerHTML;
        for (const key in obj) {
            if (key === id && obj[key].count === count) {
                alert("购物车已拥有该商品!");
                item.parentElement.querySelector('.num').innerHTML = 0;
                item.parentElement.querySelector('.active').classList.remove('active');
                item.parentElement.children[0].src = `./img/img_0${i + 1}-1.png`;
                return;
            }
            const selected = document.querySelector('.Item-Selected');
            Array.prototype.slice.call(selected.children).forEach(item => {
                if (item.dataset.id === id) {
                    document.querySelector('.Money').innerHTML = +document.querySelector('.Money').innerHTML - parseInt(item.querySelector('.price').innerHTML);
                    document.querySelector('.Item-Selected').removeChild(item);
                }
            })
        }
        document.querySelector('.Money').innerHTML = (+document.querySelector('.Money').innerHTML + price).toFixed(2);
        const Money = +document.querySelector('.Money').innerHTML;
        obj["Money"] = Money;
        obj[`${id}`] = {
            color,
            count,
            src,
            price,
            name,
            id,
            "date": new Date().getTime(),
        };
        // 本地存储
        localStorage.setItem('item', JSON.stringify(obj))
        setShoppingDom(obj[`${id}`]);
        delButtonEvent();
        item.parentElement.querySelector('.num').innerHTML = 0;
        item.parentElement.querySelector('.active').classList.remove('active');
        item.parentElement.children[0].src = `./img/img_0${i + 1}-1.png`;
    }
})

function delButtonEvent() {
    document.querySelectorAll('.del').forEach(item => {
        item.onclick = function () {
            item.onclick = null;
            const newMoney = (+document.querySelector('.Money').innerHTML - parseInt(item.parentElement.querySelector('.price').innerHTML)).toFixed(2);
            const obj = JSON.parse(localStorage.getItem('item'));
            obj.Money = newMoney;
            document.querySelector('.Money').innerHTML = obj.Money;
            delete obj[`${this.dataset.id}`];
            document.querySelector('.Item-Selected').removeChild(item.parentElement);
            // 本地存储
            localStorage.setItem('item', JSON.stringify(obj));
        }
    })
}

function setShoppingDom(item) {
    if (!item) {
        document.querySelector('.Item-Selected').innerHTML = '';
        const data = JSON.parse(localStorage.getItem('item')) || null;
        if (!data) {
            return;
        }
        document.querySelector('.Money').innerHTML = data.Money;
        const newData = Object.values(data).filter(item => typeof item === 'object')
        newData.sort(function (a, b) {
            return a.date - b.date;
        })
        newData.forEach(item => {
            getDom(item)
        })
        return;
    }
    getDom(item)
}

function getDom(obj) {
    const html = document.querySelector('.Item-Selected').innerHTML;
    document.querySelector('.Item-Selected').innerHTML = `<!-- 商品Item -->
    <div class="Item" data-id=${obj.id}>
        <!-- 图片 -->
        <img src="${obj.src}" alt="" class="IMG">
            <!-- 描述 -->
            <h2 class="title item">${obj.name}</h2>
            <!-- 样式列表 -->
            <span>${obj.color}</span>
        </divclass=>
        <!-- 价格 -->
        <span class="price item">${obj.price}元</span>
        <!-- 数量 -->
        <span class="price item">x${obj.count}</span>
        <!-- 按钮 -->
        <button class="button del" data-id=${obj.id}>删除</button>
    </div>`+ html;
}