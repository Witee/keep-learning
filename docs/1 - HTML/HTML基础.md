# HTML基础

#### 结构
  ```
    <!DOCTYPE html>
    <html lang="zh-Hans">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>

    </body>
    </html>
  ```

#### 基础元素

  - `<!-- ... -->`: 注释
  - `<html>`: 根元素
  - `<head>`: 页头; 包含`title`, `base`, `link`, `style`, `script`, `meta`
  - `<title>`: 页面标题
  - `<body>`: 页面主体
  - `<style>`: 引入样式
  - `<h1>` 到 `<h6>`: 标题一到标题六
  - `<p>`: 段落
  - `<br>`: 换行
  - `<hr>`: 水平线
  - `<div>`: 节
  - `<span>`: 节（不换行）

  ```
    &lt; 可以显示 < （小于号）; &gt; 可以显示 > （大于号）
    <p>空&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</p>
  ```

#### 文本格式化元素

  - `<b>`: 粗体
  - `<i>`: 斜体
  - `<em>`: 强调
  - `<strong>`: 强调（重要的文本）
  - `<small>`: 小号字体
  - `<big>`: 大号字体
  - `<sup>`: 上标
  - `<sub>`: 下标
  - `<bdo>`: 文本显示的方向;`dir="ltr"`从左向右; `dir="rtl"` 从右向左
  - `s`: 删除线(一般使用CSS的`text-decoration:line-through`实现，极少使用`s`)
  - `u`: 下划线(一般使用CSS的`text-decoration:underlne`实现)

#### 语义相关元素

  - `<abbr>`: 缩写; `title` 属性指定所代表的全称
    ```
      <abbr title="Limited">Ltd.</abbr>
    ```
  - `<address>`: 地址
  - `<blockquote>`: 长的带换行的引用文本，使用缩进方式显示; `cite` 属性指定引用文本的URL
  - `<q>`: 短的不换行的引用文本; 全自动添加引号
  - `<cite>`: 作品（书、电影、歌曲）
  - `<code>`: 代码
  - `<dfn>`: 专业术语
  - `<del>`: 被删除的文本
  - `<ins>`: 插入的文本; 属性`cite`值为URL，插入、删除的原因; 属性`datetime`: 插入、删除的时间
  - `<pre>`: 预格式化
  - `<samp>`: 示范文本
  - `<kbd>`: 键盘文本，表示由键盘数据的文本
  - `<var>`: 变量

#### 超链接和锚点 `<a.../>`

  - `href`: 所关联的资源
    ```
      <body>
    		<h2 id="top">顶部</h2>
    		<p><a href="#bottom">链接到页面下部</a></p>
    		<p><a href="#top">链接到页面上部</a></p>
            <h2 id="bottom">底部</h2>
      </body>
    ```

  - `target`: 指定装载框架: `_self` 自身; `_blank` 新窗口; `_top` 顶层框架; `_parent` 父框架
  - `media`: 目标URL的媒体类型，默认为 all，只有指定href后才有效(H5新增)

#### 列表相关元素

  - `<ul>`: 无序列表，只能包含`<li .../>`

  - `<ol>`: 有序列表，只能包含`<li .../>`，H5添加了三个属性
    - `start`: 指定起始数字。默认是第一个，如1、A等
    - `type`: 指定编号类型。1代表数字，Aa代表字母，l、i代表罗马数字； H5中不推荐使用type属性，使用CSS来定义。

  - `<li>`: 项目列表

  - `<dl>`: 定义性列表，只能包含`<dt.../>`和`<dd.../>`
  - `<dt>`: 标题列表项
  - `<dd>`: 普通列表项

#### 图像相关元素 `<img.../>`

  - `src`: 图像的文件地址
  - `alt`: 图片显示不出来时的提示文字
  - `title`: 鼠标移到图片上的提示文字
  - `height`: 高度，可以为百分比或像素
  - `width`: 宽度，可以为百分比或像素

  三种图像格式：
  - 位图: 又称为点阵图像，是由像素的单个点组成的，通常分为8位、16位、24位和32位，8位表示有2<sup>8</sup>（256）种颜色，通常使用24位（真彩色，1600万种颜色，是为眼分辨极限）
    - JPG: 可以很好的处理大面积色调的图像，如相片、网页中一般的图片
    - PNG: 格式图片体积小，而且无损压缩，能保证网页的打开速度。最重要的是.PNG格式支持透明信息(即图像可以浮现在其他页面文件或页面图像之上)。PNG格式可以称为"网页设计专用格式"
    - GIF: 图像效果并，但可以制作动画

  - 矢量图: 又称向量图。是计算机图形学中用点、直线或多边形等基于数学方程的几何图元表示的图像。优点是无论放大、缩小或旋转，图像都不会失真；缺点是难以表现色彩层次丰富的逼真图像。主要用于印刷行业。

  - 区别：
    - 位图受分辨率的影响，而矢量图不受影响。因此，当图片放大时，位图清晰度分变低，矢量图不变
    - 位图的组成单位是"像素"，而矢量图的组成单位是"数学向量"
    - 位图用于色彩丰富的图片，而矢量图不适用
    - 位图常用于网页中的照片等，容量较大；矢量图常用于印刷行业、网页logo或矢量插图

#### 表格相关元素

  - `<table>`: 表格
    - `cellpadding`: 指定单元格内容和单元格边框之间的间距
    - `cellspacing`: 指定单元格之间的间距
    - `width`: 表格的宽度
  - `<caption>`: 表格标题
  - `<tr>`: 行，只能包含`<td.../>`或`<th.../>`
  - `<td>`: 单元格
    - `colspan`: 单元格跨多少列，值为数字
    - `rowspan`: 单元格横跨多少行
    - `height`: 高度
    - `width`: 宽度
  - `<th>`: 表格页眉
  - `<tbody>`: 表格主体，只能包含`<tr.../>`
  - `<thead>`: 表格头
  - `<tfoot>`: 表格脚

#### HTML5 新增的通用属性

  - `contentEditable`: 如果设置为 true，则允许直接编辑HTML元素内容，子元素会继承父元素此属性
  - `designMode`: 相关于全局的`contentEditable`，值为 `on`或 `off`
  - `hidden`: 是否显示组件，值为`true`或`false`
  - `spellcheck`: 单词拼写检查，为`<input.../>`、`<textarea.../>`等增加了 `spellcheck`属性，值为`true`、`false`

#### HTML5 新增的常用元素

  - `<article>`: 独立、完整的“文章”，可包含:
    - `<header.../>`: 标题
    - `<footer.../>`: 脚注
    - `<section.../>`: 段落
    - `<article.../>`: 附属文章
  - `<section>`: 内容分块，可包含：
    - 标题，由`h1~h6`组成
    - `<article.../>`
    - `<section.../>`
  - `<nav>`: 导航条
  - `<aside>`: 侧边栏
  - `<header>`: 主要用于为`<article.../>`定义文章头部，可包含`h1~h6`等
  - `<hgroup>`: 用于组织多个`h1~h6`这样的标题元素，当`<header.../`需要包含多个标题元素时，可能使用
  - `<footer>`: 主要为`<article.../>`定义脚注
  - `<figure>`: 表示独立的图片区域，可包含多个`<img.../>`
  - `<figcaption>`: 放在`<figure.../>`内部，表示标题

  - `<mark>`: 用于显示页面中重点关注的内容
  - `<time>`: 表示内容为时间： `<time datetime="17:30">下午5点半</time>`
    - `datetime`: 指定时间，格式: `yyyy-MM-ddTHH:mm` 或部分

  - `<meter>`: 表示一个已知最大和最小值的计数仪表
    - `value`: 计数仪表的当前值。默认为0
    - `min`: 最小值，默认为0
    - `max`: 最大值，默认为1
    - `low`: 仪表指定范围的最小值，必须存在于等于 min
    - `high`: 仪表指定范围的最大值，必须小于等于max
    - `optimum`: 仪表有效范围的最佳值。如果存在于high表示越大越好；如果小于low表示越小越好
    - `<progress>`: 进度条
      - `max`: 完成时的值
      - `value`: 当前值

#### HTML5 头部和元信息 `<head.../>`

  - `<script>`: 包含`JavaScript`脚本

    ```
      <script type="text/javascript" > ... </scripy>
      <script src="http://xxx.com/x.js" > ... </scripy>
    ```

  - `<style>`: 定义内部CSS样式

    ```
      <style type="text/css"> ... </style>
    ```

  - `<link>`: 链接外部CSS样式等资源

    ```
      <head>
        <link rel="stylesheet" type="text/css" href="style.css" />
        <style type="text/css">@import url(http://www.dreamdu.com/style.css);</style>
      </head>
    ```

  - `<title>`: 文档标题

  - `<base>`: 页面中所有链接的基准链接，必须是空元素，包含属性：
    - `href`: 所有链接的基准链接
    - `target`: 指定超链接默认在哪个窗口打开

  - `<meta>`: 元数据，包含属性：
    - `http-equiv`: 元信息的名称，具有特殊意义，帮助浏览器正确处理网页内容
    - `name`: 元信息名称，可随意指定

        name 标签的常用值：
        - `keyword`: 网页的关键字
        - `description`: 网页的描述
        - `author`: 作者
        - `copyright`: 版权信息

    - `content`: 指定元信息的值

      ```
        <meta name="author" content="Witee" />
      ```

    - `Expires`: 网页过期时间

      ```
        <meta http-equiv="Expires" content="Sat Sep 27 16:12:36 CST 2008" />
      ```

    - `Pragma`: 禁止浏览器从本地磁盘缓存调阅页面内容，禁止脱机访问

      ```
        <meta http-equiv="Pragma" content="no-cache" />
      ```

    - `Refresh`: 多长时间后自动刷新页面

      ```
        <meta http-equiv="Refresh" content="2" /> <!-- 2秒刷新本页面 -->
        <meta http-equiv="Refresh" content="2; URL=http://www.baidu.com" /> <!-- 2秒跳转至指定网址 -->
      ```

    - `Set-Cookie`: 设置Cookie。如果网页过期，客户端上的Cookie也将被删除

      ```
        <meta http-equiv="Set-Cookie" content="name=value a=b" />
      ```

    - `content-Type`: 页面内容类型和所用的字符集

      ```
        <meta http-equiv="Content-Type" content="text/html; charset=GBK" />
      ```

#### HTML5 表单

  - form 标签属性
    - `name`: 表单名称，以便区分

      ```
        <form name="myForm"> ... </form>
      ```

    - `action`: 指定提交到哪个地址进行处理

      ```
        <form action="mailto:aaa@bbb.com"> ... </form>
      ```

    - `method`: 传送方法
      - `get`: 默认值，安全性差
      - `post`: 数据包含在表单主体中，常用

    - `target`: 目标显示方式
      - `_self`: 默认值，在当前窗口打开页面
      - `_blank`: 新窗口
      - `_parent`: 父级窗口
      - `_top`: 页面载入到包含该链接的窗口，取代当前在窗口中的所有页面

    - `enctype`: 信息提交的编码方式
      - `application/x-www-form-urlencoded`: 默认的编码方式
      - `multipart/form-data`: MIME编码，对于“上传文件”必须选择该值


  - 表单对象:

    是指放在`<form></form>`标签内的各种标签，表单对象有四种：`input`、`textarea`、`select`、和`option`，表单标签只有四个: `<input>`、`<textarea>`、`<select>`、和`<option>`。

    - `input`: `<input type="表单类型" />`
      - `text`: 文本框; 属性包含: `value`: 默认值; `size`: 文本框长度; `maxlength`: 最多可输入的字符数
      - `password`: 密码；属性同 `text`
      - `radio`: `name`和`value`必须设置；如果需要互斥，则`name`需要相同
      - `checkbox`: 属性为`value`和`checked`
        ```
          <label>
            <input type="checbox" value="值" checked="checked" /> 苹果
          </label>
        ```

      - 按钮:
        - 普通按钮`button`: `<input type="button" value="普通按钮" onclick="alert('click')"/>`
        - 提交按钮`submit`
        - 重置按钮`reset`

      - `image`: 图片域: `<input type="image" src="imgs/login.jpg" />`

      - `hidden`: 隐藏域: `<input type="hidden" value="10" />`

      - `file`: 文件域:
        ```
          <form name="form1" method="post" action="index.html" enctype="multipart/form-data" >
            <input type="file" />
          </form>
        ```

    - `textarea`: 多行文档框 `<textarea rows="行数" cols="列数">多行文本框内容</textarea>`

    - `select`: 下拉列表
      ```
        <select>
          <option>选项1</option>
          ...
          <option>选项n</option>
        </select>
      ```
      - `multiple`: 默认只能选择一项，值为`multiple`时可多选；操作为"Ctrl+鼠标左键"
      - `size`: 下拉列表展开之后可见列表项的数目

    - `option`: 下拉列表项
      - `value`: 值
      - `selected`: 是否选中
      ```
        <select multiple="multiple" size="5">
          <option value="值1" selected="selected">选中的内容</option>
          ...
          <option value="值2">显示的内容</option>
        </select>
      ```

#### 其它
  - `link` 与 `@import` 区别

    本质上，这两种方式都是为了加载CSS文件，但还是存在着细微的差别

    - 差别1：

      老祖宗的差别。`link`属于XHTML标签，而`@import`完全是CSS提供的一种方式。

      `link`标签除了可以加载CSS外，还可以做很多其它的事情，比如定义RSS，定义rel连接属性等，`@import`就只能加载CSS了。

    - 差别2：

      加载顺序的差别。当一个页面被加载的时候（就是被浏览者浏览的时候），`link`引用的CSS会同时被加载，而`@import`引用的CSS会等到页面全部被下载完再被加载。所以有时候浏览`@import`加载CSS的页面时开始会没有样式（就是闪烁），网速慢的时候还挺明显（梦之都加载CSS的方式就是使用`@import`，我一边下载一边浏览梦之都网页时，就会出现上述问题）。

    - 差别3：

      兼容性的差别。由于`@import`是CSS2.1提出的所以老的浏览器不支持，`@import`只有在IE5以上的才能识别，而`link`标签无此问题。

    - 差别4：

      使用dom控制样式时的差别。当使用javascript控制dom去改变样式的时候，只能使用`link`标签，因为`@import`不是dom可以控制的。
      从上面的分析来看，还是使用`link`标签比较好。

      标准网页制作加载CSS文件时，还应该选定要加载的媒体（media），比如screen，print，或者全部all等。这个我到CSS高级教程中再给大家介绍

    - 差别5：

      `@import`可以在css中再次引入其他样式表，比如可以创建一个主样式表，在主样式表中再引入其他的样式表，如：

      ```
        main.css
        ———————-
        @import “sub1.css”;
        @import “sub2.css”;

        sub1.css
        ———————-
        p {color:red};

        sub2.css
        ———————-
        .myclass {color:blue}
      ```
      这样更利于修改和扩展

      这样做有一个缺点，会对网站服务器产生过多的HTTP请求，以前是一个文件，而现在却是两个或更多文件了，服务器的压力增大，浏览量大的网站还是谨慎使用。有兴趣的可以观察一下像新浪等网站的首页或栏目首页代码，他们总会把css或js直接写在html里，而不用外部文件。

  - HTML5 文档类型和字符集
    - `<!doctype html>`
    - `<meta charset=”UTF-8″>`


  - HTML5 存储类型有什么区别

    HTML5 能够本地存储数据，在之前都是使用 `cookies` 使用的。HTML5 提供了下面两种本地存储方案：

    `localStorage` 用于持久化的本地存储，数据永远不会过期，关闭浏览器也不会丢失。
    `sessionStorage` 同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此`sessionStorage`不是一种持久化的本地存储，仅仅是会话级别的存储
