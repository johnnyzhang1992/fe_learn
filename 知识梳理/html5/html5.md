# HTML5 相关

## 一、W3C对HTML5的需求整体原则

> - 新特性应该基于 HTML、CSS、DOM 以及 JavaScript。
> - 减少对外部插件的需求（比如 Flash）
>    更优秀的错误处理
> - 更多取代脚本的标记
> - HTML5 应该独立于设备
> - 开发进程应对公众透明

## 二、什么是HTML

- HTML是创建网页的标准标记语言
- HTML描述了使用标记的网页结构
- HTML元素由标签显示
- 浏览器不会显示HTML标签，而是使用它们呈现页面的内容

## 三、DOCTYPE声明

```html
<!Doctype html>
```

## 四、字符编码声明

```html
<meta charset="UTF-8">   //不写的话HTML5默认也是UTF-8
```

- 一键生成的网页结构：

```html
<!DOCTYPE html> //
<html>
<head>
<meta charset="UTF-8">    //
<title>标题</title>
</head>
<body>
内容
</body>
</html>
```

## 五、新增的语义/结构化标签 Semantic

| 标签                              | 标签                                     |
| --------------------------------- | ---------------------------------------- |
| <article>文档中定义文章内容       | <aside>                                  |
| <details>                         | <dialog>                                 |
| <figcaption>                      | <figure> img和figcaption组合放在figure里 |
| <footer> 一个文档可以有多个footer | <header>一个文档可以有多个header         |
| <main>                            | <mark>                                   |
| <nav> 导航                        | <section> 在文档中定义部分               |
| <summary>                         | <time>                                   |

```html
<figure>
//img和figcaption可以组合放在figure里
  <img src="pic_mountain.jpg" alt="The Pulpit Rock" width="304" height="228">
  <figcaption>Fig1. - The Pulpit Rock, Norway.</figcaption>
</figure>
```

## 六、HTML4 到HTML5语义化标签迁移

| HTML4                       | HTML5     |
| --------------------------- | --------- |
| <div id="header"></div>     | <header>  |
| <div id="menu"></div>       | <nav>     |
| <div id="content"></div>    | <section> |
| <div class="article"></div> | <article> |
| <div id="footer"></div>     | <footer>  |

- 这也是为什么识别不了的元素通过 HTML5Shiv自动转换识别啦

## 七、新增的input类型和属性

| 类型type       | 属性attribute    |
| -------------- | ---------------- |
| color          | autocomplete     |
| date           | autofocus        |
| datetime       | form             |
| datetime-local | formaction       |
| email          | formenctype      |
| month          | formmethod       |
| number         | formnovalidate   |
| range          | formtarget       |
| search         | height and width |
| tel            | list             |
| search         | min and max      |
| time           | pattern(regexp)  |
| url            | placeholder      |
| week           | required         |
|                | step             |
|                | mutiple          |
| 其他           | 其他             |

## 八、新的图形标签

### SVG

- 代表可缩放矢量图形
- SVG用于为Web定义图形
- SVG是W3C的建议

### SVG与Canvas区别

- SVG适用于描述XML中的2D图形的语言
- Canvas随时随地绘制2D图形(使用JavaScript)
- SVG是基于XML的，这意味着每个元素在SVG DOM中都可用。你可以为每个元素添加JavaScript事件处理程序
- 在SVG中，每个绘制的形状都会被记忆为一个对象。如果SVG对象的书香发生变化，浏览器可以自动重新渲染形状。
- Canvas是一像素一像素地渲染。在画布中，一旦图形绘制好了，就会被浏览器遗忘。如果你想改变某一个的位置，整个场景都需要重新绘制，包括可能已经被图形覆盖的任何对象。

| Canvas                                                       | SVG                                                   |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| 与分辨率相关(可以理解为位图，图形放大会失真看到一个个像素点) | 与分辨率无关(可以理解为矢量，图形放大不会失真)        |
| 不支持事件处理程序                                           | 支持事件处理程序                                      |
| 文字呈现功能比较简单                                         | 最适合具有大型渲染区域地应用程序(如Google地图)        |
| 可以将生成的图像保存为.png或.jpg                             | 如果复杂地话渲染速度慢(其实任何使用DOM的东西都会很慢) |
| 非常适合图形密集性游戏                                       | 不适合游戏应用程序                                    |

```
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>   //描边绿色，填充黄色的圆，半径40px
<canvas id="myCanvas" width="200" height="100"></canvas> //通过脚本(通常是JavaScript) 动态绘制图形
```

- 你以为下面的美图是jpg,png吗，Come on babe，用svg几段代码搞定，才只占几k内存!
- 总有一天，你也会轻轻松松几行代码画出优美的艺术

- 没事，近期正在钻研SVG，有合适的demo我会集中起来发文，记得常来看看寡人~

## 九、新的多媒体标签

| video  | audio |
| ------ | ----- |
| source | embed |
| track  |       |

```html
<audio controls>
<!--source多配合audio video内部标签使用 -->
   <source src="horse.ogg" type="audio/ogg">
 你的浏览器不支持音频文件 
</audio> 

<track kind="subtitles" src="subs_chi.srt" srclang="zh" label="Chinese">
<!--主浏览器都不支持，track目前不用深究-->

<!--标签定义嵌入的内容，比如插件-->
<embed src="" />
```

## 十、新的HTML5的API

> - (Application Programming Interface)--应用程序编程接口

- HTML Geolocation 地理位置
- HTML Drag & Drop拖放
- HTML Local Storage 本地存储
- HTML Application Cache 应用程序缓存
- HTML Web Workers web工作者
- HTNL SSE

## 十一、浏览器的支持度

- 所有现代浏览器都支持HTML5
- 另外，对于新旧浏览器，无法识别的元素，作为内联自动处理

## 十二、语义元素转换为块元素

- HTML5新定义了8个新的语义化元素，全都是块元素
- 如果像确保新老浏览器都支持，我们可以手动设置CSS样式

```css
header, section, footer, aside, nav, main, article, figure {
    display: block; 
}
```

## 十三、可以自定义标签名字

- 自定义标签和style样式

```css
<style>
    display: block;
    width: 400px;
    height: 300px;
    background: lightpink;
    margin-left: 100px;
    margin-top: 100px;
    font-size: 30px;
    text-align: center;
    line-height: 300px;
    color: green;
</style>

<body>
<aaa> //随便取的标签名字，你开心不就好啦~
    你好，我是Amelia
</aaa>
</body>
```

## 高能预警：傻缺IE8(及以前)不允许未知元素

- [HTML5Shiv](http://www.bootcdn.cn/html5shiv/)是一个针对 IE 浏览器的 HTML5 JavaScript 补丁，目的是让 IE 识别并支持 HTML5 元素。
- HTML5Shiv包裹在<head>元素里，
- 是一个js外部文件
- 在使用HTML5新元素就可以引入它了

```html
<head>
// 下面是HTML的条件注释判断。只给懂的人...呸、浏览器看
  <!--[if lt IE 9]>
    <script src="/js/html5shiv.js"></script>
  <![endif]--> 
</head>

<body>
<!-- HTML5标签-->
<section>
<h1>Famous Cities</h1>
<article>
<h2>London</h2>
<p>London is the capital city of England. It is the most populous city in the United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
</article>
</section>
</body>
```

## 十四、HTML5删除/废弃不能用的元素

| 删除的元素                                                   | 被以下替代          |
| ------------------------------------------------------------ | ------------------- |
| <acronym> 首字母缩写                                         | <abbr>              |
| <applet>                                                     | <object>            |
| <basefont> 页面上默认字体颜色和字号                          | CSS样式             |
| <big> 更大的文本                                             | CSS样式             |
| <center> 文本水平居中                                        | CSS样式             |
| <dir> 目录列表                                               | CSS样式             |
| <font> 字体外观，尺寸，颜色                                  | CSS样式             |
| <frame> 定义子窗口                                           |                     |
| <frameset> 定义框架集                                        |                     |
| <noframes> 向浏览器显示无法处理框架的提示文本，位于frameset元素中 |                     |
| <strike> 文本添加删除线                                      | CSS样式，<s>或<del> |
| <tt> 定义打字机文本                                          | CSS样式             |

```html
<acronym title="World Wide Web">WWW</acronym> //换成了abbr
<basefont color="red" size="5" />  //CSS样式替代
<frame></frame>
<frameset></frameset> //该标签对网页可用性的负面影响
```

## 十五、其他细节

- 闭合标签，双标签不写那个闭合的标签不会出现解析错误，但是建议闭合

```html
<section>
  <p>This is a paragraph.  //没有</p>
  <p>This is a paragraph.
</section>
```

- 单标签元素建议加 /来闭合；但在XHTML和XML文档中是必须要加的

```html
<meta charset="utf-8">
<meta charset="utf-8" />  //两个都行
```

- HTML5元素命名 & class等属性名允许混合使用大写和小写字母，但建议用小写
  - 1.混合使用本身就不符合命名习惯
  - 2.视觉更干净
  - 3.小写更容易编写
- 引号括起来的属性现在允许去掉，下面的例子都不会报错，

```html
<table class="striped">  //建议用
<table class=striped>  //不建议用
<table class=table striped>  //更不建议用
```

- 在HTML5标准里，<html>,<body>,<header>标签甚至是可以省略的，但不建议哦~

```html
<!DOCTYPE html>
<head>
  <title>Page Title</title>
</head>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>
```

- HTML5通过meta标签达到监听并适配设备屏幕的布局

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- 扩展名.html和.htm的差异：

  - 解析方面是没有区别的。任何浏览器Wen服务器都会将它们视为HTML
  - 两者的差异体现在文化发展层面：

  ```html
  .htm 可以察觉早期讲扩展名限制为3个字符的DOS系统
  .html 不会特定去识别Unix操作系统的这个扩展名字符限制
  ```

  - 技术层面的差异：

- 当URL没有指定文件名时(比如：<https://www.w3schools.com/css/)，服务器将返回默认的文件名，通用的默认文件名是：index.html、index.htm、default.html、和default.html>
- 但如果你的服务器仅配置了“index.html”作为默认文件名，那么你的文件就必须命名index.html，不能用index.htm
- 不过服务器可以配置多个默认的文件名，所以你可以根据需要设置多个默认文件名
- 总而言之，HTML文件的完整扩展名是.html，我们没有理由不用它啊~~~
