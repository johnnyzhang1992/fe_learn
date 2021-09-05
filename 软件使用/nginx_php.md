# nginx+php

```bash
start nginx.exe
.\nginx -s stop
.\nginx -s reload
.\nginx -s quite/stop

netstat -aon|findstr "80" //查看占用80端口的进程
```

```bash
 .\php-cgi.exe -b 127.0.0.1:9000 -c php.ini
```

## React 项目部署

```bash
# ant-desgin-pro
umi block add https://github.com/umijs/umi-blocks/tree/master/blank --path=blank
npx umi block add https://github.com/umijs/umi-blocks/tree/master/ant-design-pro/AccountCenter --path=/account/center
umi dev 
umi build
server ./dist

server {
    listen 80;
    server_name h5.test.beerebate.cn;
    root /var/www/html/home;
    error_log  /var/log/nginx/h5_error.log;

    index index.html;

    #add_header X-Frame-Options "ALLOWALL";
    add_header X-xss-Protection "1; mode=block";
    location / {
        #try_files $uri /index.html;
        add_header Access-Control-Allow-Origin *;
        #add_header X-Frame-Options ALLOWALL;
        add_header X-Frame-Options "http://h5test.starimg.cn/";
        add_header Content-Security-Policy "http://h5test.starimg.cn/";
        try_files $uri /index.html;
        }

}
```

