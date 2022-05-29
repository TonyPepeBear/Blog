---
title: "一些 Command Line 技巧"
date: 2022-05-25T15:27:30Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/9dfac9e4-1de1-43dc-eead-381301a1b500/public
draft: false
tags:
  - linux
  - ubuntu
  - mac
  - command
  - max
categories:
  - Linux
---

記錄一些我怕忘的 Command Line 技巧，當作字典用。

<!--more-->

## 清螢幕

`clear` 或是 `ctrl + L`

## 家目錄

`~` 波浪符就是代表家目錄

```bash
/etc$ cd ~

~$
```

## 預設文字編輯器

有時預設的文字編輯器不是 vim，而是 `nano` 或是 `emacs`，在打 git 指令時，會進錯編輯器。只要在 `.bashrc` 中加入以下兩行：

```bash
export EDITOR=vim
export VISUAL=vim
```

## 變更 rc file 後馬上生效

`source ~/.bashrc`

## 返回上一個路徑

`cd -`

```bash
~$ cd /etc

/etc$ cd /var

/var$ cd -

/etc$ cd ~

~$
```

## 把路徑放進 Stack

`pushd` 把現在的路徑推進 Stack，並 cd 到後面的參數

`popd` 拿出來

```bash
/etc$ pushd /var
/var /etc

/var$ pushd /home
/home /var /etc

/home$ cd ~

~$ cd /var/

~$ cd /var/lib/

/var/lib$ popd
/var /etc

/var$ popd
/etc

/etc$
```

## 把工作放到背景

`ctrl + z`

注意，這會暫停整個 process，並不是放到背景執行

```bash
~$ vim /proc/cpuinfo

[1]+  Stopped                 vim /proc/cpuinfo

~$
```

`fg` (foreground) 把放到背景的 process 取回前景繼續執行

Shell 結束時，所有被暫停的 process 也會一起被殺掉

## 重複上一個 Command

`!!` 就是代表上一個 Command

```bash
~$ echo HI
HI

~$ !!
echo HI
HI

~$
```

這是可以組合技的：忘記打 sudo 就 `sudo !!`

```bash
~$ apt update
Reading package lists... Done
E: Could not open lock file /var/lib/apt/lists/lock - open (13: Permission denied)
E: Unable to lock directory /var/lib/apt/lists/

~$ sudo !!
sudo apt update
Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Get:3 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [109 kB]
Get:4 http://archive.ubuntu.com/ubuntu jammy-backports InRelease [99.8 kB]
Get:5 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 Packages [230 kB]
Get:6 http://archive.ubuntu.com/ubuntu jammy-updates/restricted amd64 Packages [143 kB]
Fetched 693 kB in 2s (328 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
1 package can be upgraded. Run 'apt list --upgradable' to see it.
~$
```

## sudo 不輸入密碼

只要讓下面那一行出現在 `/etc/sudoers` 中就可以：

```text
%sudo ALL=(ALL) NOPASSWD:ALL
```

或是直接輸入 (with root)：

```bash
(root) ~$ echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
```

## 搜尋打過的指令

`ctrl + r`，然後打上部分記得的指令，就會自動補完

## 輸出導進 less

有時指令輸出很長，需要翻頁顯示時，可以用 `|` 導入 `less`

```bash
~$ cat /proc/cpuinfo | less
```

## 清掉一整行

`ctrl + u` 把還沒 enter 的指令清掉

## 光標到最前或最後

`ctrl + a` 移動光標到最前

`ctrl + e` 移動光標到最後

## 連續執行指令

`;` 不管前面有沒有成功，都執行後面的命令

`&&` 要前面得執行成功，才執行後面的命令

```bash
~$ ls / ; echo hi
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
hi

~$ ls / && echo hi
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
hi

~$ ls /no_such_dir ; echo hi
ls: cannot access '/no_such_dir': No such file or directory
hi

~$ ls /no_such_dir && echo hi
ls: cannot access '/no_such_dir': No such file or directory
```

## Reference

- [18 Commands That Will Change The Way You Use Linux Forever](https://youtube.com/watch?v=AVXYq8aL47Q)
