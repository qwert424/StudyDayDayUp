import $ from 'jquery';
import style from './index.module.less';
import vedioUrl from '@/assets/movie.mp4';
import musicUrl from '@/assets/music.mp3';

const container = $('<div>').addClass(style.container).appendTo('#app');
const video = $('<video>').prop('src', vedioUrl).prop('loop', true).prop('muted', true).prop('autoplay', true).appendTo(container[0])
const audio = $('<audio>').prop('src', musicUrl).prop('loop', true).appendTo(container[0])
$('<h1>').text('豆瓣电影').addClass(style.title).appendTo(container[0])
$('<span>').text('(点击播放音乐)').addClass(style.tip).appendTo(container[0])

// 点击播放
const clickPlay = () => {
    audio[0].play();
    $(window).on('scroll', autoPlay)
    $(window).off('click')
}

// 控制音乐和影片
const autoPlay = () => {
    const showheight = document.documentElement.clientHeight;
    const windowTop = $(window)[0].scrollY;
    if (windowTop > showheight) {
        video[0].pause();
        audio[0].pause();
    } else if (windowTop < showheight) {
        video[0].play();
        audio[0].play();
    }
}

// 事件绑定
$(window).on('click', clickPlay)