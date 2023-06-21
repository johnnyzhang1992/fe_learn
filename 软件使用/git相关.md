# git 常用命令

```bash
# 查看全局git设置
git config --global --list
git config --global user.name "johnnyzhang"
git config --global user.email "a@b.com"

git fetch --all
git pull origin develop
# git 拉取远程未关联的分支内容
git pull origin develop --allow-unrelated-histories

# 关联本地和远程分支
git branch --set-upstream-to=origin/master master
# 查看所有分支 本地加远程
git branch -a
# 查看本地所有分支
git branch
#切换本地分支
git checkout  develop
#创建本地分支并关联远程分支
git checkout -b <本地分支名> <远程主机名>/<远程分支名>

git init
git remote -v
git remote add origin "远程仓库地址"
# 删除远程仓库关联
git remote remove origin
# 重置地址
git remote set-url origin "远程仓库地址"

# 当远程仓库内分支已删除，本地对应分支仍存在是
git fetch origin --prune

# 删除了仓库中的文件
# 后续不想跟踪此文件,只需将此文件加入 .gitignore 中即可
# 全部文件
git rm --cached .
# 某个文件
git rm --cached a.js

# 查看大小写敏感设置
git config --get core.ignorecase
# 关闭git忽略大小写配置，即可检测到大小写名称更改
git config core.ignorecase false
```

## 子模块 submodule

若发现项目根目录下存在 `.gitmodules` 文件，说明该项目可能存在子模块。此时就要注意加载子模块了。

项目中经常使用别人维护的模块，在git中使用子模块的功能能够大大提高开发效率。

使用子模块后，不必负责子模块的维护，只需要在必要的时候同步更新子模块即可。

### 子模块的添加

添加子模块

```bash
git submodule add <url> <path>
```

- url为子模块的路径
- path为该子模块存储的目录路径。

执行成功后，`git status`  会看到项目中修改了`.gitmodules`，并增加了一个新文件（为刚刚添加的路径）

`git diff --cached` 查看修改内容可以看到增加了子模块，并且新文件下为子模块的提交hash摘要

`git commit` 提交即完成子模块的添加

### 子模块的使用

克隆项目后，默认子模块目录下无任何内容。需要在项目根目录执行如下命令完成子模块的下载：

```bash
git submodule init
git submodule update
#或：
git submodule update --init --recursive
# 执行后，子模块目录下就有了源码，自动拉取子模块代码
```

### 子模块的更新

子模块的维护者提交了更新后，使用子模块的项目必须手动更新才能包含最新的提交。

在项目中

- 进入到子模块目录下，
- 执行 git pull更新
- 查看git log查看相应提交
- 完成后返回到项目目录，可以看到子模块有待提交的更新
- 使用git add，提交即可。

### 删除子模块

有时子模块的项目维护地址发生了变化，或者需要替换子模块，就需要删除原有的子模块。

删除子模块较复杂，步骤如下：

```bash
rm -rf # 子模块目录 删除子模块目录及源码
vi .gitmodules # 删除项目目录下.gitmodules文件中子模块相关条目
vi .git/config # 删除配置项中子模块相关条目
rm .git/module/* # 删除模块下的子模块目录，每个子模块对应一个目录，注意只删除对应的子模块目录即可
```

执行完成后，再执行添加子模块命令即可，如果仍然报错，执行如下：

```bash
git rm --cached # 子模块名称
# 完成删除后，提交到仓库即可。
```

## 统计相关

```bash
# 统计用户代码提交次数
git log --since==2018-01-01 --pretty="%aN" | sort | uniq -c | sort -k1 -n -r | head -n 5
# 统计用户的提交行数
git log --author="zq19920306" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, l
oc }'
```
