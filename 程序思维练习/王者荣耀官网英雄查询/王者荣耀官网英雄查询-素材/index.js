(async () => {

  // 主程序
  async function main() {
    // 初始化
    await init();
    // 事件绑定
    addEvent();
  }

  // 获取dom元素
  const dom = {
    mainArea: document.querySelector('.main-area'),
    input1: document.querySelectorAll('.menu-top input[type="radio"]'),
    input2: document.querySelectorAll('.menu-main input[type="radio"]'),
    search: document.querySelector('.search input'),
    leftMenu: document.querySelector('.left-menu')
  }

  /**
   * 从网络获取当前的英雄数据
   * @returns Promise
   */
  async function getHeroes() {
    return fetch('https://study.duyiedu.com/api/herolist')
      .then((resp) => resp.json())
      .then((resp) => resp.data.reverse());
  }

  const data = await getHeroes();
  const arr = Array.from(new Set(data.map((data) => data.hero_type).sort((a, b) => a - b)));

  // 初始化
  const init = () => {
    // 获取全部类型的英雄
    dom.input2[0].parentElement.classList.add('check')
    changeHero(dom.input2[0])
  }

  // 事件绑定
  const addEvent = () => {
    // 选中样式
    checked(dom.input1, "menu-top");
    checked(dom.input2, "menu-main");
    dom.leftMenu.addEventListener('click', () => {
      document.querySelectorAll('.check') && document.querySelectorAll('.check').forEach(item => {
        item.classList.remove('check');
      });
      init();
    })
    // 切换英雄类型
    dom.input1.forEach(item => {
      item.addEventListener('change', () => { changeHero(item); })
    })
    dom.input2.forEach(item => {
      item.addEventListener('change', () => { changeHero(item); })
    })
    // 输入框查询
    dom.search.addEventListener('change', async () => {
      dom.mainArea.innerHTML = "";
      document.querySelectorAll('.check') && document.querySelectorAll('.check').forEach(item => {
        item.classList.remove('check');
      });
      dom.input2[0].parentElement.classList.add('check')
      const hero = await getHero(dom.search.value);
      addHtml(hero);
    });
  }

  // 获取指定类型的英雄
  const getHero = async (value, heroType) => {
    if (value) {
      return data.filter((resp) => resp.cname.search(value) !== -1)
    } else if (!document.querySelector(`.menu-top .check`)) {
      return data.filter((resp) => resp.hero_type === heroType || (resp.hero_type2 && resp.hero_type2 === heroType));
    } else if (!arr.includes(heroType)) {
      return data.filter((resp) => resp.pay_type === heroType);
    } else if (document.querySelector(`.menu-top .check`) && arr.includes(heroType)) {
      return data.filter((resp) => resp.pay_type === +document.querySelector('.menu-top .check').children[0].dataset.pay).filter((resp) => resp.hero_type === heroType || (resp.hero_type2 && resp.hero_type2 === heroType))
    }
  }

  // check样式添加
  const checked = (item, area) => {
    item.forEach(item => {
      item.addEventListener('change', () => {
        if (area === "menu-top") {
          document.querySelector('.menu-main .check') && document.querySelector('.menu-main .check').classList.remove('check');
          dom.input2[0].parentElement.classList.add('check');
        }
        item.checked = !item.checked;
        document.querySelector(`.${area} .check`) && document.querySelector(`.${area} .check`).classList.remove('check');
        item.parentElement.classList.add('check');
      })
    })
  }

  // 切换英雄列表
  const changeHero = async (item) => {
    if (item.dataset.hero_type === 'all') {
      let arr1 = [];
      await arr.forEach(async (data) => {
        const hero = await getHero("", data);
        arr1.push(...hero)
      })
      addHtml(Array.from(new Set(arr1)))
    } else if (arr.includes(+item.dataset.hero_type)) {
      const hero = await getHero("", +item.dataset.hero_type);
      addHtml(hero);
    } else {
      const hero = await getHero("", +item.dataset.pay);
      addHtml(hero);
    }
    dom.search.value = '';
  }

  // html样式
  const addHtml = (item) => {
    dom.mainArea.innerHTML = "";
    dom.mainArea.innerHTML += item.map((hero) => `<a href="https://pvp.qq.com/web201605/herodetail/${hero.ename}.shtml" class="hero" target="_blank"><img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero.ename}/${hero.ename}.jpg" alt="" class="img"><span>${hero.cname}</span>
    </a>`).join("");
  }

  main();
})()