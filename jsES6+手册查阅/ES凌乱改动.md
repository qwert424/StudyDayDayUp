# 零碎的改动

## 严格模式

此为ES5新增语法

参考：https://www.runoob.com/js/js-strict.html

参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode

## let 和 const

ES6建议不再使用`var`定义变量，而使用`let`定义变量，`const`定义常量

```js
let a = 1; // 使用 let 定义变量
a = 2; // 变量的值是可修改的

const b = 1; // 使用 const 定义常量
b = 2; // ❌ 报错，常量的值不可修改
```

**对于开发的影响：均使用const，实在需要修改变量，再改为let**

无论是let还是const，它们均解决了长久以来变量定义的问题，使用它们定义变量，具有以下特点：

- 全局定义的变量不再作为属性添加到全局对象中

- 在变量定义之前使用它会报错

- 不可重复定义同名变量

- 使用`const`定义变量时，必须初始化

- 变量具有块级作用域，在代码块之外不可使用

  注意，在for循环中使用let定义变量，变量所在的作用域是循环体，因此在循环外不能使用。另外，for循环会对该变量做特殊处理，让每次循环使用的都是一个独立的循环变量，这可以解决JS由来已久的问题。

  ```js
  // 过去的问题
  for(var i = 0; i < 3; i++){
    setTimeout(function(){
      console.log(i)
    }, 1000)
  }
  // 输出：3 3 3
  
  // 过去的解决办法：IIFE
  for(var i = 0; i < 3; i++){
    (function(i){
      setTimeout(function(){
        console.log(i)
      }, 1000)
    })(i)
  }
  // 输出：0 1 2
  
  // 现在的做法
  for(let i = 0; i < 3; i++){
    setTimeout(function(){
      console.log(i)
    }, 1000)
  }
  // 输出：0 1 2
  ```

## 幂运算

```js
2 ** 3  // 8
2 ** 4  // 16
```

## 字符串新增API

| API                                                          | 含义                         |
| ------------------------------------------------------------ | ---------------------------- |
| [String.prototype.includes(s)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes) | 字符串中是否包含某个子串     |
| [String.prototype.trim()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trim) | 去掉字符串首尾空白字符       |
| [String.prototype.trimStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimstart) | 去掉字符串开始的空白字符     |
| [String.prototype.trimEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimend) | 去掉字符串末尾的空白字符     |
| [String.prototype.replaceAll(s, t)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceall) | 将字符串中**所有**的s替换为t |
| [String.prototype.startsWith(s)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startswith) | 判断字符串是否以s开头        |
| [String.prototype.endsWith(s)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endswith) | 判断字符串是否以s结尾        |
|                                                              |                              |

## 模板字符串

ES6提供了一种新的字符串字面量的书写方式，即模板字符串，写法为

```js
`字符串内容`
```

模板字符串可以轻松的实现换行和拼接

```js
const user = { name: 'monica', age: 17 }
const s1 = `姓名：${user.name}，年龄：${user.age}
my name is ${user.name}`;
// 等同于
const s2 = '姓名：' + user.name + '，年龄：' + user.age + '\nmy name is ' + user.name

/* 
 * s1和s2均为：
 * 姓名：monica，年龄：17
 * my name is monica
 */
```

在需要换行或拼接时，模板字符串远胜于普通字符串

通常，我们可以使用模板字符串拼接html

```js
const user = { name: 'monica', age: 17 }
const html = `
<div>
	<p><span class="k">姓名</span><span class="v">${user.name}</span></p>
	<p><span class="k">年龄</span><span class="v">${user.age}</span></p>
</div>
`;
/* 
 * <div>
 *  <p><span class="k">姓名</span><span class="v">monica</span></p>
 *  <p><span class="k">年龄</span><span class="v">17</span></p>
 * </div>
 */
```

