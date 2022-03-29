---
title: "GitHub GPG - Verified Commit"
description: 最近常常會看到別入 GitHub 上的 Commit 會有 Verified 的字樣，查了才知道這是為了防止有人盜用你的 email 簽 commit，畢竟 git 的 user.email 是可以自己隨便設的，所以 GitHub 就提供一個可以用公私鑰的方式來確認身份。
date: 2022-03-24T14:32:19Z
draft: false
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/eb2adedc-6625-46d1-73ea-07c01fc92000/public
tags: 
    - git
    - github
    - gpg
    - verified
    - commit
categories:
    - Git
---
最近常常會看到別入 GitHub 上的 Commit 會有 Verified 的字樣，查了才知道這是為了防止有人盜用你的 email 簽 commit，畢竟 git 的 user.email 是可以自己隨便設的，所以 GitHub 就提供一個可以用公私鑰的方式來確認身份。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/6e429f76-94c1-46ff-77da-7d50a886d100/public)

<!--more-->

## GnuPG

我們要利用 GnuPG 來產生金鑰和簽署 Commit，當然要先安裝他，可以自己查一下自己的 OS 要怎麼裝：

[Download GnuPG](https://www.gnupg.org/download)

```text
brew install gnupg     # macOS
choco install gnupg    # Windows
apt install gnupg      # Ubuntu
```

## 產生 GPG Key

用下面的一行指令就會進到互動式的畫面，接下來需要輸入一些資料：

```shell
gpg --full-generate-key
```

1. 產生 Rsa and Rsa
2. GitHub 建議使用 4096，最複雜的就對了
3. 金鑰要不要過期可以自己評估，我是選不過期
4. 確認資料輸入正確

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/d6411985-0b33-4ab2-e883-f95ce0da3c00/public)

1. 輸入要簽署的名字
2. 輸入要簽署的 email，注意必須與 GitHub Email 和 `git config user.email` 的一樣。
3. 註釋隨便輸入即可
4. 確認資料輸入正確

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/594a269c-ab4f-4484-fa9a-c74307454600/public)

接下來會跳出一個要輸入密碼的畫面，一樣依自己需求設定即可

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/6b11a19b-c7fa-4697-0861-5fb4c66ff800/public)

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/56a8fc50-5a1e-4a0e-e9ef-30b9fe74fc00/public)

這樣就產生成功了，可以寄一下這個畫面出現的資料

如果要顯示所有的 Key：

```shell
gpg --list-secret-keys
```

## 複製 GPG Key 到 GitHub

用各個指令來顯示公鑰，並且複製到 GitHub 上，包含 Begin 和 End 兩行：

```shell
gpg --armor --export <Your Key>
```

進到設定裡，新增 GPG Key，貼上剛剛複製下的金鑰

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/8a75edb9-4a08-4060-608a-d63353a77c00/public)

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/9c5ad211-0bcc-4058-a304-6903e69c8700/public)

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/0ef8e55b-7f1b-43ab-cd40-43303b98bc00/public)

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/32e1e3a5-2fdc-4e6d-aef3-08122d448d00/public)

## 簽署 Commit

要簽署 Commit 我們需要先告訴 git 我們要用哪支鑰匙，也是用 git config 設定，如果要每個倉庫都用這支鑰匙，可以直接設定 global：

```shell
git config user.signingkey <Your Key>
git config --global user.signingkey <Your Key>
```

設定好後，我們就可以開始簽 Commit，基本上就是在 Commit 時加上 `-S`：

```shell
git commit -S -m "Commit Message"
```

如果覺得每次都要加上參數很麻煩，也可以直接加到 config 中，讓每次 Commit 都預設簽署：

```shell
git config commit.gpgsign true
git config --global commit.gpgsign true
```

接下來，只要 push 到 GitHub 上，就會看到有 Verified 的標籤：

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/6e429f76-94c1-46ff-77da-7d50a886d100/public)

## Reference

* [Generating a new GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
* [Adding a new GPG key to your GitHub account](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-new-gpg-key-to-your-github-account)
* [GnuPG](https://www.gnupg.org/)
