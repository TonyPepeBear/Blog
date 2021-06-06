---
title: "用 Teminal 連接到 Amazon Lightsail"
date: 2021-06-06T17:16:35+08:00
draft: false
---

AWS 個體，要使用本地的 Terminal 連線都要使用他專門產生的 key 來確保安全性，但需要比較複雜的設定。

<!--more-->

## 下載 Key

先到這個頁面按下帳戶頁面

![](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210606172007.png)

再到這個頁面創建或下載新的 key

![](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210606172046.png)

下載的 key 應該會是長 `.pem` 的副檔名，我們下面假設他叫 `aws.pem`。

# 用 Key 連接到 AWS 個體

ssh 為了避免 key 會被其他使用者看到，如果 key 不是私有權限會不讓你連線，所以我們先 `chmod`：

```bash
chmod 600 aws.pem
```

改完權限之後應該就可以直接用 `ssh -i` 連上個體：

```bash
ssh -i aws.pem ubuntu@123.45.6.7.89
```

但是每次都要這樣連線也是蠻麻煩的，我們可以把她 add 到我們的 `.ssh` 裡面，新增完後就可以直接連線，也不用輸入密碼。

```bash
ssh-add aws.pem
ssh ubuntu@123.45.6.7.89 
```
