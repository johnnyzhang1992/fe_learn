# Typescript 基本指南

## 一、为什么要用 TypeScript

`TypeScript`可以让我们开发中避免一些`类型`或者`一些不是我们预期希望的代码结果`错误。xxx is not defined 我们都知道`JavaScript`错误是在运行中才抛出的，但是`TypeScript`错误直接是在编辑器里告知我们的，这极大的提升了开发效率，也不用花大量的时间去写单测，同时也避免了大量的时间排查`Bug`。

## 二、TypeScript 优缺点

### 优点

- 一般我们在前后端联调时，都要去看接口文档上的字段类型，而`TypeScript`会自动帮我们识别当前的类型。节省了我们去看`文档`或者`network`时间。这叫做类型推导(待会我们会讲到)
- 友好地在编辑器里提示错误，避免代码在运行时类型隐式转换踩坑。

### 缺点

- 有一定的学习成本，`TypeScript`中有几种类型概念，`interface接口`、`class类`、`enum枚举`、`generics泛型`等这些需要我们花时间学习。
- 可能和一些插件库结合的不是很完美

## 三、TypeScript 运行流程及 JavaScript 代码运行流程

### **1. JavaScript 运行流程如下，依赖 NodeJs 环境和浏览器环境**

- 将`JavaScript`代码转换为`JavaScript-AST`
- 将`AST`代码转换为字节码
- 运算时计算字节码

### **2. TypeScript 运行流程，以下操作均为 TSC 操作，三步执行完继续同上操作，让浏览器解析**

- 将`TypeScript`代码编译为 `TypeScript-AST`
- 检查`AST`代码上类型检查
- 类型检查后，编译为`JavaScript`代码
- `JavaScript`代码转换为`JavaScript-AST`
- 将`AST`代码转换为字节码
- 运算时计算字节码

## 四、TypeScript 和 JavaScript 区别

只有搞懂了二者的区别，我们才可以更好的理解`TypeScript`

| 类型系统特性           | JavaScript | TypeScript |
| :--------------------- | :--------- | :--------- |
| 类型是如何绑定？       | 动态       | 静态       |
| 是否存在类型隐式转换？ | 是         | 否         |
| 何时检查类型？         | 运行时     | 编译时     |
| 何时报告错误           | 运行时     | 编译时     |

## 文章推荐

- 【前端真好玩】[连续爆肝一周，写完了这份快速转 TypeScript 指南](https://mp.weixin.qq.com/s/tpaJJ6qY9inhPIiF9EAFgQ)
- 【掘金】[TypeScript 备忘录：如何在 React 中完美运用？](https://juejin.cn/post/6910863689260204039)

## 网站推荐

- [jkchao-深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)

## Typescript in React

- [TypeScript 备忘录：如何在 React 中完美运用？](https://juejin.cn/post/6910863689260204039)
