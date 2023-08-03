import Mock from "mockjs";
import qs from 'querystring';

// 模拟拦截博客分类
Mock.mock('/api/blogtype', 'get', {
    "code": 0, // 错误码
    "msg": "", // 错误消息
    "data|10-20": [
        {
            "id|+1": 1,
            "name": "分类@id",
            "articleCount|0-300": 0,
            "order|+1": 1
        }
    ]
})

// 模拟拦截博客文章列表
Mock.mock(/^\/api\/blog(\?.+)?$/, 'get', function (options) {
    const limit = qs.parse(options.url).limit;
    const categoryId = +qs.parse(options.url).categoryid;
    return Mock.mock({
        "code": 0, // 错误码
        "msg": "", // 错误消息
        "data": {
            "total|1000-3000": 0, //总数
            [`rows|${limit || 10}`]: [//当前页列表数据
                {
                    id: '@guid',
                    title: '@ctitle(5,50)',
                    description: '@cparagraph(1, 10)',
                    category: { //所属分类
                        id: categoryId,
                        name: "分类:@id"
                    },
                    "scanNumber|0-100": 0,//浏览量
                    "commentNumber|0-100": 0,//评价量
                    "thumb|1": ["@image('1300x2100', '#50B347', '#FFF', 'Mock.js')", null],//图片
                    createDate: '@date("yyyy-MM-dd")'//创建时间
                }
            ]
        }
    })
})
