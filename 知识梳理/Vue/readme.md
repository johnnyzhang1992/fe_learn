# Vue 相关

## 项目实战问题

- [1、 vue 中样式表 scope 作用和原理](./scope.md)
- 2、 组件API 调用
- 3、组件的错误捕获

### 组件API的调用

```js
// Vue.extent(options)
// 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象；
let MessageConstructor = Vue.extend(Main);

const Message = function(options) {
    let instance;
    let instances = [];
    let seed = 1;

    let id = 'message_' + seed++;
    instance = new MessageConstructor({
        data: options
    });
    instance.id = id;
    // *** 一些options 默认熟悉的补充
    // 挂载到 body 上
    instance.$mount();
    document.body.appendChild(instance.$el);
}
```

### 组件的错误捕获

1、使用内置组件 ErrorBoundary 组件进行错误处理。
当ChildComponent中发生错误时，父组件可以通过errorCaptured生命周期方法捕获到错误，并进行相应处理。

2、使用try-catch 语句捕获异常

3、全局错误处理

通过 Vue.config.errorHanlder 配置全局错误处理函数。

```js
Vue.config.errorHandle  = function(err, vm, info) {
    // 处理错误
}
```

## 推荐相关学习资源

- [深入理解Vue.js实战]<https://godbasin.github.io/vue-ebook/vue-ebook>
