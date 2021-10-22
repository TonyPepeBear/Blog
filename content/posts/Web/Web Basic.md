---
title: "Web Basic"
description: 瀏覽器只看得懂三種東西：Html、CSS、Javascript。但是常可以發現以這些以外的語言編寫網頁，像是 Python、Ruby、PHP、Java 等等，其實這些東西寫出來的網頁，最後也都是編譯(轉換)成 Html、CSS、Javascript。所以要學網頁，就先從這三樣東西開始學。
date: 2021-09-01T14:07:00Z
draft: false
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/8d7dadd3-36a3-42c8-a452-3c93c541c600/public
tags: 
    - web
    - html
    - css
    - javascript
categories:
    - Web
---

瀏覽器只看得懂三種東西：Html、CSS、Javascript。但是常可以發現以這些以外的語言編寫網頁，像是 Python、Ruby、PHP、Java 等等，其實這些東西寫出來的網頁，最後也都是編譯(轉換)成 Html、CSS、Javascript。所以要學網頁，就先從這三樣東西開始學。

<!--more-->

> 本文目的於 iOS Club 幹訓使用，內容口述為主，所以文章內容有點草率，基本上不適合閱讀。

## HTML vs CSS vs Javascript

只是寫個網頁，就要學三種程式語言？不，嚴格來說，只有 Javascript 是程式語言，其他兩個都只是標記語言：HTML 提供網頁的骨幹，CSS 提供衣服，JS 提供大腦，但你也確實要學三樣東西。

![img](https://pic1.zhimg.com/80/v2-ee31ec6f20c74c5b03e8d48da1178820_720w.jpg)

## HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>Heading </h1>
</body>
</html>
```

## CSS

```css
body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}
```

## Bootstrap

Bootstrap 就是來拯救世界的，提供網頁設計師們一個好用的框架，用簡單幾句話就可以寫出響應式網頁，也有很多漂亮的原件，讓大家不必每次寫網頁都重新造輪子。用了 Bootstrap 基本上就只需要碰 HTML，CSS 和 JS 都不用寫，就可以寫出堪用的網頁~~很多大學生的專題都是這樣搞出來~~。

只要套了下面的模板，就能開始使用 Bootstrap：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
  </body>
</html>
```

## Reference

* [HTML Tutorial](https://www.w3schools.com/html)
* [CSS](https://www.w3schools.com/css)
* [JavaScript Tutorial](https://www.w3schools.com/js)
* [HTML vs JS vs CSS](https://zhuanlan.zhihu.com/p/67242125)
