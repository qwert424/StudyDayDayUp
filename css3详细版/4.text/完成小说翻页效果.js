const context = document.querySelector('.context');
const container = document.querySelector('.container');
let downXpage, upXpage;
let number = 0;
let count = 1;
const handleClickDown = (e) => {
    container.addEventListener('mouseup', handleClickUP)
    downXpage = e.pageX;
}

const handleClickUP = (e) => {
    upXpage = e.pageX;
    if (upXpage - downXpage > 0) {
        count--;
        if (count <= 0) {
            count = 1;
            return;
        }
        number = number + 330;
        context.style.transform = "translateX(" + number + "px)"
    } else {
        count++;
        number = number - 330;
        context.style.transform = "translateX(" + number + "px)"

    }
    container.removeEventListener('mouseup', handleClickUP)

}

container.addEventListener('mousedown', handleClickDown)