---
title: "用 Hugo 來寫文章吧"
description: Hugo 是靜態網頁的產生器，類似 Hexo 和 Jekyll，Hugo 由 go 語言編寫，效率極高。
date: 2021-06-07T02:10:46+08:00
draft: false
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/f50473d3-1acc-431a-402d-3c79f4170b00/public
tags:
  - hugo
  - blog
  - mac
  - linux
  - windows
categories:
  - Hugo
---

Hugo 是靜態網頁的產生器，類似 Hexo 和 Jekyll，Hugo 由 go 語言編寫，效率極高，我原本是用 Hexo 在產生文章，後來發現 Hugo 這個好東西，也觀望了一陣子~~其實是懶~~，就決定換過來了，目前也用得非常順手。

<!--more-->

## 安裝 Hugo

這是 Hugo 的[官網](https://gohugo.io/)，進去後可以看到一些簡單的介紹和安裝方法。

我蠻推薦在 vscode 的 `code in container` 的方式用 Hugo，因為我自己也是這樣用，這樣就不用擔心會弄髒環境，但就讓有興趣的人自己研究吧，這裡我介紹一般電腦的安裝方式。

### Windows

Windows 我建議是用 Chocolatey 來安裝是最方便的：

```ps1
choco install hugo
```

但是如果不想要用 Chocolatey 安裝，可以去官方的 [Github Release](https://github.com/gohugoio/hugo/releases) 下載最新的 Windows 版本，下載完後記得加入 PATH。

### Mac

macOS 安裝最簡單，用 Homebrew 就可以快速的安裝。

```bash
brew install hugo
```

### Linux

Linux 我一律建議從官方的 [Github Release](https://github.com/gohugoio/hugo/releases) 下載最新的版本，並自己加到 PATH。

雖然 apt 等版本管理器好像有提供，但官方的文件上都說版本幾乎都不是最新版，所以也不建議。用下載的方式還是最方便的，或是用 Docker 也是好辦法。

## 開始使用 Hugo

先創建一個新的 Hugo 專案，下面的 `MyBlog` 可以換成自己想要的專案名稱：

```bash
hugo new site MyBlog
```

### 新增主題

創建好專案後，就可以來新增主題，目前在 Hugo 上提供非常多的主題，我們可以到官方的這個[網站](https://themes.gohugo.io/)找找看，但目前些不要增加難度，用最官房提供的簡單的 ananke 主題就好，反正主題是隨時都可以換的。

```bash
cd MyBlog
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
echo theme = \"ananke\" >> config.toml
```

可以看到，官方是建議使用 `git submodule` 的方式新增主題，這樣之後在更新主題的時候也比較方便。

最後一行的 `echo` 指令會在專案底下產生一個 `config.toml` 的檔案，基本上之後所有有關 Hugo 網站的設定，都可以在這裡變更。這一行指令應該會幫你在檔案中產生如下的內容：

```toml
theme = "ananke"
```

### 新增文章

在 Hugo 中新增文章的指令就是如下，可以自己修改檔名。

```bash
hugo new posts/my-first-post.md
```

產生完成後可以看到 Hugo 幫你產生了一些 Front Matter。

```md
---
title: "My First Post"
date: 2019-03-26T08:47:11+01:00
draft: true
---
```

上面的 `draft` 的指令是草稿的意思，如果沒有在上線前改成 `false`，是不會在正式網站中渲染的。

現在可以自己產生的 Markdown 檔案中加一些內容，等等就可以看看效果怎麼樣。

## 執行 Hugo Server

要啟動 Hugo Server 也非常簡單：

```bash
hugo server -D
```

上面的 `-D` 參數的意思是把 `draft` 的草稿文件也渲染，如果想要看看上線的網頁會長怎樣，可以不要加上這個參數。

## 產生靜態網頁

這個最簡單了，連猴子都會，`-D` 的參數一樣是渲染草稿文件，可視需求加上。

```bash
hugo
```

到這裡就介紹完成所有 Hugo 基本的使用方法了，之後我會介紹如何使用 Github Action，讓我們每次只需要 Push 專案，Github 就會幫我們重新建置並部署網站。

## Reference

- [Hugo Quick Start](https://gohugo.io/getting-started/quick-start/)
