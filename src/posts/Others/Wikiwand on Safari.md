---
title: Wikiwand on Safari
date: 2022-08-26T13:44:50.631Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/70c00ace-d3b4-4326-cd8c-938fe0cc7200/public
draft: false
tags:
  - wiki
  - wikiwand
  - adguard
categories:
  - Others
---

維基百科是大家的好朋友，但他的網頁排版感覺已經幾十年沒有更新過，閱讀起來有點不方便，而 Wikiwand 就是來幫助維基百科排版成更容易閱讀的形式，在 Google Chrome 上有官方的擴充功能可以將 Wiki 的網址直接重新導向到 Wikiwand，而 Safari 好像是因為 Apple 嚴格的條件所以沒有擴充功能，但我今天發現的一個技巧可以協助將網頁直接重新導向到 Wikiwand。

<!--more-->

## Wikiwand 比較

原版維基：

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/0a6c340c-becb-4748-a9d3-949a48241600/public)

Wikiwand:

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/6023546f-67b9-4524-df91-33bc53f34f00/public)

## 利用 AdGuard

這個技巧是利用廣告過濾器來協助網頁重新導向，而我是用 AdGuard 來幫助我們完成，我也只在 AdGuard 上用過，其他廣告過濾器我就不知道可不可以利用這個技巧了。如過沒有 AdGuard 的話，也可以去下載試用看看，自己用了很久覺得還不錯。

整個過程只需要一步

在 AdGuard 的設定中，在過濾器選項中新增使用者自訂的過濾器：

```js
@@||wikipedia.org^$generichide,badfilter
wikipedia.org#%#if (window.location.search === "") { var lang = window.location.hostname.split('.')[0]; var article = window.location.pathname.split('/')[2]; window.location.href = "http://www.wikiwand.com/" + lang + "/" + article; }
```

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/4296f199-0bb2-4c34-922f-b45a5c280100/public)

大功告成

## Reference

- [Wikiwand on Safari](http://sebastiangrans.github.io/Wikiwand-on-Safari-13/)
