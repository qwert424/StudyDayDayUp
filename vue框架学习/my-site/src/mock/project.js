import Mock from "mockjs";

// 拦截全局设置
Mock.mock('/api/project', 'get', {
    code: 0,
    msg: "",
    "data|10-20": [
        {
            id: "@guid",
            name: "@ctitle(1, 10)",
            "url|1": ["@url", null],
            "github|1": ["@url", null],
            "description|1-4": ["@cparagraph(1, 5)"],
            thumb: "@image(300x250, @color, #fff, @natural)",
            "order|+1": 1
        },
    ]
})