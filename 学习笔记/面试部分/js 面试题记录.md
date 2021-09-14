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
