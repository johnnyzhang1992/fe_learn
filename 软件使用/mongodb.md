**选择Homebrew安装**

1. 更新Homebrew：brew update
2. 安装：brew install mongodb
3. 安装最新开发版本：brew install mongodb --devel

**启动和运行MongoDB：**

1. 创建默认数据库目录：sudo mkdir -p /data/db
2. 给db设置读写执行权限：sudo chmod 777 db
3. 直接运行：mongod(使用**Homebrew不用自己配置环境变量，手动安装就需要配置)**
4. 如果想设置其他的目录（即非/data/db）：mongod --dbpath <path to data directory>
5. 运行成功会显示：[initandlisten] waiting for connections on port 27017
6. 启动[mongo](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell：mongo --host 127.0.0.1:27017
7. 中止mongo shell：ctr+c

```bash
brew services start mongodb # 开启服务

brew services stop mongodb # 关闭服务
```



```bash
show dbs
show collections # users
use <dbname>
# 按条件查询集合
db.users.find().pretty()
db.users.find({email:'test@test.com'}).pretty();

db.users.count() # 集合内文档条数
```

