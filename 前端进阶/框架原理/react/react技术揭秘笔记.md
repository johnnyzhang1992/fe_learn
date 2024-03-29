# 技术解密

> 原文地址:[【React技术揭秘：https://react.iamkasong.com/】](https://react.iamkasong.com/)

我们可以看到，`React`为了践行“构建**快速响应**的大型 Web 应用程序”理念做出的努力。

其中的关键是解决CPU的瓶颈与IO的瓶颈。而落实到实现上，则需要将**同步的更新**(递归的无法中断的更新)变为**可中断的异步更新**。

## 理念

### 老的架构 React 15

`React`15架构可以分为两层：

- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上（`ReactDom`)

### 递归更新的缺点

由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16 ms，用户交互就会卡顿。

### 新的架构 `React`16.8

React 16架构可以分为三层：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

### `Fiber` 架构

`React`使用“双缓存”来完成`Fiber树`的构建与替换——对应着`DOM树`的创建与更新。

在`React`中最多会同时存在两棵`Fiber树`。当前屏幕上显示内容对应的`Fiber树`称为`current Fiber树`，正在内存中构建的`Fiber树`称为`workInProgress Fiber树`。

> 术语介绍

- `Reconciler`工作的阶段被称为`render`阶段。因为在该阶段会调用组件的`render`方法。
- `Renderer`工作的阶段被称为`commit`阶段。就像你完成一个需求的编码后执行`git commit`提交代码。`commit`阶段会把`render`阶段提交的信息渲染在页面上。
- `render`与`commit`阶段统称为`work`，即`React`在工作中。相对应的，如果任务正在`Scheduler`内调度，就不属于`work`。

## 架构

### render 阶段

`render阶段`开始于`performSyncWorkOnRoot`或`performConcurrentWorkOnRoot`方法的调用。这取决于本次更新是同步更新还是异步更新。

我们知道`Fiber Reconciler`是从`Stack Reconciler`重构而来，通过遍历的方式实现可中断的递归，所以`performUnitOfWork`的工作可以分为两部分：“递”和“归”。

#### “递”阶段

首先从`rootFiber`开始向下深度优先遍历。为遍历到的每个`Fiber节点`调用[beginWork方法 (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3058)。

该方法会根据传入的`Fiber节点`创建`子Fiber节点`，并将这两个`Fiber节点`连接起来。

当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

#### “归”阶段

在“归”阶段会调用[completeWork (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCompleteWork.new.js#L652)处理`Fiber节点`。

当某个`Fiber节点`执行完`completeWork`，如果其存在`兄弟Fiber节点`（即`fiber.sibling !== null`），会进入其`兄弟Fiber`的“递”阶段。

如果不存在`兄弟Fiber`，会进入`父级Fiber`的“归”阶段。

“递”和“归”阶段会交错执行直到“归”到`rootFiber`。至此，`render阶段`的工作就结束了。

### commit 阶段

`commit`阶段的主要工作（即`Renderer`的工作流程）分为三部分：

- before mutation阶段（执行`DOM`操作前）
- mutation阶段（执行`DOM`操作）
- layout阶段（执行`DOM`操作后）

## 实现

### diff 算法

一个`DOM节点`在某一时刻最多会有4个节点和他相关。

1. `current Fiber`。如果该`DOM节点`已在页面中，`current Fiber`代表该`DOM节点`对应的`Fiber节点`。
2. `workInProgress Fiber`。如果该`DOM节点`将在本次更新中渲染到页面中，`workInProgress Fiber`代表该`DOM节点`对应的`Fiber节点`。
3. `DOM节点`本身。
4. `JSX对象`。即`ClassComponent`的`render`方法的返回结果，或`FunctionComponent`的调用结果。`JSX对象`中包含描述`DOM节点`的信息。

`Diff算法`的本质是对比1和4，生成2。

#### **`React`的`diff`会预设三个限制：**

1. 只对同级元素进行`Diff`。如果一个`DOM节点`在前后两次更新中跨越了层级，那么`React`不会尝试复用他。
2. 两个不同类型的元素会产生出不同的树。如果元素由`div`变为`p`，React会销毁`div`及其子孙节点，并新建`p`及其子孙节点。
3. 开发者可以通过 `key prop`来暗示哪些子元素在不同的渲染下能保持稳定。

#### **`Diff算法`的整体逻辑会经历两轮遍历：**

第一轮遍历：处理`更新`的节点。

第二轮遍历：处理剩下的不属于`更新`的节点。

**考虑性能，我们要尽量减少将节点从后面移动到前面的操作。**

### 状态更新

```sh
触发状态更新（根据场景调用不同方法）
    |
    |
    v
创建Update对象（接下来三节详解）
    |
    |
    v
从fiber到root（`markUpdateLaneFromFiberToRoot`）
    |
    |
    v
调度更新（`ensureRootIsScheduled`）
    |
    |
    v
render阶段（`performSyncWorkOnRoot` 或 `performConcurrentWorkOnRoot`）
    |
    |
    v
commit阶段（`commitRoot`）
```

#### ReactDom.render

```sh
创建fiberRootNode、rootFiber、updateQueue（`legacyCreateRootFromDOMContainer`）
    |
    |
    v
创建Update对象（`updateContainer`）

    |
    |
    v
从fiber到root（`markUpdateLaneFromFiberToRoot`）

    |
    |
    v
调度更新（`ensureRootIsScheduled`）
    |
    |
    v
render阶段（`performSyncWorkOnRoot` 或 `performConcurrentWorkOnRoot`）
    |
    |
    v
commit阶段（`commitRoot`）
```

#### Fiber 的主要工作流程

ReactDOM.render() 引导 React 启动或调用 setState() 的时候开始创建或更新 Fiber 树。

- 从根节点开始遍历 Fiber Node Tree， 并且构建 WokeInProgress Tree（reconciliation 阶段）。

  - 本阶段可以暂停、终止、和重启，会导致 react 相关生命周期重复执行。
  - React 会生成两棵树，一棵是代表当前状态的 current tree，一棵是待更新的 workInProgress tree。
  - 遍历 current tree，重用或更新 Fiber Node 到 workInProgress tree，workInProgress tree 完成后会替换 current tree。
  - 每更新一个节点，同时生成该节点对应的 Effect List。
  - 为每个节点创建更新任务。

- 将创建的更新任务加入任务队列，等待调度。

  - 调度由 scheduler 模块完成，其核心职责是执行回调。
  - scheduler 模块实现了跨平台兼容的 requestIdleCallback。
  - 每处理完一个 Fiber Node 的更新，可以中断、挂起，或恢复。

- 根据 Effect List 更新 DOM （commit 阶段）。

  - React 会遍历 Effect List 将所有变更一次性更新到 DOM 上。
  - 这一阶段的工作会导致用户可见的变化。因此该过程不可中断，必须一直执行直到更新完成。
