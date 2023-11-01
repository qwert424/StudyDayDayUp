/**
  index.js 项目 JS 主入口
  以依赖 layui 的 layer 和 form 模块为例
**/
layui.define(['layer'], function (exports) {

  var laydate = layui.laydate;

  //执行一个laydate实例
  laydate.render({
    elem: '#test1', //指定元素
    type: 'data',//控件选择类型
    range: false, //开启左右面板范围选择
    format: 'yyyy年MM月dd日',//自定义格式
    value: '2017年09月10日', //初始值
    // min: '2023-1-1',
    // max: '2023-12-31',
    lang: 'cn',
    calendar: true,
    mark: {
      '0-0-1': '生日'
    },
    ready: function (date) {
      console.log(date); //得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
      laydate.hint(date)
    }
  });

  exports('index', {}); //注意，这里是模块输出的核心，模块名必须和 use 时的模块名一致
});  