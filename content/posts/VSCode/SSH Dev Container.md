---
title: "VSCode SSH 連入 Docker Container"
date: 2022-05-21T14:07:16Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/0f3867f8-dd79-482c-1f27-a7a166f7dc00/public
draft: false
tags:
  - vscode
  - ssh
  - docker
categories:
  - VSCode
---

為什麼要在 Container 中 Coding？因爲開發中最大的難題總是在環境建置，好不容易建置好環境，要寫下個專案時，因為電腦已經髒兮兮，安裝環境時就會容易衝到版本，而造成惡性循環，環境建置一次比一次困難，最後發現重灌電腦最快。在 Container 中 Coding 就可以簡單用完即丟，每次都可以在乾淨的電腦安裝環境，裝任何東西也不怕把本機弄髒，在 Windows 上更可以簡單的在 Linux 中開發。

<!--more-->

在 Container 裡 Coding 已經不是什麼新鮮事，VSCode 的官方就有提供 [Developing inside a Container](https://code.visualstudio.com/docs/remote/containers) 的官方文件，可以用本機的 Docker 快速的產生 Container 並且在裡面開發。壞處就是只能在本機連線，如果有多台電腦想要共同開發的需求，就只好用今天要介紹的方式，用 SSH 連入 Container，只要連得上 SSH 就可以開發，開發時也不用被侷限在一台電腦的 Docker 上。當然，最大的缺點就是要有一台一直運作著 Docker 的 Server 可以讓你隨時連線。GitHub 有一個 [Codespace](https://github.com/features/codespaces) 的功能，就是很類似的想法，Code in Cloud，但畢竟是企業的收費服務，我之前有抽到預覽版，到現在都可以免費使用，是真的很方便的功能，也就是他的方便，讓我想研究如何自己架類似的服務。

## Dockerfile

簡單來說就是創建一個已經被預裝 SSH Server 的 Linux，我們今天就用 Ubuntu，然後順便預裝一些開發中常會用到套件，像是 `git`, `vim` 等等。

> 如果想跳過這步驟，用我創建好的 Image 可以拉到下一個章節去看

```Dockerfile
ARG UBUNTU_VERSION=latest

FROM ubuntu:${UBUNTU_VERSION}

ENV DEBIAN_FRONTEND noninteractive

RUN apt update \
    && apt install -y openssh-server ssh sudo git vim \
    && useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1000 ubuntu \
    && echo "ubuntu:ubuntu" | chpasswd \
    && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers \
    && service ssh start

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]
```

可以看到我把帳號密碼都設置為 `ubuntu`，然後讓 `sudo` 時可以不用密碼。然後安裝啟動 ssh service，最後開啟 22 port。用下面的 Docker 指令就可以創建自己的 Image：

```shell
docker build -t ssh-ubuntu .
```

### 我構建好的 Image

我有創一個 GitHub Repo 放我的 Dockerfile，並用 GitHub Actions + Packages 來發布 Image，Image 名稱為 `ghcr.io/tonypepebear/ssh-dev-ubuntu`。

[Package 網址](https://github.com/TonyPepeBear/ssh-dev-container/pkgs/container/ssh-dev-ubuntu)

## 啟動 Container 並 SSH 連入

啟動 Container 並把 22 Port 弄出來，我是映射到 8222：

```shell
docker run -dp 8222:22 ssh-ubuntu

如果要用我的 Image：
docker run -dp 8222:22 ghcr.io/tonypepebear/ssh-dev-ubuntu
```

SSH 連入，詢問密碼就是 `ubuntu`：

```shell
ssh -p 8222 ubuntu@localhost
```

如果沒發生問題，到現在應該就可以順利的連到 Container 中。

## VSCode SSH 連線

需要先在 VSCode 中安裝 Remote - SSH 套件，如圖：

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/be8ec8dc-8900-4cbe-1587-45fa6f3f6500/public)

安裝完成後，點擊最左下角的 Remote 功能，再選擇 Connect to SSH Host，輸入 SSH 指令 `ssh -p 8222 ubuntu@localhost`，就可以順利連到 Container 中。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/960ea18c-82c7-4ce1-73d3-8ff092f2b000/public)

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/814b9dac-f39d-4d07-1095-2d280cd5e300/public)

## 後記

其實我也不會每個專案都新增一個新的 Container，而是用到我受不了或衝突到後，才創建一個新的，畢竟每次創新的 Container 也是有點麻煩，但是能讓我在安裝一些亂七八糟的環境 (就是在說你們 npm, pip) 時，可以大膽地按下去，不用擔心把電腦搞到受不了才是重點。希望大家在開發的路上可以更加順利。

另外，VSCode 的 SSH 連線功能真的做的不錯，甚至可以 Port Forwarding，在開發網頁的時候不用在 Docker 中多 Forwarding 一個 Port，可以隨時用 VSCode Forwarding 到本機上。

## Reference

- [Remote Development using SSH](https://code.visualstudio.com/docs/remote/ssh)
