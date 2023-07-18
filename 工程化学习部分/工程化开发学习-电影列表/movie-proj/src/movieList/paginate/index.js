import $ from 'jquery';
import style from './index.module.less';
import { getmovies } from "@/api/getmovies";
import { createItem } from '@/movieList/List'

const container = $('<div>').addClass(style.container).appendTo('#app');
let obj = {};

function createPage(page, styles, status) {
    const span = styles ? $('<span>').addClass(` ${style.item} ${style[styles]}`).text(page).appendTo(container) : $('<span>').addClass(` ${style.item}`).text(page).appendTo(container);
    status ? span.on('click', async function () {
        const activeText = +$(`.${style.active}`).text();
        let resp;
        $(this).text() === '|<<' ? resp = await getmovies(1, obj.size) : $(this).text() === '<<' ? resp = await getmovies(activeText - 1, obj.size) : $(this).text() === '>>' ? resp = await getmovies(activeText + 1, obj.size) : $(this).text() === '>>|' ? resp = await getmovies(obj.count, obj.size) : resp = await getmovies(+$(this).text(), obj.size);
        createItem(resp.movieList);
        $(this).text() === '|<<' ? paginate(1, obj.limit, obj.count) : $(this).text() === '<<' ? paginate(activeText - 1, obj.limit, obj.count) : $(this).text() === '>>' ? paginate(activeText + 1, obj.limit, obj.count) : $(this).text() === '>>|' ? paginate(obj.count, obj.limit, obj.count) : paginate(+$(this).text(), obj.limit, obj.count);
    }) : false;
}

export function paginate(page, limit, count, size) {
    if (!obj.limit && !obj.count && !obj.size) {
        obj.limit = limit;
        obj.count = count;
        obj.size = size;
    }
    container.empty();
    if (page < limit / 2) {
        if (page === 1) {
            createPage('|<<', "disabled", false);
            createPage('<<', "disabled", false);
        } else {
            createPage('|<<', "", true);
            createPage('<<', "", true);
        }
        for (let i = 1; i <= limit; i++) {
            i === page ? createPage(i, "active", false) : createPage(i, "", true);
        }
        createPage('>>', "", true);
        createPage('>>|', "", true);
    } else if (page > count - limit / 2) {
        createPage('|<<', "", true);
        createPage('<<', "", true);
        for (let i = count - 9; i <= count; i++) {
            i === page ? createPage(i, "active", false) : createPage(i, "", true);
        }
        if (page === count) {
            createPage('>>', "disabled", false);
            createPage('>>|', "disabled", false);
        } else {
            createPage('>>', "", true);
            createPage('>>|', "", true);
        }
    } else {
        createPage('|<<', "", true);
        createPage('<<', "", true);
        for (let i = page - 4; i <= page + 5; i++) {
            i === page ? createPage(i, "active", false) : createPage(i, "", true);
        }
        createPage('>>', "", true);
        createPage('>>|', "", true);
    }
}