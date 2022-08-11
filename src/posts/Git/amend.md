---
title: Git Amend Commit
date: 2022-08-11T13:44:12.703Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/aa912c60-37ce-4fc5-6187-568499120700/public
draft: false
tags:
  - git
  - amend
  - commit
categories:
  - Git
---

Amend Commit 就是用來修改最新 Commit 的指令，如果要修改更之前的 Commit，就要用 Rebase 或是 Reset 了。

<!--more-->

## 修改 Commit Message

如果最新的 Commit Message 亂寫或是寫的什麼不該寫的，就可以用 Amend Commit 來修改。

```bash
git commit --amend -m "新的 Commit Message"
```

## 壓進前一次 Commit

我常常會先將目前的修改給 Commit 一下當作存檔，但如果每次都只有小修改就 Commit 一次也會造成 Commit 非常多，所以我們可以在 Commit 的時候用 Amend Commit 壓進前一次 Commit，或是想像成修改上一次的 Commit 把這次的修改給加進去。

```bash
git add .
git commit --amend
```
