# 面试中遇到的 js 问题整理

## 截取数组的最后两位

```js
arr.slice(-2);
arr.slice(arr.length-2,arr.length)
```

## 解构赋值是浅拷贝还是深拷贝

测试对象来看是浅拷贝。

```js
let aa = {
 age: 18,
 name: 'aaa',
 address: {
  city: 'shanghai'
 }
}

let bb = {
 ...aa,
};

bb.address.city = 'shenzhen';

// aa.address
// {city: "shenzhen"}
// bb.address
// {city: "shenzhen"}
// 修改解构赋值获取的新对象的属性为对象的某个属性值后，原对象也跟着改变了。
// 说明直接拷贝了原对象的指针引用，并不是深拷贝。
```

## `0.1+0.2 !==0.3` 为什么，以及怎么解决

双精度问题，转换成二进制后再相加会出现精度丢失。

- `Number.EPISON` 精度在可控范围内
- 两边乘以 10，`0.1*10+0.2*10 === 0.3*10`
- 或者省略小数点后面的位数。 `parseFloat((0.1+0.2).toFixed(2)) === 0.3`

## `let` 声明问题

`let` 声明的变量，在初始化前，不能被使用。否则会进入暂时性死区。（引用报错）

```js
a = 2;
let a;
console.log(a);// 此时打印出什么？
// Uncaught ReferenceError: Cannot access 'ta before initialization
// // Uncaught ReferenceError: d is not defined
```

```js
varca = 2;
let a;
console.log(a);// 此时打印出什么？
// Uncaught SyntaxError: Identifier 'd' has already been declared
// Uncaught ReferenceError: d is not defined
```

## `new` 一个函数时，反生了什么？

构造调用：

创造一个全新的对象，这个对象会被执行 [[Prototype]] 连接，将这个新对象的 [[Prototype]] 链接到这个构造函数.prototype 所指向的对象
这个新对象会绑定到函数调用的 this。如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

问：new 一个构造函数，如果函数返回 return {} 、 return null ， return 1 ， return true 会发生什么情况？
如果函数返回一个对象，那么new 这个函数调用返回这个函数的返回对象，否则返回 new 创建的新对象

### 手写 new 的实现

一个继承自 Foo.prototype 的新对象被创建。
使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。
一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤

```js
function Ctor(){
    ....
}

function myNew(ctor,...args){
    if(typeof ctor !== 'function'){
      throw 'myNew function the first param must be a function';
    }
    var newObj = Object.create(ctor.prototype); //创建一个继承自ctor.prototype的新对象
    var ctorReturnResult = ctor.apply(newObj, args); //将构造函数ctor的this绑定到newObj中
    var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
    var isFunction = typeof ctorReturnResult === 'function';
    if(isObject || isFunction){
        return ctorReturnResult;
    }
    return newObj;
}

let c = myNew(Ctor);
```
