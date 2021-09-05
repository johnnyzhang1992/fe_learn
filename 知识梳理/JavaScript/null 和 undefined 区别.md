# [JavaScript中Null和Undefined的区别](https://www.cnblogs.com/zhaoxinmei-123/p/9046962.html)



**Null：**

null是js中的关键字，表示空值，null可以看作是object的一个特殊的值，如果一个object值为空，表示这个对象不是有效对象。

**Undefined:**

undefined不是js中的关键字，其是一个全局变量，是Global的一个属性，以下情况会返回undefined:

1）使用了一个未定义的变量；var i;

2）使用了已定义但未声明的变量；

3）使用了一个对象属性，但该属性不存在或者未赋值；

4) 调用函数时，该提供的参数没有提供：

```js
`function func(a){``   ``console.log(a);      ``}``func();``//undefined`
```

 5) 函数没有返回值时，默认返回undefined

```js
`var` `aa=func();``aa;``//undefined`
```

**相同点：**

都是原始类型的值，保存在栈中变量本地

**两者的区别：**

1.类型不一样：

```js
`console.log(typeOf undefined);``//undefined` `console.log(typeOf ``null``);``//object`
```

 

2.转化为值时不一样：undefined为NaN ,null为0

```js
`console.log(Number(undefined));``//NaN``console.log(Number(10+undefined));``//NaN` `console.log(Number(``null``));``//0``console.log(Number(10+``null``));``//10`
```

 3.undefined===null;//false

​    undefined==null;//true

**何时使用：**

**null当使用完一个比较大的对象时，需要对其进行释放内存时，设置为null;**

```js
`var` `arr=[``"aa"``,``"bb"``,``"cc"``];``arr=``null``;``//释放指向数组的引用`
```