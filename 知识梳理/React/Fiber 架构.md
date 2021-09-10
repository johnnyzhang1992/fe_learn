# React fiber 架构

## 基本架构

Curent Fiber 和 workInprogress Fiber

- Scheduler 调度器（调度任务的优先级lane，高优先级优先进入 Reconciler）

- Reconciler 协调器(负责找出变化的组件)

- Renderer 渲染器（负责将变化的组件渲染到页面上）

整个调度流程，用一个流程图表示:

![2.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b54e758e13641adae78499dbddc6b47~tplv-k3u1fbpfcp-watermark.awebp)

### 调和 + 异步调度 流程总图

异步调度过程，如下图所示：

![3.jpeg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/429a103a732e42b69b6cd9a32f1d265a~tplv-k3u1fbpfcp-watermark.awebp)

