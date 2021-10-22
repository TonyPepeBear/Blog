---
title: "Markdown"
description: Markdown 可以想像成 Html 的簡化版本，廣泛用於編寫文章或是技術文件，因為其特性基本上由 Html 簡化而來，所以方便的由寫好的 Markdown 產生 Html 網頁，像是這篇文章也是由 Markdown 編寫。
date: 2021-07-05T17:05:38+08:00
draft: false
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/0ecfde1e-521f-4e7c-ab46-30357d4e5e00/public
tags: 
    - markdown
categories:
    - Web
---

Markdown 可以想像成 Html 的簡化版本，廣泛用於編寫文章或是技術文件，因為其特性基本上由 Html 簡化而來，所以方便的由寫好的 Markdown 產生 Html 網頁，像是這篇文章也是由 Markdown 編寫。

<!--more-->

我們來看看 [Swift](https://github.com/apple/swift) 的官網，可以發現 `[README.md](http://readme.md)` 這個檔案就是由 Markdown 編寫，Github 也會自動將這個檔案渲染在網頁下方。到這裡可以發現，在 Github 上的所有開源專案的文件，幾乎都是由 Markdown 編寫。

## 哲學

引述自 [https://markdown.tw](https://markdown.tw)

> Markdown的目標是實現「易讀易寫」。  
> 不過最需要強調的便是它的可讀性。一份使用Markdown格式撰寫的文件應該可以直接以純文字發佈，並且看起來不會像是由許多標籤或是格式指令所構成。Markdown語法受到一些既有text-to-HTML格式的影響，包括 Setext、atx、Textile、reStructuredText、Grutatext 和 EtText，然而最大靈感來源其實是純文字的電子郵件格式。  
> 因此Markdown的語法全由標點符號所組成，並經過嚴謹慎選，是為了讓它們看起來就像所要表達的意思。像是在文字兩旁加上星號，看起來就像*強調*。Markdown的清單看起來，嗯，就是清單。假如你有使用過電子郵件，區塊引言看起來就真的像是引用一段文字。

## Tools

Q: 那要用什麼來寫呢？

因為 Markdown 基本上也是純文字檔案，所以只要是文字編輯器都可以編輯，你要用 txt 來寫也是個不錯的方法❤️。

### VSCode

目前最推薦的就是工程師的好夥伴 `VSCode` ，VSCode 在寫 Markdown 時，有提供即時渲染，可以快速的看到結果，而且 VSCode 應該在各位工程師的電腦裡都應該有安裝才對。

### HackMD

HackMD 是一個在網頁中的 Markdown 編輯器，可以方便地在網頁中編輯和看到編寫的結果，HackMD 最厲害的功能是可以將 Markdown 轉換成簡報，用 Markdown 取代 PowerPoint？這夠帥吧！

### MarkText

這是一個在 [Github](https://github.com/marktext/marktext) 上的開源專案，可以所寫所得，方便使用，但我還是比較推薦新手使用上面兩項工具，因為這東西真的太方便了，有點沒有在寫 Markdown 的感覺。

### Microsoft Word

推薦指數：⭐⭐⭐⭐⭐

* [[YouTube] Why Microsoft Word is the best IDE for programming](https://www.youtube.com/watch?v=X34ZmkeZDos)

## Markdown 語法

<!-- markdownlint-disable MD025 -->
# 大標題
<!-- markdownlint-enable MD025 -->

```md
<h1>

# 大標題
```

---

## 次標題

```md
<h2>

## 次標題
```

---

### 次次標題

```md
<h3>

### 次次標題
```

---

## 內文

內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文

```md
<p>

內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文
```

---

## 斜體 粗體

內文內文內文*斜體*內文內文內文內文內文內文  
內文內文內文**粗體**內文內文內文內文內文內文  

```md
內文內文內文*斜體*內文內文內文內文內文內文  
內文內文內文**粗體**內文內文內文內文內文內文  
```

---

## 有序清單

1. 有序清單 1
2. 有序清單 2
3. 有序清單 3

```md
<ol>

1. 有序清單 1
2. 有序清單 2
3. 有序清單 3
```

---

## 無序清單

* 無序清單 1
* 無序清單 2
* 無序清單 3

```md
<ul>

* 無序清單 1
* 無序清單 2
* 無序清單 3

+ 無序清單 1
+ 無序清單 2
+ 無序清單 3

- 無序清單 1
- 無序清單 2
- 無序清單 3
```

---

## 程式碼區塊

```c
printf("Hi 程式碼區塊");
```

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210717220425.png)

---

## 標記程式碼

inline `code`

```md
inline `code`
```

---

## 超連結

[Google首頁](https://google.com)

```md
[Google首頁](https://google.com)
```

---

## 圖片連結

![img](https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png)

```md
![](https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png)
```

## Reference

* [Markdown文件](https://markdown.tw/)
