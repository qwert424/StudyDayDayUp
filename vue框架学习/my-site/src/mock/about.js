import Mockjs from "mockjs";

// 拦截关于我 http://skill.phodal.com/#_rs2tu_1_Name
Mockjs.mock('/api/about', 'get', {
    code: 0,
    msg: "",
    data: "https://thisissand.com/"
})
