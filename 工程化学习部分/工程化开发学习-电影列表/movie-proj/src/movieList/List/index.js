import $ from 'jquery';
import style from './index.module.less';

const container = $('<div>').addClass(style.container).appendTo('#app');

export function createItem(data) {
    const html = data.map(data =>
        `<div class=${style.item}>
            <a href=${data.url} class=${style.imgItem}  target="_blank"><img src='https://img0.baidu.com/it/u=2866338552,4194478241&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=887' class=${style.img}></a>
            <a href=${data.url}  target="_blank"  class=${style.font}><span>${data.title}</span></a>
            <p class=${style.rata}>${data.rate}</p>
        </div>
        `
    ).join('');
    container.html(html);
}
