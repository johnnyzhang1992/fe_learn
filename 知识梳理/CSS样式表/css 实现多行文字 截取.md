单行文本截断 text-overflow 文本溢出我们经常用到的应该就是 text-overflow: ellipsis 了，相信大家也很熟悉，只需轻松几行代码就可以实现单行文本截断。

```
div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

**-webkit-line-clamp 实现**

先介绍第一种方式，就是通过 -webkit-line-clamp 属性实现。具体的方式如下：

```css
div {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

它需要和 display、-webkit-box-orient 和 overflow 结合使用：

display: -webkit-box; 必须结合的属性，将对象作为弹性伸缩盒子模型显示。
 -webkit-box-orient; 必须结合的属性，设置或检索伸缩盒对象的子元素的排列方式。
 text-overflow: ellipsis; 可选属性，可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本。

但是缺点也是很直接，因为 -webkit-line-clamp 是一个不规范的属性，它没有出现在 CSS 规范草案中。也就是说只有 webkit 内核的浏览器才支持这个属性，像 Firefox, IE 浏览器统统都不支持这个属性，浏览器兼容性不好。

使用场景：多用于移动端页面，因为移动设备浏览器更多是基于 webkit 内核，除了兼容性不好，实现截断的效果不错。



**定位元素实现多行文本截断**

另外还有一种靠谱简单的做法就是设置相对定位的容器高度，用包含省略号(…)的元素模拟实现，实现方式如下：

```css
p {
    position: relative;
    line-height: 18px;
    height: 36px;
    overflow: hidden;
  	word-break: break-all; 使一个单词能够在换行时进行拆分。
}
p::after {
    content:"...";
    font-weight:bold;
    position:absolute;
    bottom:0;
    right:0;
    padding:0 20px 1px 45px;
    /* 为了展示效果更好 */
    background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), to(white), color-stop(50%, white));
    background: -moz-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: -o-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: -ms-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
}
```

实现原理很好理解，就是通过伪元素绝对定位到行尾并遮住文字，再通过 overflow: hidden 隐藏多余文字。

基本原理就是这样，我们可以将浅蓝色区域想象成标题，黄色区域想象为省略号效果。那么你可能会觉得粉色盒子占了空间，那岂不是标题会整体延后了吗，这里可以通过 margin 的负值来出来，设置浅蓝色盒子的 margin-left 的负值与粉色盒子的宽度相同，标题也能正常显示。

那么我们将前面的 DOM 结构简化下，变成下面这样：

```
<div class="wrap">
  <div class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos labore sit vel itaque delectus atque quos magnam assumenda quod architecto perspiciatis animi.</div>
</div>
复制代码
```

刚才的粉色盒子和黄色盒子都可以用伪元素来代替。

```
.wrap {
    height: 40px;
    line-height: 20px;
    overflow: hidden;
}

.wrap .text {
    float: right;
    margin-left: -5px;
    width: 100%;
    word-break: break-all;
}

.wrap::before {
    float: left;
    width: 5px;
    content: '';
    height: 40px;
}

.wrap::after {
    float: right;
    text-align: right;
    content: "...";
    height: 20px;
    line-height: 20px;
    /* 为三个省略号的宽度 */
    width: 3em;
    /* 使盒子不占位置 */
    margin-left: -3em;
    /* 移动省略号位置 */
    position: relative;
    left: 100%;
    top: -20px;
    padding-right: 5px;
    /* 显示更好的效果 */
    background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), to(white), color-stop(50%, white));
    background: -moz-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: -o-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: -ms-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
}
```

