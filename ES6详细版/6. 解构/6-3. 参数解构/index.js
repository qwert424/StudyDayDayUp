// // function ajax(options) {
// //     const defaultOptions = {
// //         method: "get",
// //         url: "/"
// //     }
// //     const opt = {
// //         ...defaultOptions,
// //         ...options
// //     }
// //     console.log(opt)
// // }

// function ajax({
//     method = "get",
//     url = "/"
// } = {}) {
//     console.log(method, url)
// }

// ajax()

function ajax(options) {
    // 以前的方法 混合展开法
    const defaultOptions = {
        method: "get",
        url: "/"
    }
    const opt = {
        ...defaultOptions,
        ...options
    }
}

// 现在的方法 参数展开法
function ajax({ method = 'get', url = '/' } = {}) {
}