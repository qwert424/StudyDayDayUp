(() => {
    // 主程序
    function main() {
        // 初始化
        init();
        // 绑定事件
        addEvent();
    }

    function init() {
        // moment语言
        moment.locale('zh-cn');
        // 获取当前时间
        createSetInterval();
        // 获取详细时间+农历
        createMainTimeAndLunar();
        // 获取时间YYYY年MM月
        controlTime.innerText = moment().format('YYYY年MM月')
        showCalender.innerText = setShowTime();
        // 生成星期标题
        createTitleWeek();
        // 生成当前日历
        createMainCalendar();
    }

    // 封装方法
    function $(target) {
        return document.querySelector(target);
    }

    // 获取dom元素
    const controlTime = $('.change-container .time');
    const timeShort = $('.time-title-container .time-short');
    const timeMain = $('.time-title-container .time-main');
    const titleWeek = $('.main-container .title')
    const mainCalender = $('.main-container .main')
    const showCalender = $('.showSelectTime-container')

    // 1.设置计时器 获取当前时间
    function createSetInterval() {
        timeShort.innerText = moment().format('LTS')
        setInterval(function () {
            timeShort.innerText = moment().format('LTS')
        }, 1000)
    }

    // 2.获取详细时间+农历 
    function createMainTimeAndLunar() {
        const lunarTime = calendar.solar2lunar(moment().year(), moment().month() + 1, moment().date())
        timeMain.innerText = moment().format('LL') + " " + lunarTime.IMonthCn + lunarTime.IDayCn + (lunarTime.Term ? lunarTime.Term : "");
    }

    // 3.生成星期标题
    function createTitleWeek() {
        const weekday = moment.weekdaysMin();
        weekday.forEach(item => {
            titleWeek.innerHTML += `<span>${item}</span>`
        })
    }

    // 4.生成当前日历 
    function createMainCalendar(target) {
        mainCalender.innerHTML = "";
        const nowYear = moment(target).year();// 获取目标当前年
        const nowMonth = moment(target).month() + 1;// 获取目标当前月
        const nowDay = moment(target).month() === moment().month() && moment(target).year() === moment().year() ? moment().date() : null;// 获取目标当前天
        const monthDay = moment(target).daysInMonth()// 获取目标当前月有多少天
        const startDay = moment(target).startOf('month').format('d');// 获取目标当月第一天的星期
        const prevMonth = moment(target).subtract(1, 'month');//获取目标当月前一个月
        let prevEEndDay = prevMonth.daysInMonth()// 获取目标前一个月有多少天
        let nowStr = '';// 目标当前月日历
        for (let i = 0; i < monthDay; i++) {
            if ((i + 1) === nowDay) {
                nowStr += `
                <li class="item selected">
                    <span>${(i + 1)}</span>
                    <span>${getLunarDate(nowYear, nowMonth, i + 1)}</span>
                </li>`
                continue;
            }
            nowStr += `
            <li class="item">
                <span>${(i + 1)}</span>
                <span>${getLunarDate(nowYear, nowMonth, i + 1)}</span>
            </li>`
        }
        let prevStr = '';// 目标前一个月日历
        for (let i = +startDay; i > 0; i--) {
            prevStr = `
            <li class="item notselect" data-month='${nowMonth - 1}'>
                <span>${prevEEndDay}</span>
                <span>${getLunarDate(nowYear, nowMonth - 1, prevEEndDay)}</span>
            </li>`+ prevStr;
            prevEEndDay--;
        }
        let nextStr = '';// 目标后一个月日历
        const nowfrequency = 42 - (monthDay + (+startDay)) + 1;// 获取下个月日历有多少个li
        for (let i = 1; i < nowfrequency; i++) {
            nextStr += `
            <li class="item notselect"  data-month='${nowMonth + 1}'>
                <span>${i}</span>
                <span>${getLunarDate(nowYear, nowMonth + 1, i)}</span>
            </li>`
        }
        mainCalender.innerHTML = prevStr + nowStr + nextStr
    }

    // 5.设置显示时间
    function setShowTime(target) {
        const nowYear = moment(target).year();// 获取目标当前年
        const nowMonth = moment(target).month() + 1;// 获取目标当前月
        const nowDay = moment(target).date();// 获取目标当前天
        const str = `dddd D ${calendar.solar2lunar(nowYear, nowMonth, nowDay).IMonthCn + calendar.solar2lunar(nowYear, nowMonth, nowDay).IDayCn}`;
        return moment(target).calendar(null, {
            sameDay: `今天 ${calendar.solar2lunar(nowYear, nowMonth, nowDay).IMonthCn + calendar.solar2lunar(nowYear, nowMonth, nowDay).IDayCn}`,
            nextDay: str, nextWeek: str, lastDay: str, lastWeek: str, sameElse: str
        });
    }

    // 获取dom元素
    const downarrow = $('.change-container .icon-xiajiantou')
    const uparrow = $('.change-container .icon-shangjiantou')
    let nowYear = moment().year();// 获取当前年
    let nowMonth = moment().month();// 获取当前月

    // 添加事件
    function addEvent() {
        downarrow.addEventListener('click', addMonth)
        uparrow.addEventListener('click', subMonth)
        mainCalender.addEventListener('click', selectDate)
    }

    // 上个月日历
    function subMonth() {
        nowMonth--;
        if (nowMonth < 0) {
            nowMonth = 11;
            nowYear--;
        }
        createMainCalendar([nowYear, nowMonth])
        controlTime.innerText = moment([nowYear, nowMonth]).format('YYYY年MM月')
    }

    // 下个月日历
    function addMonth() {
        nowMonth++;
        if (nowMonth > 11) {
            nowMonth = 0;
            nowYear++;
        }
        createMainCalendar([nowYear, nowMonth])
        controlTime.innerText = moment([nowYear, nowMonth]).format('YYYY年MM月')
    }

    // 选中事件
    function selectDate(e) {
        if (e.target.tagName !== 'UL') {
            document.querySelectorAll('.item').forEach(item => {
                item.style.borderColor = 'transparent';
                if (item.classList.contains('notselect')) {
                    item.style.color = 'rgb(99, 99, 99)'
                }
            })
            if (e.target.parentElement === $('.item.selected') || e.target === $('.item.selected')) {
                $('.item.selected').style.borderColor = '#000'
                if (e.target.tagName === 'LI') {
                    showCalender.innerText = setShowTime([nowYear, nowMonth, e.target.children[0].innerText]);
                } else {
                    showCalender.innerText = setShowTime([nowYear, nowMonth, e.target.parentElement.children[0].innerText]);
                }
            } else if (e.target.tagName === 'LI') {
                e.target.style.border = '3px solid rgb(8, 105, 180)'
                e.target.style.color = 'rgb(237, 237, 237)'
                e.target.classList.contains('notselect') ? showCalender.innerText = setShowTime([nowYear, e.target.dataset.month - 1, e.target.children[0].innerText]) : showCalender.innerText = setShowTime([nowYear, nowMonth, e.target.children[0].innerText])
            } else {
                e.target.parentElement.style.border = '3px solid rgb(8, 105, 180)';
                e.target.parentElement.style.color = 'rgb(237, 237, 237)'
                e.target.parentElement.classList.contains('notselect') ? showCalender.innerText = setShowTime([nowYear, e.target.parentElement.dataset.month - 1, e.target.parentElement.children[0].innerText]) : showCalender.innerText = setShowTime([nowYear, nowMonth, e.target.parentElement.children[0].innerText]);
            }
        }
    }

    // 获取农历时间
    function getLunarDate(year, month, day) {
        const dayCn = calendar.solar2lunar(year, month, day)
        if (dayCn.IDayCn == '初一') {	//如果是月初的话，换成这个月的名字
            result = dayCn.IMonthCn;
        } else if (dayCn.Term) {		//如果有节气的话，换成节气
            result = dayCn.Term;
        } else if (dayCn.festival) {	//如果有节日的话，换成节日
            result = dayCn.festival;
        } else if (dayCn.lunarFestival) {	//如果有中国传统的节日的话，换成传统节日（春节、元宵节、端午节）
            result = dayCn.lunarFestival;
        } else {
            result = dayCn.IDayCn;		//都没有的话就是农历
        }
        return result;
    }
    main();
})()