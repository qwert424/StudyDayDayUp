// 点击切换菜单 js
$('#openMenu').click(function () {
    $('#leftClickChangeMenu').toggleClass('hide');
    hiddenScroll()
})
$('#closeMenu').click(function () {
    $('#leftClickChangeMenu').toggleClass('hide');
    hiddenScroll()
})
function hiddenScroll() {
    if ($(window).width() < 992 && !$('#leftClickChangeMenu').hasClass('hide')) {
        $('body').css('overflow', 'hidden');
    } else {
        $('body').css('overflow', 'auto');
    }
}
function ifShowFooterMenu() {
    if (!$('#leftClickChangeMenu').hasClass('hide')) {
        $('#footerMenu').css('display', 'none');
    }
}
$(window).resize(hiddenScroll, ifShowFooterMenu)

// 1912 派克街 | 咖啡星讲堂 js
let key = undefined;//锁
$('#btn-next').parent().children('li').each((index, e) => {
    if (index === $('#btn-next').parent().children('li').length - 1) {
        $(e).on('transitionend', function () {
            key = true;
        })
    }
})
$('#btn-next').click(function () {
    $(this).parent().children('li').each((index, e) => {
        if (key === undefined || key) {
            const translateX = $(e).css("transform").replace(/[^0-9\-,]/g, '').split(',')[4]
            const ewidth = parseInt($(e).width())
            if (Math.abs(translateX) >= ewidth) {
                $(e).parent().children('.customize-control-next').hide()
            }
            if (+translateX === 0 || translateX === undefined) {
                $(e).parent().children('.customize-control-prev').show()
            }
            $(e).css('transform', `translateX(${translateX === undefined ? -ewidth : +translateX - ewidth}px)`)
        }
        if (index === $(this).parent().children('li').length - 1) {
            key = false;
        }
    })
})
$('#btn-prev').hide();
$('#btn-prev').click(function () {
    $(this).parent().children('li').each((index, e) => {
        if (key === undefined || key) {
            const translateX = $(e).css("transform").replace(/[^0-9\-,]/g, '').split(',')[4]
            const ewidth = parseInt($(e).width())
            if (+translateX === -ewidth) {
                $(e).parent().children('.customize-control-prev').hide()
            }
            if (Math.abs(translateX) === ewidth * 2) {
                $(e).parent().children('.customize-control-next').show()
            }
            $(e).css('transform', `translateX(${+translateX + ewidth}px)`)
        }
        if (index === $(this).parent().children('li').length - 1) {
            key = false;
        }
    })
})