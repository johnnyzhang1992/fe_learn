# AST

## 什么是 AST

抽象语法树（`Abstract Syntax Tree`）简称 `AST`，是源代码的抽象语法结构的树状表现形式。`webpack`、`eslint` 等很多工具库的核心都是通过抽象语法树这个概念来实现对代码的检查、分析等操作。

![img](https://oscimg.oschina.net/oscnet/d60e4800-53b4-466b-8cac-a78d3575d237.jpg)

如上图中变量声明语句，转换为 AST 之后就是右图中显示的样式

左图中对应的：

- `var` 是一个关键字
- `AST` 是一个定义者
- `=` 是 Equal 等号的叫法有很多形式，在后面我们还会看到
- `is tree` 是一个字符串
- `;` 就是 Semicoion

首先一段代码转换成的抽象语法树是一个对象，该对象会有一个顶级的 type 属性 `Program`；第二个属性是 `body` 是一个数组。

`body` 数组中存放的每一项都是一个对象，里面包含了所有的对于该语句的描述信息

```js
type:         描述该语句的类型  --> 变量声明的语句
kind:         变量声明的关键字  --> var
declaration:  声明内容的数组，里面每一项也是一个对象
            type: 描述该语句的类型
            id:   描述变量名称的对象
                type: 定义
                name: 变量的名字
            init: 初始化变量值的对象
                type:   类型
                value:  值 "is tree" 不带引号
                row:    "\"is tree"\" 带引号
```



## 词法分析和语法分析

`JavaScript` 是解释型语言，一般通过 词法分析 -> 语法分析 -> 语法树，就可以开始解释执行了

词法分析：也叫`扫描`，是将字符流转换为记号流(`tokens`)，它会读取我们的代码然后按照一定的规则合成一个个的标识

比如说：`var a = 2` ，这段代码通常会被分解成 `var、a、=、2`

```js
;[
  { type: 'Keyword', value: 'var' },
  { type: 'Identifier', value: 'a' },
  { type: 'Punctuator', value: '=' },
  { type: 'Numeric', value: '2' },
]
```

当词法分析源代码的时候，它会一个一个字符的读取代码，所以很形象地称之为扫描 - `scans`。当它遇到空格、操作符，或者特殊符号的时候，它会认为一个话已经完成了。

语法分析：也称`解析器`，将词法分析出来的数组转换成树的形式，同时验证语法。语法如果有错的话，抛出语法错误。

```js
{  ...  "type": "VariableDeclarator",  "id": {    "type": "Identifier",    "name": "a"  },  ...}
```

## AST 能做什么

- 语法检查、代码风格检查、格式化代码、语法高亮、错误提示、自动补全等
- 代码混淆压缩
- 优化变更代码，改变代码结构等

比如说，有个函数 `function a() {}` 我想把它变成 `function b() {}`

比如说，在 `webpack` 中代码编译完成后 `require('a') --> __webapck__require__("*/**/a.js")`

## AST 解析流程

准备工具：

- esprima：code => ast 代码转 ast
- estraverse: traverse ast 转换树
- escodegen: ast => code

在推荐一个常用的 AST 在线转换网站：https://astexplorer.net/

## babel 工作原理

提到 AST 我们肯定会想到 babel，自从 Es6 开始大规模使用以来，babel 就出现了，它主要解决了就是一些浏览器不兼容 Es6 新特性的问题，其实就把 Es6 代码转换为 Es5 的代码，兼容所有浏览器，babel 转换代码其实就是用了 AST，babel 与 AST 就有着很一种特别的关系。

需要用到两个工具包 `@babel/core`、`@babel/preset-env`

当我们配置 babel 的时候，不管是在 `.babelrc` 或者 `babel.config.js` 文件里面配置的都有 `presets` 和 `plugins` 两个配置项（还有其他配置项，这里不做介绍）



### 插件和预设的区别

```
// .babelrc
{
  "presets": ["@babel/preset-env"],
  "plugins": []
}
```

当我们配置了 `presets` 中有 `@babel/preset-env`，那么 `@babel/core` 就会去找 `preset-env` 预设的插件包，它是一套

babel 核心包并不会去转换代码，核心包只提供一些核心 API，真正的代码转换工作由插件或者预设来完成，比如要转换箭头函数，会用到这个 plugin，`@babel/plugin-transform-arrow-functions`，当需要转换的要求增加时，我们不可能去一一配置相应的 plugin，这个时候就可以用到预设了，也就是 presets。presets 是 plugins 的集合，一个 presets 内部包含了很多 plugin。



### babel 插件的使用

现在我们有一个箭头函数，要想把它转成普通函数，我们就可以直接这么写：

```js
const babel = require('@babel/core')
const code = `const fn = (a, b) => a + b`
// babel 有 transform 方法会帮我们自动遍历，使用相应的预设或者插件转换相应的代码
const r = babel.transform(code, {
  presets: ['@babel/preset-env'],
})
console.log(r.code)
// 打印结果如下
// "use strict";
// var fn = function fn() { return a + b; };
```

此时我们可以看到最终代码会被转成普通函数，但是我们，只需要箭头函数转通函数的功能，不需要用这么大一套包，只需要一个箭头函数转普通函数的包，我们其实是可以在 `node_modules` 下面找到有个叫做 `plugin-transform-arrow-functions` 的插件，这个插件是专门用来处理 箭头函数的，我们就可以这么写：

```js
const r = babel.transform(code, {
  plugins: ['@babel/plugin-transform-arrow-functions'],
})
console.log(r.code)
// 打印结果如下
// const fn = function () { return a + b; };
```

我们可以从打印结果发现此时并没有转换我们变量的声明方式还是 const 声明，只是转换了箭头函数

## 按需引入

在开发中，我们引入 UI 框架，比如 vue 中用到的 `element-ui`，`vant` 或者 `React` 中的 `antd` 都支持全局引入和按需引入，默认是全局引入，如果需要按需引入就需要安装一个 `babel-plugin-import` 的插件，将全局的写法变成按需引入的写法。

就拿我最近开发移动端用的 vant 为例， `import { Button } from 'vant'` 这种写法经过这个插件之后会变成 `import Button from 'vant/lib/Button'` 这种写法，引用整个 vant 变成了我只用了 vant 下面的某一个文件，打包后的文件会比全部引入的文件大小要小很多