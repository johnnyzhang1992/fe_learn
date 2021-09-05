**1、读取 url 的某个参数值：**

```js
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
```

调用方法：var nameVal=GetQueryString("URL 上的参数名");

例如 url 为：http://www.aazj.cn/pc/meeting/card.html?skinColor=30&gid=-1&userId=566&modid=1133&puid=9

那么

var userIdVal=GetQueryString("userId") //值就等于 566

**2、修改 url 的某个参数值：**

```js
function replaceParamVal(paramName,replaceWith) {
    var oUrl = this.location.href.toString();
    var re=eval('/('+ paramName+'=)([^&]*)/gi');
    var nUrl = oUrl.replace(re,paramName+'='+replaceWith);
    //this.location = nUrl;
　　//window.location.href=nUrl
　　window.history.pushState(state, title, nUrl)
}
```

例如 url 为：http://www.aazj.cn/pc/meeting/card.html?skinColor=30&gid=-1&userId=566&modid=1133&puid=9

如果希望修改 userId 的值为 333，那么调用方法：replaceParamVal("userId","333")

URL 就会变成：http://www.aazj.cn/pc/meeting/card.html?skinColor=30&gid=-1&userId=333&modid=1133&puid=9

然后自动跳转到新的 url。

```js
window.history.pushState(state, title, url)
```
