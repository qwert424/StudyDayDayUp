(() => {
    // jQuery获取对象
    function getDom() {
        return $('.form-group').not($('.form-group').last());
    }

    // moment时间函数
    function getTime() {
        getDom().each((i, dom) => {
            $(dom).find('div').html(moment().utcOffset(+$(dom).find('div')[0].dataset.zone).format('YYYY-MM-DD HH:mm:ss'))
        })
    }

    // 下面展示初始化为空
    // $('.form-group').last().html('');

    // 获取input 添加事件
    $('input[id="birthInput"]').on('input', setTimeout);

    function setTimeout() {
        if (!$('#birthInput').val()) {
            $('#birthInput').empty();
            return;
        }
        const NowTime = moment();
        const birthday = moment($('#birthInput').val());

        if (birthday.isAfter(NowTime)) {
            $('#birthInfo').html('生日不正确！'); // 不正确的日期文本
            return;
        }
        const p1 = `<p>
                    <strong>出生日期：</strong>
                    <span>${birthday.format('YYYY-MM-DD')}</span>
                  </p>`
        const p2 = `<p>
                        <strong>年龄：</strong>
                        <span>${NowTime.diff(birthday, 'years')}</span>
                    </p>`
        const p3 = `<p>
                        你在这个世界上已存在了
                        <strong>${NowTime.diff(birthday, 'seconds')}</strong>
                        秒钟
                    </p>`
        let targetDate;
        const thisYearBirth = birthday.years(NowTime.years()); // 今年的生日
        if (thisYearBirth < NowTime) {
            // 今年的生日已经过了
            targetDate = moment(thisYearBirth).add(1, 'years');
        } else {
            targetDate = thisYearBirth;
        }
        console.log(thisYearBirth.format('yyyy-MM-DD'))
        const p4 = `<p>
                        你还有
                        <strong>${targetDate.diff(NowTime, 'days')}</strong>
                        天就会迎来你 ${NowTime.diff(birthday, 'years') + 1} 岁的生日
                    </p>`

        const cal = thisYearBirth.calendar(null, {
            sameDay: '今天',
            nextDay: '明天',
            lastDay: '昨天',
            lastWeek: 'dddd',
            lastWeek: '上个 dddd',
            sameElse: 'YYYY年MM月DD',
        });
        let p5;
        if (thisYearBirth < NowTime) {
            p5 = `你已在
            <strong>${cal}</strong >
            过了生日`
        } else {
            p5 = `你将在
            <strong>${cal}</strong >
            过了生日`
        }

        $('#birthInfo').html(p1 + p2 + p3 + p4 + p5)
    }

    getTime()
    setInterval(getTime, 1000)
})()