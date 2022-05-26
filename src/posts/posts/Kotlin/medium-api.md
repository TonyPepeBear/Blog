---
title: "發布 Markdown 至 Medium"
description: 我認為用 Markdown 用來寫技術文章還是最順手的，但是 Medium 的編輯器卻不支援 Markdown。前幾天用 import 的方式也失敗，另尋他處後發現 Medium 支援用 API 發布文章，更還支援用 Markdown 和 Html 發布。雖然不懂官方為何不直接讓用戶用 Markdown 發布，而是要用 API，但是竟然找到了一絲希望，就來試試看用 API 的方式發布文章。
date: 2021-06-16T02:35:56+08:00
draft: false
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/98587dc3-5d4e-446a-7d98-b0b1ad36d500/public
tags:
  - medium
  - markdown
  - kotlin
  - tornadofx
categories:
  - Kotlin
---

我認為用 Markdown 用來寫技術文章還是最順手的，但是 Medium 的編輯器卻不支援 Markdown。前幾天用 import 的方式也失敗，另尋他處後發現 Medium 支援用 API 發布文章，更還支援用 Markdown 和 Html 發布。雖然不懂官方為何不直接讓用戶用 Markdown 發布，而是要用 API，但是竟然找到了一絲希望，就來試試看用 API 的方式發布文章。

<!--more-->

本篇使用 Kotlin 和 OKHttp，來嘗試撰寫一個應用程式，來協助發布 Markdwon 至 Medium，專案原始碼在 [Github](https://github.com/TonyPepeBear/MediumMarkdownUploader) 上。

![截圖 2021-02-10 下午9.47.40.png](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/2021/02/10-21-47-48-%E6%88%AA%E5%9C%96%202021-02-10%20%E4%B8%8B%E5%8D%889.47.40.png)

## 申請 token

Medium API 的 [官方文件](https://github.com/Medium/medium-api-docs) 在這，可以用 `HTTP POST` 的方式來發布文章。要使用 API 第一件事就是要有 `token`，要申請 `token` 不用錢，官方目前好像也沒有使用限制，到 [用戶設定](https://medium.com/me/settings) 的頁面，找到 `Integration tokens` 的地方，申請一個 token，說明隨便輸入就好。

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/2021/02/10-01-42-07-%E6%88%AA%E5%9C%96%202021-02-10%20%E4%B8%8A%E5%8D%881.42.04.png)

## UserID

根據官方文檔，想要發布文章，需要 UserID，我找了好久才發現 UserID 不是 Name 也不是 UserName，也是要先用 API 的方式取得。

用 Http GET 的方式可以取得 token 主人資料，使用方式如下：

```http
GET https://api.medium.com/v1/me
```

```http
GET /v1/me HTTP/1.1
Host: api.medium.com
Authorization: Bearer 181d415f34379af07b2c11d144dfbe35d
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8
```

`token` 是放在 Post 的 header，的 `Authorization:Bearer` 後方，下方是用 Kotlin 和 OKHttp 實作的方法：

```kotlin
val request = Request.Builder()
    .url("https://api.medium.com/v1/me")
    .get()
    .addHeader("Authorization", "Bearer $token")
    .build()
val response = client.newCall(request).execute()
```

範例的 Response 如下，可以拿到用 UserID、UserName 等資料：

```json
{
  "data": {
    "id": "5303d74c64f66366f00cb9b2a94f3251bf5",
    "username": "majelbstoat",
    "name": "Jamie Talbot",
    "url": "https://medium.com/@majelbstoat",
    "imageUrl": "https://images.medium.com/0*fkfQiTzT7TlUGGyI.png"
  }
}
```

根據上方的 Json，可以產生 `Kotlin Data Class` 來放取回的資料：

```kotlin
data class MediumApiMe(
    val `data`: MediumMeData
)

data class MediumMeData(
    val id: String,
    val imageUrl: String,
    val name: String,
    val url: String,
    val username: String
)
```

取回的 Response 用 `gson` 轉換 json 到 Data Class，最後寫成一個完整的方法如下：

```kotlin
fun getUserData(token: String): MediumApiMe {
    val request = Request.Builder()
        .url("https://api.medium.com/v1/me")
        .get()
        .addHeader("Authorization", "Bearer $token")
        .build()
    val response = client.newCall(request).execute()
    if (response.code != 200 || response.body == null)
        throw RuntimeException(
            "Can not get User info. Maybe token is wrong." +
            {response.body?.byteStream()?.reader()?.readLines()}
        )

    val text = response.body!!.byteStream()
        .reader()
        .readText()
    return gson.fromJson(text, MediumApiMe::class.java)
}
```

上方的程式碼有判斷 Response Code 是否為 200，若不是 200 代表取得資料沒有成功，就拋出 Exception。

## Post 文章

取得 UserID 後就可以用 Http Post 的方式向 Medium 發布文章。下方的 authorId 就是剛剛用 Http Get 的方式取得的 UserID。

```http
POST https://api.medium.com/v1/users/{{authorId}}/posts
```

下面是 Post 的範例，`token` 一樣是放在 `header` 裡。官方的範例是用 html 來發布文章，我們只要將 `contentFormat` 改成 markdown 就可以達成目的。

```http
POST /v1/users/5303d74c64f66366f00cb9b2a94f3251bf5/posts HTTP/1.1
Host: api.medium.com
Authorization: Bearer 181d415f34379af07b2c11d144dfbe35d
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "title": "Liverpool FC",
  "contentFormat": "html",
  "content": "<h1>Liverpool FC</h1><p>You’ll never walk alone.</p>",
  "canonicalUrl": "http://jamietalbot.com/posts/liverpool-fc",
  "tags": ["football", "sport", "Liverpool"],
  "publishStatus": "public"
}
```

根據上面 Post 的 Json 範例，我們可以產生出如下的 Kotlin Data Class，我順便寫了一個快速轉成 Json 的方法：

```kotlin
data class MediumApiPost(
    val title: String,
    val content: String,
    val contentFormat: String,
    val tags: List<String> = listOf(),
    val publishStatus: String = "draft", //預設是草稿
    val canonicalUrl: String = "",
) {
    fun toJson(): String {
        return gson.toJson(this)
    }
}
```

產生出 Data Class 就可以嘗試 Post 看看，是否會發布文章，直接利用剛剛寫好的 `getUserData` 拿到 UserID，之後在 Post：

```kotlin
val userID = getUserData(token).data.id
val medimuApiPost =
    MdieumApiPost("Title", "# Title\nHi", "markdown")
val request = Request.Builder()
    .url("https://api.medium.com/v1/users/$userID/posts")
    .post(mediumApiPost.toJson().toRequestBody(contentType = "application/json".toMediaType()))
    .addHeader("Authorization", "Bearer $token")
    .build()
val response = client.newCall(request).execute()
```

如果發布成功，可以拿到 Response Code 201，其他的都代表發布失敗。

寫成完整的發布方法如下：

```kotlin
fun newPost(token: String, mediumApiPost: MediumApiPost): String {
    val userID = getUserData(token).data.id

    val request = Request.Builder()
        .url("https://api.medium.com/v1/users/$userID/posts")
        .post(mediumApiPost.toJson().toRequestBody(contentType = "application/json".toMediaType()))
        .addHeader("Authorization", "Bearer $token")
        .build()
    val response = client.newCall(request).execute()

    if (response.code != 201 || response.body == null)
        throw RuntimeException("Something Wrong. ${response.body?.byteStream()?.reader()?.readText()}")

    val text = response.body!!.byteStream().reader().readText()
    println(text)

    var json = gson.fromJson(text, MediumNewPostResponse::class.java)

    return json.data.url
}
```

上面的方法會直接回傳發布成功的 URL，失敗則會直接拋出 Exception。

## GUI

寫好方法後，最後再用 `TornadoFX` 寫 GUI，這邊就不講述 GUI 的部分，有興趣可以自己到 GitHub 上看專案的原始碼。

## 程式碼區塊

因為 Medium 目前並不支援程式碼高亮，傳上去的程式碼區塊都會變成黑底的，目前我有想到的解法是在 Post 上去之前，就先將程式碼區塊都換成 GitHub Gist，但這就需要更複雜的方式解決問題了，有興趣的人可以自己試試看。

## Reference

[Medium’s API Documentation](https://github.com/Medium/medium-api-docs)
