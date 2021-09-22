# new 一个对象的过程

- 首先创建一个新对象；

- 将新对象的 constructor 设置为构造函数的名称

- 将新对象的 `__proto__` 设置为构造函数的 prototype
- 使用新对象调用函数，将函数中的 this 指向新实例对象
- 将初始化完毕的新对象地址，保存到等号左边的变量中

```js
function new(func){
  // 创建一个新对象
  var res = {};
  // 新对象的 constructor 设置为构造函数的名称
  res.constructor = func;
  if(func.prototype !==null){
    // 将新对象的 __proto__ 设置为构造函数的 prototype
    res.__proto__ = func.prototype;
  }

  // 使用新对象调用函数，函数中的 this 被指向新实例对象
  var ret = func.apply(res, Array.prototype.slice.call(arguments,1));
  // var rest = func.apply(res, ...rest)
  if((typeof ret ==='object' || typeof ret ==='function') && ret !==null ){
   return ret;
  }
  return res;
}
var obj = New(A,1,2,3);
// equals to
var obj = new A(1,2);
```

## new的实现

一个继承自 Foo.prototype 的新对象被创建。
使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。
一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤.

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
