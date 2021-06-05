---
title: "自架 Play With Docker"
date: 2021-06-05T16:08:29Z
draft: false
tags:
    - docker
    - play-with-docker
categories: 
    - docker
---

學過 Docker 的人都應該有用過 Docker Playground 來學習或是測試過軟體，不想在本機跑 Docker 可以先用 Docker Playground 試試看軟體可不可以跑。

官方已經有架設 [Docker Playground](https://labs.play-with-docker.com/)，可以讓大家方便使用，但我使用的時後常發現他會 Lag，也不知道是 Docker Server 的問題，還是臺灣網路的問題。剛好最近想要教社團 Docker，這樣我架好一個，大家就不需要準備環境，直接就可以開始學了。

本專案的 [GitHub](https://github.com/play-with-docker/play-with-docker)

## 準備環境

* Docker `18.06.0+`

* Go 最新版

以上的安裝兩個在這邊都不贅述，請自行參閱官方文檔。

## 開始部署

### 第一步：下載專案

```bash
git clone https://github.com/play-with-docker/play-with-docker
cd play-with-docker
```

### 第二步：確認驅動

其實我不是很確定這一步驟是要幹嘛，但是官方文檔有寫到，但是我在 Mac 上無法執行此命令，也可以順利部署。

```bash
sudo modprobe xt_ipvs
```

### 第三步：Docker swarm

```bash
docker swarm init
```

### 第四步：下載 image

這個 Image 是之後在 PWD 中創建容器時要用到的 Image。

```bash
docker pull franela/dind
```

### 第五步：go mod

這步也是非必要的，我也不懂 Golang 所以也不確定是要幹嘛。

```bash
go mod vendor
```

### 最後：啟動

```bash
docker-compose up
```

若沒有其他問題，理論上現在連接到 `http://localhost:80` 就可以看到 PWD 正在執行，也可以開始創建容器使用。 

## localhost or 404

上一段的最後寫到可以連接到 localhost，但如果你試著用 localhost 以外的方式連接，就會出現問題，不管是 `127.0.0.1` 或是用網址 `pwd.example.com` 之類的都沒有辦法連接到 PWD，會不斷地出現 404，就是只有 localhost 可以。官方的文件就寫到這裡，也沒寫解法，以下是我自己發現的解決方法。

基本上這個問題是 DNS 解析發生的問題，PWD 一次只能解析一種網址，預設是 `localhost`，我們可以去他的設定檔中變更他。

設定檔案在 `play-with-docker/config/config.go` 之中，其中會有一行長下面的樣子：

```go
flag.StringVar(&PlaygroundDomain, "playground-domain", "localhost", "Domain to use for the playground")
```

可以看到 PWD 這裡可以設定要解析的網址就是 `localhost`，所以只要將此變更為 `pwd.example.com`，就可以用這個網址連上 PWD。

### 連上容器內的 Port

就算做完上面的設定，也順利了啟動 Docker 容器，但最後才發現想要連上特定的 Port 還是會失敗，因為他是用子網域的方式去連線 `http://ip<hyphen-ip>-<session_jd>-<port>.direct.pwd.example.com`，所以又會遇到無法解析 DNS 的情況，我的解法是在 DNS 的設定中把 `pwd.example.com` 和 `*.pwd.example.com` 都加入 A Record，才順利連上。
