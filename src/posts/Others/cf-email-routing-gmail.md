---
title: 自訂網域免費收發信 -- Cloudflare Email Routing 搭配 Gmail SMTP
date: 2022-10-27T13:44:50.631Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/9269c238-393f-40f8-9617-2416ff0de100/public
draft: false
tags:
  - cloudflare
  - email
  - gmail
categories:
  - Others
---

使用自己的網域要收發電子郵件是一件麻煩事，自己架設 Email Server，發出去的信件大部分都會被當成垃圾信。簡單的解決方式，就是買下 Google Workspace，但是這真的蠻貴的，所以我發現了完全免費的解決方式，記錄一下。

<!--more-->

## 思路

- Cloudflare Email Routing 收電子郵件，並轉到自己的 Gmail
- Google SMTP 發電子郵件

## Email 轉址

Cloudflare 的佛心服務之一，就是可以幫忙把 Email 轉址，只要網域託管給 Cloudflare 就可以免費使用，沒有任何限制，真的是完全免費。

只要在 Cloudflare 的網域設定中設定一個自己想要接收 Email 的位置和用戶名，並轉發到自己的 Gmail 即可。這樣以後只要寄 Email 到設定的位置，全部都會轉發到自己的 Gmail。

設定時 Cloudflare 會寄一封信到要被轉發的 Gmail 中確認。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/87cbdb38-c1cc-41b9-759b-1c453e204f00/public)

## 發送 Email

解決了收信的問題，現在來解決發信的問題。Gmail 有提供免費的 Email SMTP Server 供免費發送電子郵件，不管任何的網域都可以，只要有 Google 帳號，就可以每天寄送 500 封 Email。

到 Gamil 的設定中，新增用來寄 Email 的地址，這可以設定很多個。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/b02717d8-d39d-4fa7-9151-601ccb7beb00/public)

輸入剛剛在 Cloudflare 設定的 Email，名稱填自己發信時想要顯示的名字。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/8354f94e-c13f-4e72-d717-685dd7af1900/public)

免費的 Gmail SMTP 設定值如下：

- SMTP Server: `smtp.gmail.com`
- 使用者名稱：自己的 Gmail 帳號
- 密碼：Gmail 密碼 (如果 Google 帳號有設定 2FA，可以到 [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) 產生專用密碼)

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/6905c1eb-b1de-4a3d-81fa-e938302b2500/public)

新增後，Google 也會寄一封確認信到你要被轉發的信箱，確認你真的擁有這個地址的使用權，避免濫用。因為剛剛已經叫 Cloudflare 轉發郵件到你的 Gmail，所以可以直接在你的 Gmail 收認證信。

這樣就大功告成，用兩個免費的服務給解決自己的網域的收發信問題，而且是由 Gmail 的 SMTP 寄出，也比較不會被擋信。

## Reference

- [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/)
- [How to Use the Gmail SMTP Server to Send Emails for Free](https://kinsta.com/blog/gmail-smtp-server/)
