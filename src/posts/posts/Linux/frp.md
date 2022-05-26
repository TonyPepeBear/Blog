---
title: "Frp"
description: frp 全名是 fast reverse proxy，可以將在 NAT 後方的服務快速的發布到公網 ip 上，可以支援 TCP 和 UDP 協議，我覺得唯一的缺點就是所有流量都會經過 Server 端，所以如果 Server 端的流量有限制就需要注意一下。
date: 2021-06-20T21:48:33+08:00
draft: false
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/34046c81-cb6e-40a5-7b3a-8623c613f400/public
tags:
  - frp
  - linux
categories:
  - Linux
---

frp 全名是 fast reverse proxy，可以將在 NAT 後方的服務快速的發布到公網 ip 上，可以支援 TCP 和 UDP 協議，我覺得唯一的缺點就是所有流量都會經過 Server 端，所以如果 Server 端的流量有限制就需要注意一下。

<!--more-->

frp 會需要一台 Server，Server 需要公網 ip，如果沒有公網 ip，可以使用 aws 或 gcp 買一個簡單的 VPS。

## 安裝

網路上有許多一鍵安裝的到腳本，但我們不使用那些，有興趣的自己上網搜尋。

到官方 [Release](https://github.com/fatedier/frp/releases) 下載最新版，根據系統選擇，解壓後會看到 `frps` 、`frpc` 各有三個檔案，跟 `frps` 有關的就是 Server 端用的，`frpc` 的就是 Client 端用的。如果是 Server 端，就可以將 `frpc` 的檔案都刪除。

## Server 端設定

在 Server 上打開設定文件 `frps.ini` 可以看到預設就有如下的內容：

```ini
[common]
bind_port = 7000
```

`common` 內綁定了 7000 port，這個 port 是讓 client 端連接用的，基本現在不用改設定就可以直接用。執行 `frps` 要用 `-c` 參數給定設定檔案：

```shell
./frps -c ./frps.ini
```

如果沒看到問題，基本上 Server 端就設定好了，其他功能晚點再介紹，我們先設定好 Client。

## Client 端設定

Client 就是要發布服務伺服器，所以雖然叫做 Client 但本身應該也是一台提供服務的 Server。Client 就可以刪除有關 `frps` 相關的檔案。

一樣先打開設定檔 `frpc.ini`，也會有如下預設內容：

```ini
[common]
server_addr = 127.0.0.1
server_port = 7000

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000
```

Client 端的設定檔就不能直接用，需要修改 Server ip 才行，更改 `server_addr` 為剛剛 Server 端的 ip 地址或是 Domain 都可以。

下方方的 ssh 區塊設一個將 Client 端的 ssh 22 port 公開到 Server 端的 6000 port 的範本，如果有其他的 port 要開放，用相同的思維更改即可。像是如過要加 Minecraft 25565 port 也到 Server 端的 25565 port，就可以新增一個區塊：

```ini
[common]
server_addr = example.com
server_port = 7000

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000

[minecraft]
type = tcp
local_ip = 127.0.0.1
local_port = 25565
remote_port = 25565
```

到目前為止應該就可以用 Server 端的 ip 連接到 Client 端了，如果連不上，可能要檢查一下 Server 端防火牆的設定，這邊就不贅述。

## Token 認證

不知道大家有沒有發現，基本上只要知道你 Server ip 或 domain 的人都可以新增自己的 port，要避免這樣的狀況，我們可以使用 token。使用方法也很簡單，只要在 Server 和 Client 端的 `[common]` 都加上相同的 token 參數，就可以進行簡單的認證。

Server 端範例：

```ini
[common]
bind_port = 7000
token = 7Jc2ZCvVzHu
```

Client 端範例：

```ini
[common]
server_addr = example.com
server_port = 7000
token = 7Jc2ZCvVzHu

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000
```

## Refrence

[GitHub](https://github.com/fatedier/frp)

[中文文檔](https://gofrp.org/docs/)
