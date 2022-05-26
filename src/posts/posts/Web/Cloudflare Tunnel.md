---
title: "Cloudflare Tunnel"
description: Cloudflare 真的是佛心公司，提供免費的 DNS、DDoS 防護，還可以拿來託管靜態網頁，而今天是介紹他們公司的 Tunnel，這個服務可以將本地電腦的特定 port 開放到網路上，而且完全免費，在台灣的速度也不慢，真的很佛，幾乎等於拿到免費的 IPv4。
date: 2021-08-13T15:17:39+08:00
draft: false
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/00e85cf1-4c03-45ea-004c-f61e6216d400/public
tags:
  - cloudflare
  - tunnel
  - teams
  - cloudflare-tunnel
categories:
  - Web
---

Cloudflare 真的是佛心公司，提供免費的 DNS、DDoS 防護，還可以拿來託管靜態網頁，而今天是介紹他們公司的 Tunnel，這個服務可以將本地電腦的特定 port 開放到網路上，而且完全免費，在台灣的速度也不慢，真的很佛，幾乎等於拿到免費的 IPv4。

我覺得目前的缺點就是網路上相關的資料比較少，遇到問題很難找到資料參考，因為他其實主要是 Cloudflare 的一項零信任服務，目標客群都是一些厲害的網管，所以官方寫的文件也都很深奧，如果是新手可能會頭昏眼花。

<!--more-->

這一項服務可以先不用帳號就能試用，不過就不能自訂 Domain，我會先介紹免登入的，再介紹要登入的。第一步還是要在本地先安裝環境。

## 安裝 cloudflared

### 全系統適用

注意 Cloudflare 後面多了一個 `d`，這是他連上 Tunnel 的必要程式，是用 Go 編寫，安裝方式就是到[官方 Github](https://github.com/cloudflare/cloudflared/releases)下載符合自己環境的執行檔。

### macOS

mac 可以用 Homebrew 安裝：

```sh
brew install cloudflare/cloudflare/cloudflared
```

### Windows

Windows 永遠是最麻煩的，下載完執行檔後，隨便丟到一個資料夾，然後加到 PATH 裡。

### Update

要更新這個執行檔，只要 Run 下面的指令，另外，Windows 不支援自動更新，要更新就只能手動下載覆蓋：

```sh
cloudflared update
```

## 免登入測試 Tunnel

```sh
cloudflared tunnel --url http://localhost:8080
```

執行上面的指令，就可以將本地電腦的 8080 port 用 http 公開到網路上，應該會看到輸出中會給一串個 `*-*-*.trycloudflare.com` 的網址，現在只要訪問那個網址，就可以發現本地的網頁已經可以從全網連到，不需註冊，也不用設定複雜的 Domain，還不限流量。

## 登入 Cloudflare

第一步就是先登入 Cloudflare 的帳號，也要有一個已經託管給 Cloudflare 的 Domain：

```sh
cloudflared tunnel login
```

執行這個命令後，應該會跳出瀏覽器授權，如果沒有跳出，就手動複製提供的授權網址登入 Cloudflare 帳號。

## 創建並使用 Tunnel

登入完成後就可以開始創建通道，創建只會在本地產生一些文件，並不會有任何連線的動作，可以放心執行：

```sh
cloudflared tunnel create <Name>
```

創建完成後，Cloudflare 會給一組 UUID，可以看一下有沒有創建成功：

```sh
cloudflared tunnel list
```

如果要刪除就是 Delete：

```sh
cloudflared tunnel delete <Name or UUID>
```

## DNS 設定

在創建 Tunnel 後，Cloudflare 會將剛剛創建隧道時產生的 UUID 綁定到 `<UUID>.cfargotunnel.com` 這個 Domain，不過 Cloudflare 會擋掉用這個 Domain 直接連線的流量，所以我們要把我們的 Domain 新增一個 CNAME 紀錄，把流量往這邊導。

有兩個方法可以設定 CNAME，一個是自己去 Cloudflare 的官網設定：

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210813165733.png)

另一個是直接用指令設定，快又方便，把後面的 domain 改成自己想要綁定的：

```sh
cloudflared tunnel route dns <Name or UUID> test.example.com
```

打完後如果不放心，還是可以自己到 Cloudflare 的 Dns 設定看一下有沒有設定完成，應該會看到跟上圖一樣產生一個 CNAME Record。

## Tunnel Config

下面是最簡單的 Config 範例，這是一個 `yml` 檔案：

```yml
tunnel: <Name>

ingress:
  - hostname: test.example.com
    service: http://localhost:8080
  - service: http_status:404
```

上面會把 8080 的 HTTP 流量導到 `domain.example.com`，使用剛剛創建的 Tunnel。

最後一行一定要有一個可以接受所有流量的 Service，不然服務會不能啟動，這裡全部往 404 導。

## Run Tunnel

最後一步，加上 config 的參數，把剛剛的 yml 檔喂給 Cloudflare，就可以啟動通道了：

```sh
cloudflared tunnel --config test.yml run
```

## 後記

這篇只介紹了如何創建一個 Http 的 Tunnel，如果要開其他的 TCP Port，還需要其他的設定，而且在 Client 端也會需要安裝 Cloudflared，所以我留到下一篇在介紹。

## Reference

- [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/)
