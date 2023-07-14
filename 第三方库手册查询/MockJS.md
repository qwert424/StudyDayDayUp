
# MockJS

> 官网：http://mockjs.com/
>
> CDN：https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.0/mock-min.js

MockJS有两个作用：

1. 产生模拟数据
2. 拦截Ajax

下面两张图说明MockJS的作用

![image-20210524134909296](http://mdrs.yuanjin.tech/img/20210524134909.png)

![image-20210524135812109](http://mdrs.yuanjin.tech/img/20210524135812.png)

## 仅模拟数据

```js
Mock.mock(数据模板)
```

数据模板有其特有的书写规范，具体写法见官网

## 拦截+模拟数据

```js
Mock.mock(要拦截的url, 要拦截的请求方法, 数据模板)
```

更多用法见官网

**注意，MockJS拦截数据的原理是重写了XHR，因此它仅能拦截XHR的数据请求，而无法拦截使用`fetch `发出的请求**

具体的，MockJS可以拦截：

- 原生`XmlHttpRequest`
- `jQuery`中的`$.ajax`
- `axios`

MockJS可以模拟网络延时，用法为：

```js
Mock.setup({
  timeout: 400 // 网络延时400毫秒
})

Mock.setup({
  timeout: '200-600' // 网络延时200-600毫秒
})
```

