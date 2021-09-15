# 面试中遇到的 css 问题

## 元素 opacity 设置为 0，如何触发遮挡元素的事件？

答：对于FireFox或是Chrome等现代浏览器，则半透明覆盖下面的元素会被遮住，无法选择或点击。现代浏览器半透明覆盖无法穿透。此时，我们可以利用pointer-events:none的“幻影”特性，对半透明覆盖元素应 pointer-events:none声明使其可以鼠标穿透。

## 画一条0.5px 的线

一般使用 transform: scale(0.5) 缩放属性。

## 清除浮动的方法

```css
::after{
    content:' ';
    clear:both;
}
// 或者元素底部加 div, 样式设置 clear:both
// 父元素样式设置 overflow: hidden
```

### 父元素设置`overflow:hidden` 可以清除浮动的原理？

那是因为overflow:hidden属性相当于是让父级紧贴内容，这样即可紧贴其对象内内容（包括使用float的div盒子），从而实现了清除浮动。
