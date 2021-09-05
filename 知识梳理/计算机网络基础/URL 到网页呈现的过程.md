### Q2: 概述输入一个url到网页呈现的过程

#### Q 2-1: DNS 解析的详细过程

#### Q 2-2: 概述 http 的缓存控制（http2 与相关缓存控制）

#### Q 2-3: 简述三次握手

#### Q 2-4: 页面加载白屏的原因有哪些，以及如何监控白屏时间，如何优化

#### Q 2-5：script 标签的属性有哪些

#### Q 2-6: script 标签的 defer 和 async 标签的作用与区别

#### Q 2-7: script intergrity的作用

1.DNS域名解析；
2.建立TCP连接；
3.发送HTTP请求；
4.服务器处理请求；
5.返回响应结果；
6.关闭TCP连接；
7.浏览器解析HTML；
8.浏览器布局渲染；

## **浏览器解析过程**

现代浏览器是一个及其庞大的大型软件，在某种程度上甚至不亚于一个操作系统，它由多媒体支持、图形显示、GPU 渲染、进程管理、内存管理、沙箱机制、存储系统、网络管理等大大小小数百个组件组成。虽然开发者在开发 Web 应用时，无需关心底层实现细节，只需将页面代码交付于浏览器计算，就可以展示出丰富的内容。但页面性能不仅仅关乎浏览器的实现方式，更取决于开发者的水平，对工具的熟悉程度，代码优化是无止尽的。显然，了解浏览器的基本原理，了解 W3C 技术标准，了解网络协议，对设计、开发一个高性能 Web 应用帮助非常大。

当我们在使用 Chrome 浏览器时，其背后的引擎是 Google 开源的 Chromium 项目，而 Chromium 的内核则是渲染引擎 Blink（基于 Webkit）和 JavaScript 引擎 V8。在阐述浏览器解析 HTML 文件之前，先简单介绍一下 Chromium 的多进程多线程架构（图 5），它包括多个进程：

- 一个 Browser 进程
- 多个 Renderer 进程
- 一个 GPU 进程
- 多个 NPAPI Render 进程
- 多个 Pepper Plugin 进程

而每个进程包括若干个线程：

- 一个主线程
- 在 Browser 进程中：渲染更新界面
- 在 Renderer 进程中：使用持有的内核 Blink 实例解析渲染更新界面
- 一个 IO 线程
- 在 Browser 进程中：处理 IPC 通信和网络请求
- 在 Renderer 进程中：处理与 Browser 进程之间的 IPC 通信
- 一组专用线程
- 一个通用线程池

![img](assets/v2-cb5d3e74c815dbda00467bc935820cda_hd.jpg)

图 5：Chromium 多进程多线程架构

Chromium 支持多种不同的方式管理 Renderer 进程，不仅仅是每一个开启的 Tab 页面，iframe 页面也包括在内，每个 Renderer 进程是一个独立的沙箱，相互之间隔离不受影响。

- Process-per-site-instance：每个域名开启一个进程，并且从一个页面链接打开的新页面共享一个进程（noopener 属性除外），这是默认模式
- Process-per-site：每个域名开启一个进程
- Process-per-tab：每个 Tab 页面开启一个进程
- Single process：所有页面共享一个进程

当 Renderer 进程需要访问网络请求模块（XHR、Fetch），以及访问存储系统（同步 Local Storage、同步 Cookie、异步 Cookie Store）时，则调用 RenderProcess 全局对象通过 IO 线程与 Browser 进程中的 RenderProcessHost 对象建立 IPC 信道，底层通过 socketpair 来实现。正由于这种机制，Chromium 可以更好地统一管理资源、调度资源，有效地减少网络、性能开销。

## 主流程

页面的解析工作是在 Renderer 进程中进行的，Renderer 进程通过在主线程中持有的 Blink 实例边接收边解析 HTML 内容（图 6），每次从网络缓冲区中读取 8KB 以内的数据。浏览器自上而下逐行解析 HTML 内容，经过词法分析、语法分析，构建 DOM 树。当遇到外部 CSS 链接时，主线程调用网络请求模块异步获取资源，不阻塞而继续构建 DOM 树。当 CSS 下载完毕后，主线程在合适的时机解析 CSS 内容，经过词法分析、语法分析，构建 CSSOM 树。浏览器结合 DOM 树和 CSSOM 树构建 Render 树，并计算布局属性，每个 Node 的几何属性和在坐标系中的位置，最后进行绘制展示在屏幕上。当遇到外部 JS 链接时，主线程调用网络请求模块异步获取资源，由于 JS 可能会修改 DOM 树和 CSSOM 树而造成回流和重绘，此时 DOM 树的构建是处于阻塞状态的。但主线程并不会挂起，浏览器会使用一个轻量级的扫描器去发现后续需要下载的外部资源，提前发起网络请求，而脚本内部的资源不会识别，比如 `document.write`。当 JS 下载完毕后，浏览器调用 V8 引擎在 Script Streamer 线程中解析、编译 JS 内容，并在主线程中执行（图 7）。

![img](assets/v2-f7473c255fd30b53cb32e08da905b2fe_hd.jpg)图 6：Webkit 主流程

![img](assets/v2-0589d6a872b93e73fe454812d00642ab_hd.jpg)图 7：V8 解释流程，Chrome 66 以前对比 Chrome 66

## 渲染流程

当 DOM 树构建完毕后，还需经过好几次转换，它们有多种中间表示（图 8）。首先计算布局、绘图样式，转换为 RenderObject 树（也叫 Render 树）。再转换为 RenderLayer 树，当 RenderObject 拥有同一个坐标系（比如 canvas、absolute）时，它们会合并为一个 RenderLayer，这一步由 CPU 负责合成。接着转换为 GraphicsLayer 树，当 RenderLayer 满足合成层条件（比如 transform，熟知的硬件加速）时，会有自己的 GraphicsLayer，否则与父节点合并，这一步同样由 CPU 负责合成。最后，每个 GraphicsLayer 都有一个 GraphicsContext 对象，负责将层绘制成位图作为纹理上传给 GPU，由 GPU 负责合成多个纹理，最终显示在屏幕上。

![img](assets/v2-892f27417777b22578ec84e8cbc8c997_hd.jpg)图 8：从 DOM 树到 GraphicsLayer 树的转换

另外，为了提升渲染性能效率，浏览器会有专用的 Compositor 线程来负责层合成（图 9），同时负责处理部分交互事件（比如滚动、触摸），直接响应 UI 更新而不阻塞主线程。主线程把 RenderLayer 树同步给 Compositor 线程，由它开启多个 Rasterizer 线程，进行光栅化处理，在可视区域以瓦片为单位把顶点数据转换为片元，最后交付给 GPU 进行最终合成渲染。

![img](assets/v2-9a1786b414dbeaa28536ee94612bbafa_hd.jpg)图 9：Chromium 多线程渲染

## 页面生命周期

页面从发起请求开始，结束于跳转、刷新或关闭，会经过多次状态变化和事件通知，因此了解整个过程的生命周期非常有必要。浏览器提供了 [Navigation Timing](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/navigation-timing-2/) 和 [Resource Timing](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/resource-timing-2/) 两种 API 来记录每一个资源的事件发生时间点，你可以用它来收集 RUM（Real User Monitoring，真实用户监控）数据，发送给后端监控服务，综合分析页面性能来不断改善用户体验。图 10 表示 HTML 资源加载的事件记录全过程，而中间黄色部分表示其它资源（CSS、JS、IMG、XHR）加载事件记录过程，它们都可以通过调用 `window.performance.getEntries()` 来获取具体指标数据。

![img](assets/v2-8cff53aff488008e57750b4b2faa968f_hd.jpg)图 10：页面加载事件记录流程

衡量一个页面性能的方式有很多，但能给用户带来直接感受的是页面何时渲染完成、何时可交互、何时加载完成。其中，有两个非常重要的生命周期事件，DOMContentLoaded 事件表示 DOM 树构建完毕，可以安全地访问 DOM 树所有 Node 节点、绑定事件等等；load 事件表示所有资源都加载完毕，图片、背景、内容都已经完成渲染，页面处于可交互状态。但是迄今为止浏览器并不能像 Android 和 iOS app 一样完全掌控应用的状态，在前后台切换的时候，重新分配资源，合理地利用内存。实际上，现代浏览器都已经在做这方面的相关优化，并且自 Chrome 68 以后提供了[Page Lifecycle](http://link.zhihu.com/?target=https%3A//wicg.github.io/page-lifecycle/spec.html) API，定义了全新的浏览器生命周期（图 11），让开发者可以构建更出色的应用。

![img](assets/v2-2828661918513e1abceaaf6fa79f9009_hd.jpg)图 11：新版页面生命周期

现在，你可以通过给 `window` 和 `document` 绑定上所有生命周期监听事件（图 12），来监测页面切换、用户交互行为所触发的状态变化过程。不过，开发者只能感知事件在何时发生，不能直接获取某一刻的页面状态（图 11 中的 STATE）。即使如此，利用这个 API，也可以让脚本在合适的时机执行某项任务或进行界面 UI 反馈。

![img](assets/v2-2801607f50aa146015a2e18e73104398_hd.jpg)图 12：生命周期监听事件