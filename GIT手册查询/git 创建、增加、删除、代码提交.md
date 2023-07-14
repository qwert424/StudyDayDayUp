# git 常用命令。

## 创建SSH Key
```shell
$ ssh-keygen -t rsa -C "youremail@example.com"
```
## 测试SSH Key配对
```shell
$ ssh -T git@gitee.com
```

## 配置用户信息
```shell
$ git config --global user.name "Your Name"             
$ git config --global user.email "email@example.com"
```

## 仓库
> 在当前目录新建一个Git代码库
```shell
$ git init
```

> 新建一个目录，将其初始化为Git代码库
```shell
$ git init [project-name]
```

> 下载一个项目和它的整个代码历史
```shell
$ git clone [url]
```
## 增加/删除文件
> 添加指定文件到暂存区
```shell
$ git add [file1] [file2] ...
```

> 添加指定目录到暂存区，包括子目录
```shell
$ git add [dir]
```

> 添加当前目录的所有文件到暂存区
```shell
$ git add .
```

> 添加每个变化前，都会要求确认
> 对于同一个文件的多处变化，可以实现分次提交
```shell
$ git add -p
```

> 删除工作区文件，并且将这次删除放入暂存区
```shell
$ git rm [file1] [file2] ...
```

> 停止追踪指定文件，但该文件会保留在工作区
```shell
$ git rm --cached [file]
```

> 改名文件，并且将这个改名放入暂存区
```shell
$ git mv [file-original] [file-renamed]
```
## 代码提交
> 提交暂存区到仓库区
```shell
$ git commit -m [message]
```

> 提交工作区自上次commit之后的变化，直接到仓库区
```shell
$ git commit -a
```

> 提交时显示所有diff信息
```shell
$ git commit -v
```

> 使用一次新的commit，替代上一次提交
> 如果代码没有任何新变化，则用来改写上一次commit的提交信息
```shell
$ git commit --amend -m [message]
```

> 重做上一次commit，并包括指定文件的新变化
```shell
$ git commit --amend [file1] [file2] ...
```
## 查看信息
> 显示有变更的文件
```shell
$ git status
```

> 显示当前分支的版本历史
```shell
$ git log
```

> 显示commit历史，以及每次commit发生变更的文件
```shell
$ git log --stat
```

> 搜索提交历史，根据关键词
```shell
$ git log -S [keyword]
```

> 显示某个commit之后的所有变动，每个commit占据一行
```shell
$ git log [tag] HEAD --pretty=format:%s
```

> 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
```shell
$ git log [tag] HEAD --grep feature
```

> 显示某个文件的版本历史，包括文件改名
```shell
$ git log --follow [file]
```

> 显示指定文件相关的每一次diff
```shell
$ git log -p [file]
```

> 显示过去5次提交
```shell
$ git log -5 --pretty --oneline
```

> 显示所有提交过的用户，按提交次数排序
```shell
$ git shortlog -sn
```

> 显示指定文件是什么人在什么时间修改过
```shell
$ git blame [file]
```

> 显示暂存区和工作区的差异
```shell
$ git diff
```

> 显示暂存区和上一个commit的差异
```shell
$ git diff --cached [file]
```

> 显示工作区与当前分支最新commit之间的差异
```shell
$ git diff HEAD
```

> 显示两次提交之间的差异
```shell
$ git diff [first-branch]...[second-branch]
```

> 显示今天你写了多少行代码
```shell
$ git diff --shortstat "@{0 day ago}"
```

> 显示某次提交的元数据和内容变化
```shell
$ git show [commit]
```

> 显示某次提交发生变化的文件
```shell
$ git show --name-only [commit]
```

> 显示某次提交时，某个文件的内容
```shell
$ git show [commit]:[filename]
```

> 显示当前分支的最近几次提交
```shell
$ git reflog
```

## 撤销
> 恢复暂存区的指定文件到工作区
```shell
$ git checkout [file]
```

> 恢复某个commit的指定文件到暂存区和工作区
```shell
$ git checkout [commit] [file]
```

> 恢复暂存区的所有文件到工作区
```shell
$ git checkout .
```

> 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
```shell
$ git reset [file]
```

> 重置暂存区与工作区，与上一次commit保持一致
```shell
$ git reset --hard 
```

> 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
```shell
$ git reset [commit]
```

> 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
```shell
$ git reset --hard [commit]
```

> 重置当前HEAD为指定commit，但保持暂存区和工作区不变
```shell
$ git reset --keep [commit]
```

> 新建一个commit，用来撤销指定commit
> 后者的所有变化都将被前者抵消，并且应用到当前分支
```shell
$ git revert [commit]
```

> 暂时将未提交的变化移除，稍后再移入
```shell
$ git stash
$ git stash pop
```

