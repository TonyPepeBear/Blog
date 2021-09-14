---
title: "Git Submodule"
date: 2021-09-14T05:11:27Z
draft: false
tags: 
    - git
    - submodule
    - linux
categories:
    - Git
---
要在一個 Git 專案中有子專案 (我稱為 git in git)，有兩個辦法，一個是直接 clone 到目錄下，另一個就是使用 submodule。兩者的不同是前者的子專案會在母專案中佔掉所有的空間，而後者只會紀錄 submodule 的路徑和 commit 版本。

<!--more-->

## Add Submodule

要將專案新增到現有的目錄中，可以使用 `git submodule add`：

```shell
git submodule add <repo_url> <folder>
```

執行後，可以看到 git 會自動幫你把 submodule clone 到指定的目錄中，並多了一個檔案 `.gitmodules`，這個檔案就是上面說到的 Submodule 只紀錄 commit 版本，和 Submodule URL 的檔案。

add submodule 後，還是要 commit，因為 Submodule 也就只是紀錄要用子專案的哪一個 commit 版本，所以也可以確保大家都是使用到同一個 Submodule 的版本。可以試著將專案 commit and push 到 GitHub 上，應該可以看到 Submodule 就是連結到另外一個專案的某一個 commit，下面是本站的 Hugo 主題的 submodule：

![image](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210913/CleanShot%202021-09-13%20at%2021.31.12@2x.63e3xkepuq80.png)

## Clone Submodule

在 Clone 含有 Submodule 的專案時，Git 預設是不會自動 clone 子專案的，需要加上 `--recursive` 這個參數，才會自動把 Submodule 也 Clone 下來。

```shell
git clone --recursive <repo_url>
```

如果 Clone 下來後才發現有 Submodule，可以用下面的方式補救，把子專案都 Clone 下來：

```shell
git submodule init
git submodule update --recursive
```
