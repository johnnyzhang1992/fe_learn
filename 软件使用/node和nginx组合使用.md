# 如何将 node 和 nginx 在服务器组合使用

- 服务器环境 linux、centos
- 依赖
  - node
  - nginx

下面已[express](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.expressjs.com.cn%2F)为例子

```js
<!-- node服务 -->
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(1234, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
```

在服务端使用 node 和在客户端是基本一致的，使用 pm2 开启 node 服务，那么此时的 node 接口就是 [htpp://locahost:1234](https://links.jianshu.com/go?to=htpp%3A%2F%2Flocahost%3A1234)，但是在客户端无法直接访问。
那么我们就需要代理服务器，使用 nginx 反向代理 node 服务接口，代码如下

```bash
<!-- nginx代理node 接口 -->
server {
        listen      80;
        server_name  www.xxx.com; # 域名地址

        # 开启gzip压缩
        gzip on;

        location /{
            proxy_set_header    X-Real-IP $remote_addr;
            proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header    Host  $http_host;
            proxy_set_header    X-Nginx-Proxy true;
            proxy_set_header    Connection "";
            proxy_pass http://localhost:1234;
        }
}
```

启动 nginx，那么此时我们可以就可以通过 [www.xxx.com](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.xxx.com) 调用 node 接口了。
