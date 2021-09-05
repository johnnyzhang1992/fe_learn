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
