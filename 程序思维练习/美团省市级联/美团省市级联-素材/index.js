(async function () {

  // 主程序
  async function main() {
    // 初始化
    init();
    await getData(dom.provinceOptions, data);
    // 事件绑定
    addEvent();
  }

  //  获取元素
  const dom = {
    province: document.querySelector('.province'),
    city: document.querySelector('.city'),
    area: document.querySelector('.area'),
    provinceSelector: document.querySelector('.province .select'),
    citySelector: document.querySelector('.city .select'),
    areaSelector: document.querySelector('.area .select'),
    provinceOptions: document.querySelector('.province .options'),
    cityOptions: document.querySelector('.city .options'),
    areaOptions: document.querySelector('.area .options'),
  }

  /**
   * 远程获取省市区数据，当获取完成后，得到一个数组
   * @returns Promise
   */
  async function getDatas() {
    return fetch('https://study.duyiedu.com/api/citylist')
      .then((resp) => resp.json())
      .then((resp) => resp.data);
  }
  const data = await getDatas()
  console.log(dom, data)

  // 初始化
  const init = function () {
    // 内容
    dom.provinceSelector.children[0].innerText = "请选择 省份";
    dom.citySelector.children[0].innerText = "请选择 城市";
    dom.areaSelector.children[0].innerText = "请选择 地区";
    // 禁止样式
    dom.city.classList.add("display");
    dom.area.classList.add("display");

    // 删除数据
    dom.areaOptions.innerHTML = "";
    dom.cityOptions.innerHTML = "";
  };

  // 事件绑定
  const addEvent = function () {
    dom.provinceSelector.addEventListener('click', onclicked);
    // 列表绑定
    liOnclicked(dom.provinceOptions, dom.cityOptions);
    liOnclicked(dom.cityOptions, dom.areaOptions, dom.provinceSelector);
    liOnclicked(dom.areaOptions);
  }

  // 展示卡点击事件
  const onclicked = function () {
    findStyle.call(this, document, "checked");
    this.classList.toggle('checked');
  }

  // li点击事件
  const liOnclicked = function (tagget, nexttagget, prevtagget) {
    tagget.addEventListener('click', async function (e) {
      if (e.target.nodeName !== "LI") { return }
      if (nexttagget && !prevtagget) {
        init();
        dom.areaSelector.removeEventListener('click', onclicked)
      } else if (nexttagget && prevtagget) {
        dom.areaSelector.children[0].innerText = "请选择 地区";
        dom.areaOptions.innerHTML = "";
      }
      nexttagget && nexttagget.parentElement.classList.remove("display");
      this.previousElementSibling.classList.toggle('checked');
      findStyle(tagget, "selected");
      e.target.classList.add('selected');
      this.previousElementSibling.children[0].innerText = e.target.innerText;
      prevtagget ? await getData(nexttagget, data, prevtagget.innerText, e.target.innerText) : nexttagget ? await getData(nexttagget, data, e.target.innerText) : false;
      nexttagget && nexttagget.previousElementSibling.addEventListener('click', onclicked)
    });

  }

  // 找样式
  const findStyle = function (x, target) {
    const targetStyle = x.querySelector(`.${target}`);
    if (targetStyle === this) {
      return
    }
    targetStyle && targetStyle.classList.remove(`${target}`);
  }

  // 数据加载
  const getData = function (obj, data, province, city) {
    if (province && !city) {
      obj.innerHTML = data.filter(data => data.label === province).map(data => data.children).map(data => data.map(data => `<li data-value="${data.value}">${data.label}</li>`).join(''));
    } else if (city) {
      obj.innerHTML = data.filter(data => data.label === province).map(data => data.children).map(data => data.filter(data => data.label === city).map(data => data.children).map(data => data.map(data => `<li data-value="${data.value}">${data.label}</li>`).join('')))
    } else {
      obj.innerHTML = data.map((data) => `<li data-value="${data.value}">${data.label}</li>`).join('');
    }
  };

  main();
}())
