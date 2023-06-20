# React 学习路径

![2018 React 学习路径](assets/roadmap-cn.png)

官网：<https://zh-hans.reactjs.org/>

新版官网：<https://beta.reactjs.org/>

React 是一个用于构建用户界面的 JavaScript 库。

> 在 React 中，函数和类就是 UI 的载体。我们可以理解为，将数据传入 React 的类组件和函数中，返回的就是 UI 界面。（虚拟 DOM

## 函数组件和 class 组件

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

注意点：

- 自定义组件，必须以大写字母开头
- props.children jsx 中的子元素
- 布尔类型、Null 以及 Undefined 将会忽略
- porps 值不可改变，属性可以为函数

## 展示组件和容器组件

容器组件。管理和存储自己的数据，包含和后端交互的逻辑，并使用展示组件进行展示

展示(演示)组件。纯函数，专注展示。

> React is designed around this concept. React assumes that every component you write is a pure function. This means that React components you write must always return the same JSX given the same inputs:

```js
// 函数组件
// React 假定每个函数组件都是纯函数。相同的输入，有会相同的输出。
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// 类组件
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

// PureComponent
// “浅比较”的模式来检查 props 和 state 中所有的字段
class CounterButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {count: 1};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
    this.setState(state => (
        count: state.count +1
    ), ()=> {
        // count 参数更新后的回调
    })
}

render() {
    return (
    <button
        color={this.props.color}
        // onClick={this.handleClick}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
    </button>
);
}
}
```

## 生命周期

图示 class 的生命周期以及函数组件的生命周期。父=》子》子》父；父开始，子开始，子结束，父结束。

下面，是具体的 class 与 Hooks 的生命周期对应关系：

|  class 组件    | Hooks 组件     |
| -------- | -------- |
| constructor  | useState |
| getDerivedStateFromProps | useState 里面 update 函数 |
| shouldComponentUpdate | useMemo |
| render | 函数本身 |
| componentDidMount | useEffect |
| componentDidUpdate | useEffect |
| componentWillUnmount | useEffect 里面返回的函数 |
| componentDidCatch | 无 |
| getDerivedStateFromError | 无 |

## 事件处理

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。例如：onClick={handleClick}

- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

- 在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式地使用 preventDefault

- 谨慎对待 JSX 回调函数中的 this

- 合成事件，解决浏览器兼容性问题。

```jsx
// 传统的 HTML
// 在 jsx 中，渲染过程中会直接执行
<button onclick="activateLasers()">
    Activate Lasers
</button>

// react
<button onClick={activateLasers}>
    Activate Lasers
</button>
// preventDefault 阻止默认行为
function Form() {
    function handleSubmit(e) {
        // 阻止默认行为
        e.preventDefault();
        // 阻止冒泡
        e.stopPropagation();
        console.log('You clicked submit.');
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
        </form>
    );
}
```

在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。

```jsx
// 手动绑定 this
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        // 为了在回调中使用 `this`，这个绑定是必不可少的
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}
// ---不绑定 this 的解决方法
// 1、public class fields 语法 to correctly bind callbacks:
class LoggingButton extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    handleClick = () => {
        console.log('this is:', this);
    };
    render() {
        return (
            <button onClick={this.handleClick}>
            Click me
            </button>
        );
    }
}
// 2、如果你没有使用 class fields 语法，你可以在回调中使用箭头函数：
class LoggingButton extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }

    render() {
        // 此语法确保 `handleClick` 内的 `this` 已被绑定。
        return (
            <button onClick={() => this.handleClick()}>
            Click me
            </button>
        );
    }
}
// 3、函数组件
```

## 高阶组件

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

高阶组件是参数为组件，返回值为新组件的函数。

> 组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

目的：

- 为处理 props， 新增或者删除属性

- 包裹组件

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

## Hook 函数

注意：

`不要在循环，条件或嵌套函数中调用 Hook`， 确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。

那么 React 怎么知道哪个 state 对应哪个 useState？答案是 React 靠的是 Hook 调用的顺序。（单向链表

### useState

state 变化后，组件会重新渲染。所以要合理使用 state ,不要定义过多（复杂的话使用 useReducer）；state 的值能一次更新，就不要多次更新。

- 批量更新问题

- 更新对象数据（Treat state as read-only 直接修改数据是无效的，使用对应的 set 方法，创建一个新的对象更新

- 更新数据（[… oldArr, {}] 。不直接修改原数据（push 等修改原数组的方法避免使用

- 合理组织 state 的结构 <https://beta.reactjs.org/learn/choosing-the-state-structure>

  - Group related state.
  - Avoid contradictions in state. 避免相斥，比如布尔值
  - Avoid redundant state. 避免多余，比如可由其他值计算而来
  - Avoid duplication in state. 避免重复
  - Avoid duplication in state. 避免深层嵌套

- 组件间共享数据（共同的父组件，useContext, store

```jsx
// 函数组件
import React, { useRef, useState } from 'react';
const FunctionComponent = () => {
    const [count, setCount] = useState(0);
    const handleClick = ()=>{
        setCount(count+1);
    }
    return (
        <div>
         <p>count:{count}<span onClick={handleClick}>+1</span></p>
        </div>
    )
}
// 批量更新 state 问题
export default function Counter() {
    const [number, setNumber] = useState(0);
    return (
        <>
            <h1>{number}</h1>
            <button onClick={() => {
            setNumber(number + 1);
            setNumber(number + 1);
            setNumber(number + 1);
            // 只会执行一次，想不被合并更新，可传入函数
            // setNumber(n => n + 1);
            }}>+3</button>
        </>
    )
}

// 类组件中使用 state
class Clock extends React.Component {
    constructor(props) {
        super(props);
        // state 指定参数
        this.state = {date: new Date()};
    }
    // 更新 state 方法
    // 错误
    this.state.date = new Date();
    // 正确 使用 setState() 方法，否则组件不会重新渲染
    this.setState({
        date: new Date(),
    }, ()=>{
    })

    render() {
        return (
            <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
```

### useEffect

```jsx
import React, { useRef, useState } from 'react';
const FunctionComponent = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('count 值为：0');
    const handleClick = ()=>{
        setCount(count+1);
    }
    // 仅 count 更新才会执行
    useEffect(()=>{
        setText(`count值为：${count}`)

    },[count])

    // state 更新后，每次都会执行
    useEffect(()=>{
    console.log(count);
    })

    // 仅组件挂载时执行一次
    useEffect(()=>{
        console.log(count);
    }, [])

        // 回调不支持 async 函数
        // React.useEffect(async () => {
        //   const url = `${API}/get-profile?id=${userId}`;
        //   const res = await fetch(url);
        //   const json = await res.json();
        //   setUser(json);
        // }, [userId]);

        // useEffect(() => {
        //   // Create an async function...
        //   async function runEffect() {
        //     const url = `${API}/get-profile?id=${userId}`;
        //     const res = await fetch(url);
        //     const json = await res.json();
        //     setUser(json);
        //   }
        //   // ...and then invoke it:
        //   runEffect();
        // }, [userId]);

    return (
        <div>
        <p>count:{count}<span onClick={handleClick}>+1</span></p>
        </div>
    )
}
```

### useRef

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。也可以用来保存数据。

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

使用用法：

```jsx
import { useRef } from 'react';

const FunctionComponent = () => {
    const ref = useRef();
    // const ref = React.createRef(); // 非 hook 的使用方法
    // 使用 ref
    const node = this.myRef.current;
    return (
        <>
        <input ref={ref} />
        {**仅支持 class 组件，因为函数组件没有实例**}
        <CustomComponent ref={ref} />
        </>
    )
}
```

### 自定义 Hook

#### 使用自定义 hook

```jsx
const { total, data ,tFetching} = useUsers(params);
// 一旦 params 发生变化，useEffect 回调就会重新执行，会返回新的值
```

#### 其他 hook

官网： <https://zh-hans.reactjs.org/docs/hooks-reference.html>

useReducer <https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer>

```jsx
// 类似 react-reducer 状态管理工具
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [
            ...tasks,
            {
            id: action.id,
            text: action.text,
            done: false,
            },
        ];
        }
        case 'deleted': {
            return tasks.filter((t) => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
dispatch({
    type: 'added',
    id: '',
    text: '',
})
```

- useCallback 缓存函数 const cachedFn = useCallback(fn, dependencies)
- useMemo 缓存计算结果 const cachedValue = useMemo(calculateValue, dependencies)
- useRef ref 对象在组件的整个生命周期内持续存在 const refContainer = useRef(initialValue);
- useImperativeHandle
- useLayoutEffect
- useDebugValue
- useDeferredValue
- useTransition
- useId

## Fiber 架构

React 技术解密： <https://react.iamkasong.com/>

新旧架构的区别：递归的无法中断的更新重构为异步的可中断更新

React16 架构可以分为三层：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入 Reconciler
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

Fiber 包含三层含义：

- 作为架构来说，之前 React15 的 Reconciler 采用递归的方式执行，数据保存在递归调用栈中，所以被称为 stack Reconciler。React16 的 Reconciler 基于 Fiber 节点实现，被称为 Fiber Reconciler。
- 作为静态的数据结构来说，每个 Fiber 节点对应一个 React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的 DOM 节点等信息。
- 作为动态的工作单元来说，每个 Fiber 节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

```jsx
function FiberNode(
tag: WorkTag,
pendingProps: mixed,
key: null | string,
mode: TypeOfMode,
) {
// 作为静态数据结构的属性
this.tag = tag;
this.key = key; // 和 ReactElement 组件的 key 一致.
this.elementType = null; //一般来讲和 ReactElement 组件的 type 一致 比如 div ul
this.type = null; // 一般来讲和 fiber.elementType 一致. 一些特殊情形下, 比如在开发环境下为了兼容热更新
this.stateNode = null; // 真实 DOM 是谁

// 用于连接其他 Fiber 节点形成 Fiber 树
this.return = null; // 父节点
this.child = null; // 子节点
this.sibling = null; // 兄弟节点
this.index = 0;

this.ref = null; // 指向在 ReactElement 组件上设置的 ref

// 作为动态的工作单元的属性
this.pendingProps = pendingProps; // 从`ReactElement`对象传入的 props. 用于和`fiber.memoizedProps`比较可以得出属性是否变动
this.memoizedProps = null; // 上一次生成子节点时用到的属性, 生成子节点之后保持在内存中
this.updateQueue = null; // 存储 state 更新的队列, 当前节点的 state 改动之后, 都会创建一个 update 对象添加到这个队列中.
this.memoizedState = null; // 用于输出的 state, 最终渲染所使用的 state
this.dependencies = null; // 该 fiber 节点所依赖的(contexts, events)等

this.mode = mode; // 二进制位 Bitfield,继承至父节点,影响本 fiber 节点及其子树中所有节点. 与 react 应用的运行模式有关(有 ConcurrentMode, BlockingMode, NoMode 等选项).

this.effectTag = NoEffect;
this.nextEffect = null;

this.firstEffect = null;
this.lastEffect = null;

// 调度优先级相关
this.lanes = NoLanes; // 本 fiber 节点的优先级
this.childLanes = NoLanes; // 子节点的优先级

// 指向该 fiber 在另一次更新时对应的 fiber
this.alternate = null; // 双 fiber 缓存 指向内存中的另一个 fiber, 每个被更新过 fiber 节点在内存中都是成对出现(current 和 workInProgress)
}
```

双缓存 Fiber 树

React 使用“双缓存”来完成 Fiber 树的构建与替换——对应着 DOM 树的创建与更新。

在 React 中最多会同时存在两棵 Fiber 树。当前屏幕上显示内容对应的 Fiber 树称为 current Fiber 树，正在内存中构建的 Fiber 树称为 workInProgress Fiber 树。

current Fiber 树中的 Fiber 节点被称为 current fiber，workInProgress Fiber 树中的 Fiber 节点被称为 workInProgress fiber，他们通过 alternate 属性连接。

```jsx
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```

## 周边生态

### UI 框架

Ant Design: <https://ant.design/> 5.0

Ant Design Mobile: <https://mobile.ant.design/>

TDesign: <https://tdesign.tencent.com/react/getting-started> 1.0

蚂蚁有配套的脚手架（umi），状态管理 (dva)，可视化（antv）。周边生态做的比较完善

其他

服务端渲染框架：next.js (star:102K) <https://github.com/vercel/next.js>

跨端解决方案：taro（start:32.5K）<https://github.com/NervJS/taro>

开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发微信/京东/百度/支付宝/字节跳动/ QQ 小程序/H5/React Native 等应用。

构建原生应用：React Native（star: 108K） <https://github.com/facebook/react-native>

React 和 Vue 区别

Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。

React 是一个用于构建用户界面的 JavaScript 库。

图灵社区：2016 年 State of JavaScript 的调查显示，Vue 的受欢迎程度仅次于 React。能否跟大家讲讲 React 和 Vue 在定位和内部实现方式上，有哪些异同点？

虽然两者在定位上有一些交集，但差异也是很明显的。Vue 的 API 跟传统 web 开发者熟悉的模板契合度更高，比如 Vue 的单文件组件是以模板+JavaScript+CSS 的组合模式呈现，它跟 web 现有的 HTML、JavaScript、CSS 能够更好地配合。

从使用习惯和思维模式上考虑，对于一个没有任何 Vue 和 React 基础的 web 开发者来说， Vue 会更友好，更符合他的思维模式。React 对于拥有函数式编程背景的开发者以及一些并不是以 web 为主要开发平台的开发人员而言，React 更容易接受。这并不意味着他们不能接受 Vue，Vue 和 React 之间的差异对他们来说就没有 web 开发者那么明显。可以说，Vue 更加注重 web 开发者的习惯。

实现上，Vue 跟 React 的最大区别在于数据的 reactivity，就是反应式系统上。Vue 提供反应式的数据，当数据改动时，界面就会自动更新，而 React 里面需要调用方法 SetState。我把两者分别称为 Push-based 和 Pull-based。所谓 Push-based 就是说，改动数据之后，数据本身会把这个改动推送出去，告知渲染系统自动进行渲染。在 React 里面，它是一个 Pull 的形式，用户要给系统一个明确的信号说明现在需要重新渲染了，这个系统才会重新渲染。两者并没有绝对的优劣之分，更多的也是思维模式和开发习惯的不同。

两者不是完全互斥的，比如说在 React 里面，你也可以用一些第三方的库像 MobX 实现 Push-based 的系统，同时你也可以在 Vue2.0 里面，通过一些手段，比如把数据 freeze 起来，让数据不再具有反应式特点，或者通过手动调用组件更新的方法来做一个 pull-based 系统。所以两者并没有一个绝对的界限，只是默认的倾向性不同而已。
