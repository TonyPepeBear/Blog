---
title: "Docker"
date: 2021-08-25T18:31:57Z
draft: false
tags: 
    - docker
categories:
    - Docker
---

Docker 是一個虛擬化技術，可以將我們編寫好的程式包裹成一個小的「容器」，再發佈到伺服器上。Docker 解決了困擾程式界多年來的環境問題，只要伺服器安裝了 Docker 就可以確保一定可以執行服務。

<!--more-->

## Docker v.s. VM

入門 Docker 最常見的問題就是，Docker 和 VM 差在哪裡？這個問題不難理解，VM 「虛擬機」，顧名思義是虛擬化「硬體」。而 Docker 則是只虛擬化作業系統，或是稱作「軟體」。

大家都應該知道每創建一個虛擬機，都會耗費掉數分鐘的時間，若還要安裝環境，那耗費的時間則會相當可觀，也會耗費掉相當大的硬體資源。Docker 只虛擬化軟體的優勢，就是可以在幾秒內就啟動服務，耗費資源也相當少，還省去了建立環境的時間。

## Docker Hub

> Git 有 GitHub，Docker 有 Docker Hub

Docker Hub 是 Docker 官方用來存放 Image 的倉庫 (Registry)，使用者也可以自架 Registry，但是如果未指定 Registry，Docker 預設會去找 Docker Hub 上的 Image。

## Image

Image 通常可以是一個系統，也可以是一個已經安裝好特定執行環境 (像是 JAVA) 的系統。系統部分最常見的會是用 alpine linux，這是一個非常小的項目，只有一個系統，可以讓你在幾秒內就可以啟動服務，許多執行環境也會建構在這個系統上。現在可以先去 Docker Hub 上看看幾個前幾名的 Image，大概就會比較清楚 Image 的功用。

Docker Image 可以由下列幾方式取得：

- 從 Docker Hub 上下載
- 由 Dockerfile 構建
- 從其他電腦 import

## Container

Docker 用 Image 創建 Container，也就是說，Container 是 Image 的實例，Container 基本上就是一個完整的作業系統，可以執行任何的程式。

## Docker Run

我們簡單創建一個 Ubuntu 的 Container，並且啟動它：

```bash
docker run ubuntu
```

執行後可以看到 Docker 自動從 Docker Hub 上下載 Ubuntu 的 Image，但是開始執行後卻甚麼都沒發生就結束了。這是因為 Ubuntu 的 Image 預設是啟動一個 Shell，如果沒有 Attach 到 Sheel 上，Container 馬上就結束了。

所以如果我們要 Attach 到 Ubuntu 的 Shell 上，可以這樣執行：

```bash
docker run -it ubuntu
```

執行應該就會看到我們到 ubuntu 的 Shell 裡。

## 啟動一個網頁服務

Nginx 有官方的 Hello Image，可以更清楚的看到 Container 有在執行 Nginx 服務。

```bash
docker run -p 8080:80 -d nginxdemos/hello
```

上面多了一個 `-p` 的參數，後面跟上 `8080:80`，意思是本機的 8080 Port 對到容器的 80 Port，這樣就可以讓我們在本機的 8080 Port 上看到 Nginx 的網頁了。

## 創建自己的 Image

要教 Docker 怎麼創建 Image，需要先建立一個 `Dockerfile`：

```dockerfile
FROM ubuntu:latest

RUN apt update \
    && apt install vim git -y \
    && rm -rf /var/lib/apt/lists/*

CMD ["/bin/bash"]
```

Build Image:

```bash
docker build -t my-ubuntu .
```
