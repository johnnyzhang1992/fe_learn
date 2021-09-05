# React fiber 架构

## 基本架构

Curent Fiber 和 workInprogress Fiber

- Scheduler 调度器（调度任务的优先级lane，高优先级优先进入 Reconciler）

- Reconciler 协调器(负责找出变化的组件)

- Renderer 渲染器（负责将变化的组件渲染到页面上）

