# 函数组件和Class组件区别

UI + update + 常规的类和函数 = React 组件

组件本质上就是类和函数，但是与常规的类和函数不同的是，**组件承载了渲染视图的 UI 和更新视图的 setState 、 useState 等方法**。React 在底层逻辑上会像正常实例化类和正常执行函数那样处理的组件。

因此，函数与类上的特性在 React 组件上同样具有，比如原型链，继承，静态属性等，所以不要把 React 组件和类与函数独立开来。

- 利用 Function Component + Hooks 可以实现 Class Component 做不到的 capture props、capture value，而且 React 官方也推荐 [新的代码使用 Hooks 编写](https://reactjs.org/docs/hooks-faq.html#do-i-need-to-rewrite-all-my-class-components)。（若想获取最新的值是有useRef 
- 组件传参
- 生命周期
- 渲染jsx

函数组件语法更短、更简单，这使得它更容易开发、理解和测试。类组件也会因大量使用 this 而让人感到困惑。使用功能组件可以很容易地避免这种缺点，保持代码整洁。

- 语法区别。（class 组件转译后要长
- 状态管理
- 获取渲染时的值（function 会 capture props、capture value，

