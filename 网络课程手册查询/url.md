## url

要完成一次请求和响应，首先需要让客户端找到服务器，不仅如此，还要找到服务器上我们想要的资源。

在现实生活中，如果我们要找一个人，我们可以通过一个地址来找到他。

<img src="http://mdrs.yuanjin.tech/img/20220415153102.png" alt="image-20220415153102596" style="zoom:50%;" />

和现实生活类似，在互联网中，我们可以通过一个叫 *url地址* 的东西找到我们想要的资源。

url全称uniform resource locator，统一资源定位符。它是一个字符串，用于表达互联网中某个资源的位置。

url地址示例：

- 百度首页的url地址：https://www.baidu.com/
- 某篇新闻页面的url地址：https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9610068257663826418%22%7D&n_type=-1&p_from=-1
- 某知名css的url地址：https://meyerweb.com/eric/tools/css/reset/reset.css
- 某知名js的url地址：https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
- 某张图片的url地址：https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F84%2F87%2F80%2F848780a296b66b382018fa7f675ecd06.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652600873&t=803c81d81387ec5f9fd1d92ba9d7665a

url地址可以很长，也可以很短。

通过url地址可以找到互联网上的资源，它可以是页面、图片、视频、音频、css代码、js代码、可供下载的文件、或者其他任何东西。

一个完整的url地址由多个部分组成

```
完整的url地址
协议 + 主机 + 端口 + 路径 + 参数 + hash
```

示例：

![image-20220415160543391](http://mdrs.yuanjin.tech/img/20220415160543.png)

### 协议 Protocal / Schema

它表示客户端希望用什么方式和服务器沟通，现在只需要知道这里固定写 http 或 https 即可

> 小知识：
>
> 1. 如果在浏览器的地址栏省略了协议，浏览器会自动为你补全
> 2. 可以在Chrome浏览器的地址栏点击右键，显示完整的地址
> 3. https 协议比 http 协议更安全，但往往出现在线上，本地的服务器通常不会是https

### 主机 Host

它表示客户端希望在哪台计算机上寻找资源

这里有两种写法：IP地址和域名

1. IP地址。IP地址是一个网络中计算机的唯一编号，通常，一个IP对应一台计算机。

   > 记住特殊IP地址： 127.0.0.1，它表示本机IP

2. 域名。域名类似IP地址的别名，把不容易记忆的数字变为容易记忆的单词。当使用域名访问时，会自动转换为IP地址。

   > 记住特殊域名：localhost，它表示的IP地址是 127.0.0.1

### 端口 Port

它表示客户端希望在哪个应用程序中寻找资源

每个服务器程序，都会监听一个或多个端口，只有找到对应的端口，才能找到这个服务器程序。

**端口号是可选的**，若不填写，则：

1. 如果使用的是http协议，默认端口号为80
2. 如果使用的是https协议，默认端口号为443

### 路径 Path

服务器上往往有许许多多的资源，每个资源都有自己的访问路径

**路径是可选的**，若不填写，则路径为 /

### 参数 Query / Param

某些资源可以根据需要呈现不同的内容，比如一篇新闻列表的页面，可以指定它呈现第几页的新闻，而「第几页」就属于一些额外信息，这些额外信息可以通过参数传递

比如，我们访问一个新闻列表的页面，同时希望它展示第5页，每页展示10条新闻，我们**可能**得到下面的url地址：

```
http://duyiedu.com/news?page=1&limit=10
```

上面这个url地址中，`page=1&limit=10`就是参数部分，这部分可以包含多个参数，不同的参数之间使用`&`符号分割

**参数是可选的**

### hash

在网络通信中，hash没有什么用，它往往作为浏览器的锚链接出现。

### 作业

1. 写出下面url地址中每部分的值

   - http://www.duyiedu.com
   - http://news.baidu.com/guonei
   - https://baijiahao.baidu.com/s?id=1730140517646479713&wfr=spider&for=pc

2. 根据下面的需求，写出url地址

   本地有一个服务器应用正在运行，它监听了5500端口，在根路径下访问index.html可以得到首页的内容。

   请写出首页完整的url地址

3. 阅读下面接口文档地址的内容，写出对应的url地址

   - [省市区接口](https://mock.duyiedu.com/project/72/interface/api/132)
   - [热门电影接口](https://mock.duyiedu.com/project/72/interface/api/234)，得到第7页，每页22条数据