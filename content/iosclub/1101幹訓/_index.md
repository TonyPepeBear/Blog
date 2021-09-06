---
title: "iOS Club 1101 幹訓"
date: 2021-08-20T16:04:06Z
draft: false
---

> 本文限於 iOS Club 內部使用

## 課程教材

* [Command and Git](https://drive.google.com/file/d/1SUcLFZc3rxJg3X8tXbayVtMRZxAOOWFY/view?usp=sharing)
* [Docker](/posts/docker/docker/)
* [Web Basic](/posts/web/web-basic/)
* [Markdown](/posts/others/markdown/)

## PyCharm Community

```bash
docker run -dp 8887:8887 -p 8080:8080 tonypepe/pycharmc
```

## Visual Studio Code (Code-Server)

```bash
docker run -de PASSWORD=0 -p 8080:8080 -p 8081:8081 codercom/code-server
```

### Install VIM

```bash
sudo apt update
sudo apt install vim -y
export EDITOR=vim
```
