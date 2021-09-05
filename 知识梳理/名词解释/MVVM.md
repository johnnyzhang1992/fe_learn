## MVVM

MVVM：Model-View-ViewModel （MVVM 是一种架构模式，也被称为 model-view-binder。）

双向绑定。

MVVM 与其他两种架构的对比：

-  MVVM：VM 在 UI 层之下。VM 为 view 暴露数据和方法，VM 推送数据到在它之下的 model。
  
-  MVC：view 层在结构顶层，controller 在 view 之下。model 在 controller 之下。view 指向 controller，controller 指向 model。model 更改时 view 会得到提醒（这个情况是一个单向流）。
  
-  MVP：controller 替换为 presenter。presenter 与 view 平起平坐。presenter 监听 view 和 model 的事件，作为中间人在他们之间调解两边的事件，辅助两边交流。

对于微信小程序 ：

view: wxml 文件; Model : page 里面的data ; ViewModel: page 里面的方法。

Model 保存数据; ViewModel 与服务端交互获取数据更新 Model 并且 双向绑定 View ,根据 Model 的变化更改 view, 同时 view 改变时会触发 viewModel 的方法，去改变Model。

MVC 和 MVP

![](/Users/johnnyzhang/Documents/markdown/学习部分/assets/v2-8917a670f4a9cffb5fea31051a72c65c_b.jpg)

​    ![](assets/20180307154352565.png)

​    MVVM与MVC最大的区别就是：它实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变。非常的神奇~

