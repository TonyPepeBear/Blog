---
title: "GitHub SSH"
description: 在本機與 GitHub 溝通最安全的方式就是透過 ssh，最大的好處就是不需要輸入帳號密碼來確認身分，也可以享受到 ssh 加密所提供的安全性。
date: 2021-09-12T14:32:19Z
draft: false
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/8fdd1b8a-21b2-4d15-9947-a6bdcc6f1000/public
tags: 
    - git
    - github
    - ssh
categories:
    - Git
---

在本機與 GitHub 溝通最安全的方式就是透過 ssh，最大的好處就是不需要輸入帳號密碼來確認身分，也可以享受到 ssh 加密所提供的安全性。

<!--more-->

## ssh-keygen

要使用 ssh 非對稱加密，就會需要公鑰與私鑰，創建 ssh key 的方法就是 `ssh-keygen`：

```shell
user@66c0bf85e710:~$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa):
Created directory '/home/user/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/user/.ssh/id_rsa
Your public key has been saved in /home/user/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:+UUuTN0YLUi2eh7HJoJvuy0whUuLvXIQejjPPTZ9gw4 user@66c0bf85e710
The key's randomart image is:
+---[RSA 3072]----+
|         .o...   |
|         ..o.+.  |
|       .  o +..  |
|    . o..= +     |
|   o =.+S * *    |
|  + + *. = B     |
|   = oE=o.o      |
|    + Bo+oo      |
|     + +++..     |
+----[SHA256]-----+
```

`ssh-keygen` 會問一些問題，最快的方式就是直接留白(保持預設)，一直按 enter 就可以看到已經在 `~/.ssh` 產生了兩個檔案：

```shell
user@66c0bf85e710:~$ ls -l ~/.ssh
total 8
-rw------- 1 user user 2602 Sep 12 22:42 id_rsa
-rw-r--r-- 1 user user  571 Sep 12 22:42 id_rsa.pub
user@66c0bf85e710:~$
```

`id_rsa` 就是私鑰，而多個 pub 結尾的 `id_rsa.pub` 就是公鑰。私鑰請不要傳給任何人，公鑰則提供給 GitHub。可以用 cat 將公鑰顯示出來並複製他：

![image](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210912/image.714d829xbug0.png)

## 把公鑰交給 GitHub

到 GitHub 的 Settings -> SSH and GPG keys -> New SSH key：

![image](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210912/image.5frveu05dt00.png)

把剛剛複製下來的公鑰貼上，Title 可以自己隨便輸入或打這台電腦的名字：

![image](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210912/image.56vkhmb55ps0.png)

## 測試連線

輸入下面命令就可以知道有沒有連線成功，如果有看到自己的使用者名稱，就代表已經完成 ssh 的認證：

```shell
ssh -T git@github.com
```

![image](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210912/image.5f99gnzo3ps0.png)

第一次連線可能會問要不要信任，輸入 `yes` 即可。

> 如果覺得上面的方法麻煩，也可以直接創建一個私有 repo，然後試著 clone 和 push，就知道有沒有認證成功了。

## Reference

* [Testing your SSH connection](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/testing-your-ssh-connection)
