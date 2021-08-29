---
title: "Ubuntu 開機黑屏"
date: 2021-06-06T01:17:17+08:00
draft: false
tags:
    - ubuntu
categories:
    - Ubuntu
---

我目前的工作環境都是用 Ubuntu ~~(被 Windows 氣到)~~，前幾天我重新安裝 Ubuntu 的時候，一直安裝失敗，重新安裝四、五次後都沒有畫面，最後才發現是顯卡驅動問題。

> 聽說 Ubuntu 開機沒有畫面或是只有 Logo，十次有九次都是顯卡驅動的問題

<!--more-->

## 解決問題

在開機引導時會看到這個畫面，立馬按下鍵盤上的 `c` 鍵。

![img](https://i.stack.imgur.com/8RYuZ.png)

按下 c 後，會以下畫面，找到 `quite splash`。

![img](https://i.stack.imgur.com/0Cfhc.png)

把 `quite splash` 改成 `nomodeset`，不要懷疑，把兩個字刪掉，改成一個字，改錯也沒關係，下次重開就會復原。

改完後，按下 `f10` 應該就可以順利進入系統，只是是在沒有顯卡驅動的狀態，畫面可能非常不流暢，所以我們現在來安裝顯卡驅動。

## 顯卡驅動

開啟 Terminal，輸入下面的指令，可以自動檢查顯卡的驅動

```bash
sudo ubuntu-drivers devices
```

應該可以看到其中一項後面有 recommended，基本上安裝那個版本就沒有問題。下面我們直接用自動安裝的方式安裝推薦的驅動。

```bash
sudo ubuntu-drivers autoinstall
```

如果你懶的關心 `autoinstall` 會幫你安裝哪個版本，基本上直接執行上面的指令就可以解決問題了。

安裝完成後重開機，如果沒有遇到其他問題，這樣應該就可以順利進入系統了。

## Reference

* [My computer boots to a black screen, what options do I have to fix it?](https://askubuntu.com/questions/162075/my-computer-boots-to-a-black-screen-what-options-do-i-have-to-fix-it)
