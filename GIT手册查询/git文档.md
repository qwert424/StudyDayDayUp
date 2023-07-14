# git 常用命令。

## 分支

> 列出所有本地分支

```shell
$ git branch
```

> 列出所有远程分支

```shell
$ git branch -r
```

> 列出所有本地分支和远程分支

```shell
$ git branch -a
```

> 新建一个分支，但依然停留在当前分支

```shell
$ git branch [branch-name]
```

> 新建一个分支，并切换到该分支

```shell
$ git checkout -b [branch]
```

> 新建一个分支，指向指定commit

```shell
$ git branch [branch] [commit]
```

> 新建一个分支，与指定的远程分支建立追踪关系

```shell
$ git branch --track [branch] [remote-branch]
```

> 切换到指定分支，并更新工作区

```shell
$ git checkout [branch-name]
```

> 切换到上一个分支

```shell
$ git checkout -
```

> 建立追踪关系，在现有分支与指定的远程分支之间

```shell
$ git branch --set-upstream [branch] [remote-branch]
```

> 合并指定分支到当前分支

```shell
$ git merge [branch]
```

> 选择一个commit，合并进当前分支

```shell
$ git cherry-pick [commit]
```

> 删除分支

```shell
$ git branch -d [branch-name]
```

> 删除远程分支

```shell
$ git push origin --delete [branch-name]
```

## 标签

> 列出所有tag

```shell
$ git tag
```

> 新建一个tag在当前commit

```shell
$ git tag [tag]
```

> 新建一个tag在指定commit

```shell
$ git tag [tag] [commit]
```

> 删除本地tag

```shell
$ git tag -d [tag]
```

> 删除远程tag

```shell
$ git push origin :refs/tags/[tagName]
```

> 查看tag信息

```shell
$ git show [tag]
```

> 提交指定tag

```shell
$ git push [remote] [tag]
```

> 提交所有tag

```shell
$ git push [remote] --tags
```

> 新建一个分支，指向某个tag

```shell
$ git checkout -b [branch] [tag]
```

## 远程同步

> 下载远程仓库的所有变动
```shell
$ git fetch [remote]
```

> 显示所有远程仓库
```shell
$ git remote -v
```

> 显示某个远程仓库的信息
```shell
$ git remote show [remote]
```

> 增加一个新的远程仓库，并命名
```shell
$ git remote add [shortname] [url]
```

> 取回远程仓库的变化，并与本地分支合并
```shell
$ git pull [remote] [branch]
```

> 允许不相关历史提交,并强制合并
```shell
$ git pull origin master --allow-unrelated-histories
```

> 上传本地指定分支到远程仓库
```shell
$ git push [remote] [branch]
```

> 强行推送当前分支到远程仓库，即使有冲突
```shell
$ git push [remote] --force
```

> 推送所有分支到远程仓库
```shell
$ git push [remote] --all
```
