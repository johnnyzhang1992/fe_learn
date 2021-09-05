### cookie:

**保存cookie值：**

```js
    var dataCookie='110';
    document.cookie = 'token' + "=" +dataCookie;
```

**获取指定名称的cookie值**

```js
 function getCookie(name) { //获取指定名称的cookie值
// (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
if(arr != null) {
  console.log(arr);
  return unescape(arr[2]);
}
return null;
}
 var cookieData=getCookie('token'); //cookie赋值给变量。
```

先贴这两个最基础的方法，文末有个[demo](https://link.juejin.im?target=http%3A%2F%2Fobkoro1.com%2Farticle-demo%2F2017%2FcookieStorage%2Findex.html)里面还有如何设置cookie过期时间，以及删除cookie的、

**给cookie设置终止日期**

例如：如果要将cookie设置为10天后过期，可以这样实现：

```js
//获取当前时间
var date=new Date();
var expiresDays=10;
//将date设置为10天以后的时间
date.setTime(date.getTime()+expiresDays*24*3600*1000);
//将userId和userName两个cookie设置为10天后过期
document.cookie="userId=828; userName=hulk; expires="+date.toGMTString();
```

**删除cookie** 
为了删除一个cookie，可以将其过期时间设定为一个过去的时间;

### localStorage和sessionStorage:

**localStorage和sessionStorage所使用的方法是一样的**，下面以sessionStorage为栗子：

```js
var name='sessionData';
var num=120;
sessionStorage.setItem(name,num);//存储数据
sessionStorage.setItem('value2',119);
let dataAll=sessionStorage.valueOf();//获取全部数据
console.log(dataAll,'获取全部数据');
var dataSession=sessionStorage.getItem(name);//获取指定键名数据
var dataSession2=sessionStorage.sessionData;//sessionStorage是js对象，也可以使用key的方式来获取值
 console.log(dataSession,dataSession2,'获取指定键名数据');
sessionStorage.removeItem(name); //删除指定键名数据
  console.log(dataAll,'获取全部数据1');
 sessionStorage.clear();//清空缓存数据：localStorage.clear();
  console.log(dataAll,'获取全部数据2'); 
```

使用方式，基本上就上面这些，其实也是比较简单的。大家可以把这个copy到自己的编译器里面，或者文末有个[demo](https://link.juejin.im?target=http%3A%2F%2Fobkoro1.com%2Farticle-demo%2F2017%2FcookieStorage%2Findex.html)，可以点开看看。

## 三者的异同：

上面的使用方式说好了，下面就唠唠三者之间的区别，这个问题其实很多大厂面试的时候也都会问到，所以可以注意一下这几个之间的区别。

### 生命周期：

cookie：可设置失效时间，没有设置的话，默认是关闭浏览器后失效

localStorage：除非被手动清除，否则将会永久保存。

sessionStorage： 仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。

### 存放数据大小：

cookie：4KB左右

localStorage和sessionStorage：可以保存5MB的信息。

### http请求：

cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题

localStorage和sessionStorage：仅在客户端（即浏览器）中保存，不参与和服务器的通信

### 易用性：

cookie：需要程序员自己封装，源生的Cookie接口不友好

localStorage和sessionStorage：源生接口可以接受，亦可再次封装来对Object和Array有更好的支持

## 应用场景：

从安全性来说，因为每次http请求都会携带cookie信息，这样无形中浪费了带宽，所以cookie应该尽可能少的使用，另外cookie还需要指定作用域，不可以跨域调用，限制比较多。但是用来识别用户登录来说，cookie还是比storage更好用的。其他情况下，可以使用storage，就用storage。

storage在存储数据的大小上面秒杀了cookie，现在基本上很少使用cookie了，因为更大总是更好的，哈哈哈你们懂得。

localStorage和sessionStorage唯一的差别一个是永久保存在浏览器里面，一个是关闭网页就清除了信息。localStorage可以用来跨页面传递参数，sessionStorage用来保存一些临时的数据，防止用户刷新页面之后丢失了一些参数。

## 浏览器支持情况：

localStorage和sessionStorage是html5才应用的新特性，可能有些浏览器并不支持，这里要注意。

cookie的浏览器支持没有找到，可以通过下面这段代码来判断所使用的浏览器是否支持cookie：

```
if(navigator.cookieEnabled) {
  alert("你的浏览器支持cookie功能");//提示浏览器支持cookie  
} else {
  alert("你的浏览器不支持cookie");//提示浏览器不支持cookie   }复制代码
```

### 数据存放处：

### 番外：各浏览器Cookie大小、个数限制。

cookie 使用起来还是需要小心一点，有兴趣的可以看一下这个[链接](https://link.juejin.im?target=https%3A%2F%2Fwww.cnblogs.com%2Fhenryhappier%2Farchive%2F2011%2F03%2F03%2F1969564.html)。

### demo链接

把上面的demo代码，上传到github上面了，有需要的小伙伴们，可以看一下。[传送门](https://link.juejin.im?target=http%3A%2F%2Fobkoro1.com%2Farticle-demo%2F2017%2FcookieStorage%2Findex.html)

## 后话

最后要说的是：不要把什么数据都放在 Cookie、localStorage 和 sessionStorage中，毕竟前端的安全性这么低。只要打开控制台就可以任意的修改 Cookie、localStorage 和 sessionStorage的数据了。涉及到金钱或者其他比较重要的信息，还是要存在后台比较好。

作者：OBKoro1

链接：https://juejin.im/post/5a191c47f265da43111fe859

来源：掘金

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。