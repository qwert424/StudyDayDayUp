const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs')
/**
 * axios获取电影网页数据
 * @param {*} httpSrc 网址
 */
async function getMovies(httpSrc) {
    const resp = await axios.get(httpSrc);
    return resp.data;
}

/**
 * 对获取到的电影网页数据进行处理 
 * @param {*} data 网页数据 字符串 
 */
function handleMoviesData(data) {
    const $ = cheerio.load(data);
    const item = $('tr.item');
    const movieArr = [];
    for (let i = 0; i < item.length; i++) {
        movieArr.push(getMoviesData($(item[i])))
    }
    return movieArr;
}

/**
 * 获取电影数据 标题、图片、详情
 * @param {*} movieItem 电影数据
 */
function getMoviesData(movieItem) {
    const img = movieItem.find('a.nbg img').attr('src')
    const title = movieItem.find('.pl2 a').text().replace(/\s/g, '').split('/')[0]
    const desc = movieItem.find('.pl').text().replace(/\s/g, '')
    return {
        title,
        img,
        desc
    }
}

/**
 * 本地存储  使用node自带核心模块fs的 fs.writeFile(文件名, 数据)
 * @param {*} movieArr  电影列表
 */
function saveMoviesData(movieArr) {
    fs.writeFile('movies.json', JSON.stringify(movieArr), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

/**
 * 主函数
 */
async function main(httpSrc) {
    const resp = await getMovies(httpSrc);
    const movieArr = handleMoviesData(resp);
    saveMoviesData(movieArr);
}

module.exports = main;