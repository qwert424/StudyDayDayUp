import Mock from "mockjs";
Mock.mock('/api/setting', 'get', {
    code: 0,
    msg: "",
    data: {
        avatar: "https://img0.baidu.com/it/u=2951898357,371941305&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666",
        siteTitle: "无敌龙傲天",
        github: "https://github.com/fangdaochu",
        qq: "296840095",
        qqQrCode: "https://img0.baidu.com/it/u=2951898357,371941305&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666",
        weixin: "weixinhao",
        weixinQrCode: "https://img0.baidu.com/it/u=2951898357,371941305&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666",
        mail: "296840095@qq.com",
        icp: "网站备案号",
        githubName: "fangdaochu",
        favicon: "https://img0.baidu.com/it/u=2951898357,371941305&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666",
    }
})