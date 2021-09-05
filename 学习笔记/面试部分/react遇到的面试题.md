# React 面试相关

- 生命周期
- 新特性
- context
- 废弃的生命周期和新的方法，三废二新
- 异步 setState
- 父组件和子组件 componentDidMount 哪个县执行
- 高阶组件
- hooks

## setState

有两个参数，第一个参数可以是一个待更新数据组成的对象，也可以是一个函数，需要返回一个对象；第二个参数是修改后的回调。

异步（不保证是同步的）更新数据。**生命周期函数里面 setTimeout 内部是同步的**

是否异步，取决于出发 setState 的时间是否可以被 React.js 监听。如果可以被监听那么，可能会被 batch update.

若是在 timer 内部触发的，那不会被监听，会同步执行。

> If it was triggered by some event that ReactJS can monitor, such as an onClick props-based handler, then ReactJS can batch the updates, to the state, at the end of the event. If the state change was triggered by a timer or some other developer-orchestrated event handler, however, then ReactJS can't batch the updates and has to mutate the state immediately.

```js
     componentDidMount() {
        // console.log(this.state.value))
        this.setState(() => (
             {
                value: "test1"
            } ),
            () => {
                console.log(this.state.value);//test2
            }
        );
        this.setState(()=>({
            value: "test2"
        }),
            () => {
                console.log(this.state.value);//test2
            }
        );
        setTimeout(() => {
            this.setState(() => (
                {
                   value: "test3"
               } ),
               () => {
                   console.log(this.state.value);//test3
               }
           );
           this.setState(()=>({
               value: "test4"
           }),
               () => {
                   console.log(this.state.value);// test4
               }
           );
        },0)
    }
```

## 三废俩新生命周期函数

[React V16.x 生命周期调整](https://www.cnblogs.com/cag2050/p/9692757.html)

- 旧声明周期：

| 生命周期                 | 属于阶段                                     | 调用次数              | 是否可以 setState              | 作用                                                                                                                                                                                                   |
| ------------------------ | -------------------------------------------- | --------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| getDefaultProps          | 创建阶段（Mounting）                         | 1 次（全局调用 1 次） | 不可以                         |                                                                                                                                                                                                        |
| getInitialState          | 创建阶段（Mounting）                         | 1 次                  | 不可以                         |                                                                                                                                                                                                        |
| componetWillMount        | 创建阶段（Mounting）                         | 1 次                  | 可以；不会触发 re-render       |                                                                                                                                                                                                        |
| render                   | 创建阶段（Mounting） 和 更新阶段（Updating） | >=1 次                | 不可以                         |                                                                                                                                                                                                        |
| componentDidMount        | 创建阶段（Mounting）                         | 1 次                  | 可以；触发 re-render，影响性能 |                                                                                                                                                                                                        |
| componetWillReceiveProps | 更新阶段（Updating）                         | >=0                   | 可以                           |                                                                                                                                                                                                        |
| shouldComponentUpdate    | 更新阶段（Updating）                         | >=0                   | 不可以                         | 该方法通过返回 true 或者 false 来确定是否需要触发新的渲染。返回 false， 则不会触发后续的 UNSAFE_componentWillUpdate()、render() 和 componentDidUpdate()（但是 state 变化还是可能引起子组件重新渲染）。 |
| componentWillUpdate      | 更新阶段（Updating）                         | >=0                   | 不可以                         |                                                                                                                                                                                                        |
| componentDidUpdate       | 更新阶段（Updating）                         | >=0                   | 可以；触发 re-render，影响性能 |                                                                                                                                                                                                        |
| componentWillUnmount     | 卸载阶段（Unmounting）                       | 1 次                  | 不可以                         |                                                                                                                                                                                                        |

- 新声明周期：

| 生命周期                 | 属于阶段                                                                                                                         | 是否可以 setState | 作用                                                                                  |     |     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------- | --- | --- |
| getDerivedStateFromProps | 当创建时、接收新的 props 时、setState 时、forceUpdate 时会执行                                                                   |                   | 注意：v16.3 版本 setState、forceUpdate 时不会执行这个方法，v16.4 版本修复了这个问题。 |     |     |
| getSnapshotBeforeUpdate  | 替换 componentWillUpdate，会在 update 后 DOM 更新前被调用，用于读取最新的 DOM 数据，返回值将作为 componentDidUpdate 的第三个参数 |                   |                                                                                       |     |     |

- 逐渐废弃的生命周期方法（3 个 Will）：

```js
componentWillMount()
componentWillReceiveProps()
componentWillUpdate()
```

## react 16.3 以后的新特性

### v16 +

- React.memo (包装函数组件)
- React.lazy() adnd Suspense (动态引入组件)
- static contextType()
- static getDerivedStateFromError()
- 稳定版 hooks
- Error Boundary
- Portals
- 支持自定义 DOM 属性
- setState 传入 null 时不会再触发更新

#### Using memo()

React.memo() 是能作用在简单的函数组件，类似于 React.PureComponent 对于 class 组件的作用。它本质上是一个高阶函数，达到的效果就是，自动帮组件执行 shouldComponentUpdate() , 但是只是执行浅比较

使用方式就像高阶函数一样，包装了一层，如下：

```jsx
const MemoizedComponent = React.memo(function MyComponent(props) {
  //_ only rerenders if props change_
});
// for arrow functions
const OtherMemoized = React.memo(props => {
    return <div> Memoized Component </div>
}
```

也能包装已经存在的函数，如下：

```jsx
const MyComponent = (props) => <div> This is memorable!! </div>;
const Memoized = React.memo(MyComponent);
```

#### Suspense

如果 OtherComponent 没有被加载成功，我可以通过使用 Suspense 这个组件的参数`fallback`参数来显示一些类似于加载中的提示内容。`Suspense`组件中可以包裹多个动态加载的组件，这样统一管理，非常的方便。

如下：

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
        <AnotherComponent />
      </Suspense>
    </div>
  );
```

## 父组件和子组件 componentDidMount 哪个先执行

![屏幕快照 2019-05-25 下午8.55.32](../../学习部分/react/assets/屏幕快照 2019-05-25 下午 8.55.32.png)

当父组件 `render` 时遇到子组件，然后进入子组件的生命周期，当执行完子组件生命周期中的`componentDidMount` 时会回到父组建继续执行父组建未完成的生命周期。

```js
RootContainer constructor
RootContainer componentWillMount
RootContainer render
— ChildView constructor
— ChildView componentWillMount
— ChildView render
—— Grandson constructor
—— Grandson componentWillMount
—— Grandson render
—— Grandson componentDidMount
— ChildView componentDidMount
RootContainer componentDidMount
```
