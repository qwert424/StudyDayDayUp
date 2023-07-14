(async () => {

    // 初始化 通过mockJs来获取模拟数据 拦截axios请求
    const resp = await axios.get('/api/cart').then(resp => resp.data.data);
    const html = resp.map(resp =>
        ` <div class="item">
            <div div class="check" >
                <input type="checkbox" class="checkItem" />
            </div >
            <div class="info">
                <img
                    src="${resp.productUrl}"
                    alt=""
                />
                <a href="">
                ${resp.productName}
                </a>
            </div>
            <div class="price"><em>￥ ${resp.unitPrice}</em></div>
            <div class="num">
                <a href="" class="decr">-</a>
                <input type="text" value="${resp.count}" class="txt" />
                <a href="" class="incr">+</a>
            </div>
            <div class="sum"><em>￥${(resp.unitPrice * resp.count).toFixed(2)}
</em ></div >
    <div class="del">
        <a href="">删除</a>
    </div>
        </div > `
    ).join('')
    
    $('.list').html(html)

    // jQuery的学习
    // 1、Dom元素的选中
    // 2、属性check的转变
    // 3、事件绑定
    // 4、文档处理 元素的添加、删除

    //  删除函数
    const deleteItem = function (e, obj) {
        e.preventDefault();
        $(obj).parents(".item").remove();
        countNum($(':checked').not('.checkAll').length);
        ifAllChecked();
        sumAllMoney();
    }

    // 数量变化
    const countNum = num => $('.nums em').text(num);

    // 是否全选
    const ifAllChecked = function () {
        $(':checked').not('.checkAll').length === $('.checkItem').length && $(':checked').not('.checkAll').length !== 0 ? $('.checkAll').prop("checked", true) : $('.checkAll').prop("checked", false);
    }

    // 全部选中金额
    const sumAllMoney = () => {
        // 总金额
        let Allsum = 0;
        $(':checked').not('.checkAll').each(function () { Allsum += parseFloat($(this).parent().siblings('.sum').children().text().slice(1)) })
        $('.sums em').text("￥" + Allsum.toFixed(2));
    }

    // 单个总金额
    const sumMoney = (obj, count) => {
        $(getItem(obj).thisSum).text("￥" + (count * getItem(obj).thisPrice).toFixed(2));
        sumAllMoney();
    }

    // 获取单价和总额
    const getItem = (obj) => {
        return {
            thisSum: $(obj).parent().next().children(),
            thisPrice: parseFloat($(obj).parent().prev().children().text().slice(1))
        }
    }

    // 事件绑定
    // 1、全选中
    $('.checkAll').click(function () {
        const ischecked = $(this).prop('checked');
        $('.checkAll').not(this).prop('checked', (i, val) => !val);
        $('.checkItem').prop("checked", ischecked);
        ischecked ? countNum($('.checkItem').length) : countNum(0);
        sumAllMoney();
    })

    // 2、删除选中样式
    $('.operation a.delChecked').click(function (e) {
        deleteItem(e, $(':checked').not('.checkAll'));
    })

    // 3、删除全部
    $('.operation a.clearAll').click(function (e) {
        $('.checkItem').each(function () { deleteItem(e, this) })
    })

    // 4、单个删除
    $('.item .del a').click(function (e) { deleteItem(e, this) })

    // 5、数量加
    $('.num .incr').click(function (e) {
        e.preventDefault();
        const count = $(this).prev().val(function () { return parseInt(this.value) + 1; }).val();
        $(this).prev().attr('value', $(this).prev().val());
        sumMoney(this, count);
    })

    // 6、数量减
    $('.num .decr').click(function (e) {
        e.preventDefault();
        if ($(this).next().val() <= 0) { return; }
        const count = $(this).next().val(function () { return parseInt(this.value) - 1; }).val();
        $(this).next().attr('value', $(this).prev().val());
        sumMoney(this, count);
    })

    // 自己填数字
    $('.num input').change(function () { sumMoney(this, $(this).val()) })

    // 选中事件和全选的切换
    $('.checkItem').click(function () {
        ifAllChecked();
        countNum($(':checked').not('.checkAll').length);
        sumAllMoney();
    })

})()