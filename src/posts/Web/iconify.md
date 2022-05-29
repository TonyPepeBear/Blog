---
title: "Iconify -- icon 大禮包"
date: 2022-01-14T13:48:25Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/ca9b8ae2-b684-421a-a662-2dd4356ce600/public
hidden: false
draft: false
tags:
  - icon
  - web
  - ios
  - android
  - design
categories:
  - Category
---

GitHub 上有許許多多開源的 icon，但是每個用法不盡相同，甚至大部分的使用方式，都是直接下載 SVG 使用。雖然使用 SVG 也不是不好，但是就會需要自己多一步驟的使用。Iconify 把許多 icon 整合在一起，並且提供非常簡單的辦法，就可以讓網頁有很精美的 icon。

<!--more-->

## 使用 Iconify

使用 Iconify 只需要先在 HTML 中引入 Iconify 的 Script：

```html
<script src="https://code.iconify.design/2/2.1.0/iconify.min.js"></script>
```

接下來只需要在要使用 icon 的地方，新增一個 span，其中要有包含 `class="iconify"` 和 `data-icon`：

```html
<span class="iconify" data-icon="fa:home"></span>
```

正確使用後，應該就可以在網頁中正確的顯示下面的 icon：

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/f0141e02-3e26-415d-1ee2-438dc4d43600/public)

## 搜尋 Icon

就像前面說的，Iconify 提供非常多的 icon，所以作者也有寫一個可以搜尋圖標的地方，而且搜尋到圖標後，還提供許多可以協助客製化圖標的方法：

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/44c38b28-baa8-4faa-6d06-8e2615f19500/public)

![](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/c330c161-f8b4-41d2-db15-b02079185b00/public)

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/f0141e02-3e26-415d-1ee2-438dc4d43600/public)

如果真的不想使用 Iconify 的方式顯示圖標，也可以單純的當作圖標蒐尋器，搜尋到之後直接下載 SVG 使用即可。

## Reference

- [Iconify](https://iconify.design/)
