# 代码书写规范

推荐使用airbnb 的代码规范： <https://github.com/airbnb/javascript>

## JavaScript 代码书写规范

### 函数组件

- `const` 相关参数放到函数顶部
- 自定义方法按照类型分类，前缀用单词区分开。例如： `handleInputChange`,`fetchUserList`
- `useEffect` 放到`return` 上方，方面调试
- 组件内容一旦过长就视情况拆分为小组件

## 变量

变量必须先声明再使用；禁止不带任何关键词定义变量，这样会创建一个全局变量。

在你真正需要的代码块内定义变量。（防止变量提升

使用对象拓展操作符浅拷贝对象，数组类似。

禁止定义了变量却不使用它。

```js
const original = { a: 1, b: 2 };
// good
const copy = { ...original, c: 3 };
```

## 函数

使用命名式的函数表达式代替函数声明：(原因，函数声明时作用域被提前=》变量的创建，初始化和赋值

```js
// bad
function foo() {
// ...
}
// good
const foo = function () {};
// 不要改变函数的入参，参数为引用类型时要注意。（扩展运算符，获取值
```

## 模块

将所有 imports 语句放到其他语句之前。

## 其他

尽量避免使用不必要的递增和递减操作符（++，--）;

```js
// bad
let num = 1;
num ++;

// good
let num = 1;
num += 1;
num -= 1;
```
