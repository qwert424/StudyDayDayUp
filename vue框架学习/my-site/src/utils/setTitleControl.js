// 设置网站标题
// 路由标题＋网站标题

let RouterTitle = "",
    NetTitle = "";

function setTitle() {
    if (!RouterTitle && !NetTitle) {
        document.title = 'loading...';
    } else if (RouterTitle && NetTitle) {
        document.title = RouterTitle + '-' + NetTitle
    } else if (!RouterTitle && NetTitle) {
        document.title = NetTitle
    } else {
        document.title = RouterTitle
    }
}

export default {
    // 路由标题
    setRouterTitleControl(title) {
        RouterTitle = title;
        setTitle();
    },
    // 网站标题
    setNetTitleControl(title) {
        NetTitle = title;
        setTitle();
    }
}