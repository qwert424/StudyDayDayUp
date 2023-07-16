import $ from 'jquery';
import url from '@/20230707094805.jpg'
export default function createImg(){
    $('<img>').prop('src',url).appendTo(document.body)
}