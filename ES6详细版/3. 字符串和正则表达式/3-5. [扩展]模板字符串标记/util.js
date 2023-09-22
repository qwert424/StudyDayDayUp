// 模板字符串标记自定义

/**
 * 自定义模板拼接
 * 标记名:myTag
 */
const loveOne = "吃饭";
const loveTwo = "睡觉";

const str = myTag`我的喜好是${loveOne};我还喜欢${loveTwo}`;

function myTag(ports) {
    const interpolations = Array.prototype.slice.apply(arguments).slice(1);
    let str = ""
    for (let i = 0; i < interpolations.length; i++) {
        str += `${ports[i]}: ${interpolations[i]}`
        if (i === interpolations.length - 1) {
            str += ports[i + 1]
        }
    }
    return str
}


/**
 * 将用户输入的值进行安全处理的 (模板字符串标记函数)
 * 标记名:safe 即:对<>进行转义 
 */
const inputTxt = document.querySelector('#txt')
const btn = document.querySelector('#btn')
const container = document.querySelector('#container')

btn.addEventListener('click', () => {
    const value = inputTxt.value;
    // container.innerText = value;
    //     container.innerHTML = safe`<p>
    //    ${value}
    //     </P>`+ `
    //     <p>
    //     ${value}
    //     </P>
    //     `
})

function safe(ports) {
    const value = Array.prototype.slice.apply(arguments).slice(1);
    let str = "";
    for (let i = 0; i < value.length; i++) {
        const newValue = value[i].replace(/</g, '&lt;').replace(/>/g, '&gt;')
        str += ports[i] + newValue;
        if (i === value.length - 1) {
            str += ports[i + 1];
        }
    }
    return str;
}
