# React 概述

> 官网：<https://zh-hans.reactjs.org/>
> 新版官网：<https://beta.reactjs.org/>

React 的核心思想是：封装组件。

各个组件维护自己的状态和 UI，当状态变更，自动重新渲染整个组件。

基于这种方式的一个直观感受就是我们不再需要不厌其烦地来回查找某个 DOM 元素，然后操作 DOM 去更改 UI。

React 大体包含下面这些概念：

- 组件
- JSX
- Virtual DOM
- Data Flow

## 组件

React 应用都是构建在组件之上。

上面的 `HelloMessage` 就是一个 React 构建的组件，最后一句 `render` 会把这个组件显示到页面上的某个元素 `mountNode` 里面，显示的内容就是 `<div>Hello John</div>`。

`props` 是组件包含的两个核心概念之一，另一个是 `state`（这个组件没用到）。可以把 `props` 看作是组件的配置属性，在组件内部是不变的，只是在调用这个组件的时候传入不同的属性（比如这里的 `name`）来定制显示这个组件。

## Virtual DOM

当组件状态 `state` 有更改的时候，React 会自动调用组件的 `render` 方法重新渲染整个组件的 UI。

当然如果真的这样大面积的操作 DOM，性能会是一个很大的问题，所以 React 实现了一个*Virtual DOM*，组件 DOM 结构就是映射到这个 Virtual DOM 上，React 在这个 Virtual DOM 上实现了一个 diff 算法，当要重新渲染组件的时候，会通过 diff 寻找到要变更的 DOM 节点，再把这个修改更新到浏览器实际的 DOM 节点上，所以实际上不是真的渲染整个 DOM 树。这个 Virtual DOM 是一个纯粹的 JS 数据结构，所以性能会比原生 DOM 快很多。

## Data Flow

“单向数据绑定”是 React 推崇的一种应用架构的方式。当应用足够复杂时才能体会到它的好处，虽然在一般应用场景下你可能不会意识到它的存在，也不会影响你开始使用 React，你只要先知道有这么个概念。

## 周边生态

- nextjs 一个用于构建 Web 应用程序的框架 <https://github.com/vercel/next.js>
- Ant Design: <https://ant.design/> 5.0
- Ant Design Mobile: <https://mobile.ant.design/>
- TDesign: <https://tdesign.tencent.com/react/getting-started> 1.0
- 服务端渲染框架：next.js (star:102K) <https://github.com/vercel/next.js>
- 跨端解决方案：taro（start:32.5K）<https://github.com/NervJS/taro>
- 开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发微信/京东/百度/支付宝/字节跳动/ QQ 小程序/H5/React Native 等应用。
- 构建原生应用：React Native（star: 108K） <https://github.com/facebook/react-native>
