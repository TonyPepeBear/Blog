---
title: "Beautiful Terminal"
description: 打不贏別人，至少長得比他帥。最近終於把我的 Terminal 弄成自己喜歡的樣子，所以做一下簡單的紀錄，希望大家都可以把東西變成自己喜歡的樣子。
date: 2021-07-16T23:43:07+08:00
draft: false
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/939d8b79-aeab-465b-8bc7-fcf3cc4def00/public
tags: 
    - terminl
    - zsh
    - zim
    - powerlevel
    - powerlevel10k
    - nerd font
    - ubuntu
    - mac
categories:
    - Linux
---

打不贏別人，至少長得比他帥。最近終於把我的 Terminal 弄成自己喜歡的樣子，所以做一下簡單的紀錄，希望大家都可以把東西變成自己喜歡的樣子。

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210716235146.png)

<!--more-->

我們今天主要會用到下面的幾樣技術：

1. [zsh](https://zsh.sourceforge.io/)
2. [powerlevel10K](https://github.com/romkatv/powerlevel10k)
3. [zim](https://zimfw.sh/#install)
4. [Nerd Fonts](https://www.nerdfonts.com/)

看到這幾項技術其實可以自己先去研究一下，看看這些技術是不是自己需要的，以免亂裝一堆東西，搞的自己 Terminal 亂七八糟無法復原。另外，Windows 應該是無法安裝的，至少我自己是沒辦法，不過 WSL 倒是可以玩成這樣，畢竟就是 Linux 麻。

很多人會推薦在 mac 上安裝 iTerm，我自己是沒裝，我覺得 mac 內建的 Terminal 足夠好用，沒必要安裝其他 Terminal。

## Font

好看的第一步就是有好看的字體，[Nerd Fonts](https://www.nerdfonts.com/) 這個專案把一些開發者常用的字體，加上一些在 Terminal 中會用到的一些 icon 和 symbol，常見的 `Hack`、`Jetbrains Mono` 都有在這個專案裡。到 Nerd Fonts 的官網可以下載到這些字體，注意不要到字體們原本的管網下載，要到 Nerd Fonts 下載包含特殊符號的字體。

![img](https://www.nerdfonts.com/assets/img/sankey-glyphs-combined-diagram.png)

下載安裝好字體後，記得到自己的 Terminal 中變更字體，選擇有包含 Nerd 的字體，以免等等字體都無法顯示，這部分教學我懶得寫，所以附一張圖：

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210717112205.png)

## zsh

zsh 可以說是 bash 的進階版，提供客製化自己在 Terminal 中想要的主題和功能。要安裝 zsh 通常各個系統都不一樣，自己上網根據系統安裝即可。安裝完成後也要將預設 shell 改成 zsh。

ubuntu:

```bash
sudo apt install zsh
chsh -s /bin/zsh $USRR
```

## powerlevel10k

powerlevel10k 是一個 zsh 主題，提供可高客製化的主題和客製化嚮導，可以簡單地就把 Terminal 變成自己喜歡的模樣，也是本文最重要的部分。powerlevel10k 提供許多安裝方法，可以透過 oh-my-zsh，也可以用腳本安裝，我是認為用腳本安裝就好，可以不用用到 oh-my-zsh，因我們之後會提到 zim 就提供許多可以替代 oh-my-zsh 的功能。

用腳本安裝 powerlevel10k：

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
```

安裝方式可能會因版本變動而不一樣，建議還是到官方 Github 上看一下安裝方式。

安裝完成後第一次進到 Terminal 會遇到一個安裝嚮導，可以根據自己喜好設定主題樣式。

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210717214526.gif)

完成到這裡，Terminal 應該已經變得美美的，如果遇到亂碼，可能是字型沒有調整好。

powerlevel10k 會提供一個 `p10k` 的命令，可以用於重新啟動嚮導：

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210717174430.png)

## Zim

全名 Zsh IMproved FrameWork，主要是提供一些方便的 zsh plugin，像是自動補全、語法高亮等，如果是希望好看，不用好用，Zim 就可以不用安裝。

安裝 Zim 也很簡單，只要 Run 下面的腳本就可以：

```bash
curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh
```

到這就算是全部完成，如果有發現更多好用的 Terminal 工具，記得分享給我。

## Reference

* [zsh](https://zsh.sourceforge.io/)
* [powerlevel10K](https://github.com/romkatv/powerlevel10k)
* [zim](https://zimfw.sh/#install)
* [Nerd Fonts](https://www.nerdfonts.com/)
