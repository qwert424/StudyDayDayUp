// import z,{b} from './a';
// import $ from 'jquery';
// import x,{a} from './b';
// import url from './20230707094805.jpg'
// import './1.less'
// import './2.less' 
// import home from './home'
// import getImg from './move/a/b'

import styles1 from './a.module.less'
import styles2 from './b.module.less'

import $ from 'jquery'
console.log(styles1,styles2)

$('<h1>').text('hello world').addClass(styles1 .a).appendTo('body')
$('<h1>').text('hello world!!!').addClass(styles2 .a).appendTo('body')

// getImg();
// console.log(a,b,home)
// $('<h1>').text('Hello,jquery!!!').css({ "color": "#ff0011", "background": "blue" }).appendTo(document.body)
// $('<img>').prop('src',url).appendTo(document.body)

