// 根据hero.js提供的数据heros，创建合适的元素，将英雄数据显示到页面上

// {/* <a href="https://pvp.qq.com/web201605/herodetail/528.shtml" class="item">
// <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg" alt="">
// <span></span>
// </a> */}

var container = document.querySelector(".container");

/**
 * 创建英雄列表
 * @param {*} target 
 */

function initHero(target) {
    var a = document.createElement("a");
    a.href = "https://pvp.qq.com/web201605/herodetail/" + target.ename + ".shtml";
    a.className = "item";
    a.target = "_blank";
    var img = document.createElement("img");
    img.src = "https://game.gtimg.cn/images/yxzj/img201606/heroimg/" + target.ename + "/" + target.ename + ".jpg";
    var span = document.createElement("span");
    span.innerText = heros[i].cname;
    a.appendChild(img);
    a.appendChild(span);
    container.appendChild(a);
}

for (var i = 0; i < heros.length; i++) {
    initHero(heros[i]);
}