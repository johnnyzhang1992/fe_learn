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

## 统计相关

```bash
# 统计用户代码提交次数
git log --since==2018-01-01 --pretty="%aN" | sort | uniq -c | sort -k1 -n -r | head -n 5
# 统计用户的提交行数
git log --author="zq19920306" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, l
oc }'
```
