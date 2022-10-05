---
title: 讓 GitHub Actions 來幫你 Prettier
date: 2022-10-04T13:44:50.631Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/b33c3519-4782-4519-e113-3aadf3bf8800/public
draft: false
tags:
  - prettier
  - github
  - github-actions
categories:
  - Others
---

我的專案只要有關 js 的，我都會用 prettier 來自動排版，因為 prettier 能確保大家的程式碼風格一致。但是，我常常會有忘記 prettier 一下就直接 push 到 GitHub 上，我就想到說如果 GitHub Actions 可以幫忙檢查 prettier 應該也可以就直接幫忙 prettier 後 push 上來吧。今天我就把我寫好的 GitHub Actions 腳本記錄一下。

<!--more-->

## 思路

我把他分為兩個 job 來做：

1. 執行 prettier check
2. 如果步驟 1 失敗，執行 prettier write 並 push

完整的 yml 檔我放在最後面了，有需要的人可以直接拿去用。

## Prettier Check

執行 prettier check 應該是很簡單的步驟，許多 GitHub 上的開源專案應該都寫的差不多。簡單來說，就是設定好 node 後，直接 run `npx prettier --check .`：

```yml
jobs:
  prettier-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: "14"

      - name: Run Prettier Check
        run: |
          npx prettier --check .
```

## Prettier Write

這步驟比較會遇到問題的部分就是要如何判斷上一步驟 prettier check 執行失敗，我翻了一下 GitHub Actions 的文件，發現可以用 if 來決定一個 job 要不要執行，所以我們會需要 prettier check 的執行結果，才決定要不要 prettie write。Actions 有一個 `needs` 的邏輯，可以用來等待另一個 job 完成，然後使用他的執行結果。所以目前為止，可以先寫成下面這樣：

```yml
jobs:
  prettier-write:
    runs-on: ubuntu-latest
    needs:
      - prettier-check
    if: always() && (needs.prettier-check.result == 'failure')
```

接下來來寫 prettier write 和 git push，我在這邊遇到的問題是，如果 git checkout 的時候沒有給 Token，GitHub 預設會讓由 Actions push 的 Commit 不會觸發任的 Actions，這也不難理解，怕 Actions 彼此呼相 Call，然後進到無限回圈停不下來。但我今天還是希望他 prettier 完後可以觸發 Build 的 Actions，所以我們就要在 git checkout 的時候給他自訂的 Token，這樣等等在 push 的時候，也會幫我們用這個 Token Push。

就不在另外上程式碼，直接去下方看完整邏輯吧。

## 完整的 GitHub Actions 檔

結合上面兩個步驟：

```yml
name: prettier

on:
  push:

jobs:
  prettier-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          token: ${{ secrets.MY_GITHUB_TOKEN }}

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: "14"

      - name: Run Prettier Check
        run: |
          npx prettier --check .
  prettier-write:
    runs-on: ubuntu-latest
    needs:
      - prettier-check
    if: always() && (needs.prettier-check.result == 'failure')
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          token: ${{ secrets.MY_GITHUB_TOKEN }}

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: "14"

      - name: Write Prettier
        run: |
          npx prettier --write .
      - name: Commit and Push
        uses: EndBug/add-and-commit@v9
        with:
          add: "."
          message: "Prettier"
          committer_name: TonyPepeBear
          committer_email: tonybear55665566@gmail.com
```

## Reference

- [GitHub Actions](https://docs.github.com/en/actions)
