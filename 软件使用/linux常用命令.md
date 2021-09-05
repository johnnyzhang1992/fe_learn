```bash
# 删除文件
rm -rf /  ;lunix

# 复制文件夹内的内容到另一个文件夹
cp -rf dist/* build/
# 移除当前目录下的所有文件
rm -rf ./*
# 新建文件
touch 
# 移动文件
rsync -r /data/src/a/build_dev/*  /data/src/a/build/
# 修改权限
# 修改文件所有人
chown -R nginx:nginx    /data/src/beeh5jp-wap

# 登录远程服务器
ssh -p 22 [用户名]@[ip地址] 

# 查看linux系统中tcp连接的状态和连接数量统计
etstat -an | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'
# php 
service php7.1-fpm start
service php7.1-fpm stop
service php7.1-fpm restart

# linux
1.从服务器下载文件：
scp root@197.2.2.1:/xxx/xxx.xxx  e:/test/
2.从本地上传文件到服务器
scp e:/test/test.log  root@197.2.2.1:/text
```

