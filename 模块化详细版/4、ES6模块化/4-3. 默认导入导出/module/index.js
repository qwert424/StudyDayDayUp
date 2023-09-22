// import data from "./a.js" //将a.js模块中的默认导出放置到常量data中
import data, { a, b } from "./a.js"
// import * as data from "./a.js";//默认导出就是data中的属性名default

console.log(data, a, b)

