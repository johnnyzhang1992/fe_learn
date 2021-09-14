# 面试中遇到的 css 问题

## 元素 opacity 设置为 0，如何触发遮挡元素的事件？

答：对于FireFox或是Chrome等现代浏览器，则半透明覆盖下面的元素会被遮住，无法选择或点击。现代浏览器半透明覆盖无法穿透。此时，我们可以利用pointer-events:none的“幻影”特性，对半透明覆盖元素应 pointer-events:none声明使其可以鼠标穿透。
