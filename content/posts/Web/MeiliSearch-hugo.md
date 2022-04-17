---
title: "MeiliSearch with Hugo"
date: 2022-01-17T17:40:09Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/f9f8be53-5393-4190-b6da-baf27d8a7500/public
draft: false
tags: 
    - meilisearch
    - search
    - web
    - hugo
    - github
    - actions
categories:
    - Web
---

說到搜尋的解決方案，最有名的大概就是 [Algolia](https://www.algolia.com/)，可以方便的創建索引，也有很多寫好的前端網頁元件可以使用，唯一的缺點就是收費。雖然 Algolia 要收費，但其實對於我這個小網頁都索引量是完全不用錢的，但是就還是覺得自己架一個索引系統比較有感覺，然後我就在 GitHub 上發現了開源的 [MeiliSearch](https://meilisearch.com)，功能基本上跟 Algolia 很像，也支援中文，甚至有些前端元件可以直接使用 Algolia 的，缺點就是要自己架設 Server。

<!--more-->

本文以搜尋本站為目的撰寫，所以後面的範例大多與 Hugo 相關，如果想要看完整的程式碼，可以直接到本站的 GitHub。

## 簡介 MeiliSearch Server

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/f93885e8-f670-44ec-ea24-264a97c9a500/public)

基本上 MeiliSearch 就是一個 RESTful API，目標是要提供現成的搜尋解決方案，完全開源，提供即時搜尋、拼寫錯誤、同義詞、模糊搜尋、自訂排名、排序和多語言搜尋的支援，連中文也不例外。根據官方文件的介紹，MeiliSearch 以易用性為首要目標，對於開發者，只需要少少幾行 code 就可以使用；對於使用者，提供直觀的即時輸入即時反應的搜尋結果。

官方也有很多的 SDK，.NET, Dart, Go, Java, JS, Python, Swift，而且上面這些還不是全部，所以在開發各語言的應用程式時，都可以考慮用 MeiliSearch 做為後端搜尋引擎。

MeiliSearch 也不是完全沒有缺點，缺點就是要自己有伺服器，像是本文今天的案例就是要幫 Static Site 做搜尋的功能，通常 Static Site 大家應該都是用 GitHub Pages 等 Statice Site Hosting 服務，所以網頁本身是沒有自己架 Server 的，為了加個搜尋功能會要多一個 Server 就是很大的缺點。

## SearchIndex.json

在開始使用 MeiliSearch 之前，我們先來把要索引的資料準備好，MeiliSearch 會需要使用 json 當作索引，所以我們要產生一個 json 的範本。創建 `/layouts/list.searchindex.json`，內容如下：

```text
[ {{- $i := 0 -}}
    {{- range where .Site.RegularPages "Section" "ne" "" -}}
       {{- if not .Params.noSearch -}}
          {{- if gt $i 0 }},{{ end -}}
          {"id":{{ $i }}, "date":"{{ .Date.Unix }}", "url":"{{ .Permalink }}", "title":{{ .Title | jsonify  }}, "summary":{{ with .Description}}{{ . | plainify | jsonify }}{{ else }}{{ .Summary | plainify | jsonify }}{{ end }}, "content":{{ .Content | plainify | jsonify }},"tags":[ {{- $t := 0 }}{{- range .Param "tags" -}}{{ if gt $t 0 }},{{ end }}{{ . | jsonify }}{{ $t = add $t 1 }}{{ end -}} ], "section": {{ .Section | jsonify -}} }
        {{- $i = add $i 1 -}}
    {{- end -}}
{{- end -}} ]
```

然後在 `config.yaml` 中加入下面的設定值：

```yaml
outputFormats:
    SearchIndex:
        mediaType: "application/json"
        baseName: "searchindex"
        isPlainText: true
        notAlternative: true
outputs:
    home: ["HTML","RSS", "SearchIndex"]
```

完成上面兩樣設定後，可以 `hugo` 一下試試看，有沒有在 `/public/searchindex.json` 中看到索引檔案，應該會類似如下：

```json
[
  {
    "id": 0,
    "date": "1622891718",
    "url": "https://tonypepe.com/posts/others/hello-world/",
    "title": "Hello World",
    "summary": "Hello World. This is a test post.",
    "content": "This is my first post in hugo\ncontent",
    "tags": [ "hugo", "test" ],
    "section": "posts"
  }
]
```

## 架設 MeiliSearch Server

準備好索引檔案後，我們就來架設 MeiliSearch 的 Server，MeiliSearch 是用 Rust 編寫，所以也是跨平台通用。官方提供很多種安裝方式，還有一鍵啟動腳本，當然，為了避免弄髒環境，最推薦的當然還是 Docker，下面就先以 Docker 為範例：

```bash
docker run -it --rm \
    -p 7700:7700 \
    -v $(pwd)/data.ms:/data.ms \
    getmeili/meilisearch:latest
```

注意一下，上面掛載了一個 `data.ms` 的資料夾，所以在執行上面的指令前，記得先創建好。`data.ms` 這個資料夾是為了存放索引資料，避免因為 Docker 容器重啟就損失資料，所以很重要。

現在可以到 [http://localhost:7700](http://localhost:7700)，會看到有一個簡易的 WEB UI。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/5664dc51-5d55-415a-3633-ac45e17d7a00/public)

如果不想用 Docker，還是可以參考官方文件的其他安裝方式安裝。

## 提交索引資料

前面有提到 MeiliSearch 是 RESTful API，所以要向他搜尋或是提供資料，都是用 HTTP Method。官方文件寫的都是 curl，我們還是使用 GUI 的方式介紹。HTTP 的 GUI 大家應該都會想到 Postman，但今天我們要使用他的開源替代 [Hoppsotch](https://hoppspot.io)，他是一個網頁工具，所以不需要安裝。

可以先對 `/health` 做 `GET` 試試看有沒有連上，如果沒有連上，可能要檢查一下有沒有成功啟動 MeiliSearch Server。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/cf86e106-a1f6-472e-d2c1-a6b186944f00/public)

確定連上後，我們就來提交索引資料，如果還沒有 Hugo 產生的索引資料，可以先到本站的 GitHub，拿本站的 [searchindex.json](https://github.com/TonyPepeBear/HugoBlog/blob/1bfae9859a44338d24a9f6676be37f72cc983505/searchindex.json) 做測試。

因為 MeiliSearch 也可以同時有多個 Indexes 做搜尋，我們下面的範例以 `hugo_blog` 作為範例名稱，大家可以根據需求自己決定使用的名稱。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/71797a57-6f97-44cd-f4dc-675ec42ffd00/public)

可以看到上圖對 `/indexes/<<IndexName>>/documents` 做 `POST` 方法，就可以把索引資料提交到 MeiliSearch Server。記得內容類型是 `application/json`，然後把索引資料放到 body。

現在回到 [localhost:7700](http://localhost:7700)，應該就可以看到原本空空如也的 WEB UI 現在可以做搜尋了，可以先在這裡做一些簡單的搜尋，試試看自己的索引資料有沒有被成功的使用。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/c58970b0-53b5-4a16-50bb-ff40fa6fde00/public)

## MeiliSearch in Production

MeiliSearch 預設的啟動方式其實是 `development`，這模式只是方便本地做測試使用的，如果要使用在生產環境，應該要以 `production` 模式啟動。在 Production 模式下，會有兩個不一樣的地方，第一項是 Web UI 會被停用，第二項是會必須要設定 `Master Key`，下面還是用 Docker 作為範例：

```bash
docker run -it --rm \
    -p 7700:7700 \
    -v $(pwd)/data.ms:/data.ms \
    -e MEILI_ENV=production \
    -e MEILI_MASTER_KEY=<Your Master Key> \
    getmeili/meilisearch:latest
```

上面設定的 Master Key，就是管理權限最大的 API Key，所以要記得妥善保存。

下面用剛剛的 Master Key 去對 `/keys` 做 `GET`，然後在 Headers 中，加上剛剛的 Master Key，就可以拿到預設的搜尋 KEY，和預設的 ADMIN KEY。如果要再另外新增 API KEY，可以參考官方的文件，這裡就不多著墨。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/91af11f7-29fc-446b-7ae1-dcb47f82b900/public)

## 為網頁加上搜尋功能

我們會用到 MeiliSearch 提供的 [Instant MeiliSearch](https://github.com/meilisearch/instant-meilisearch)，這個 JS 庫就是使用 Algolia 的 Instant Search 改的，所以有些文件可以直接去看 Algolia 的官方文件。Instant MeiliSearch 最簡單的使用方式也是直接用 CDN 的方式，下面是一個最簡單的模板，看懂後用類似的邏輯加到自己的網頁中就好。

html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
  </head>

  <body>
    <div>
      <div id="searchbox"></div>
      <div id="hits"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@meilisearch/instant-meilisearch/dist/instant-meilisearch.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4"></script>
    <script src="./app.js"></script>
  </body>
</html>
```

下面是剛剛的 html 會用到的 `app.js`，用來作為 Search 的設定值，只要把下面的網址設定成自己的網址，和自己在前幾步驟拿到的搜尋 API KEY 就可以使用了：

```js
const search = instantsearch({
  indexName: 'steam-video-games',
  searchClient: instantMeiliSearch(
    'https://integration-demos.meilisearch.com',
    'q7QHwGiX841a509c8b05ef29e55f2d94c02c00635f729ccf097a734cbdf7961530f47c47'
  ),
})

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
        </div>
      `,
    },
  }),
])

search.start()
```

如果覺得他預設提供的 UI 很醜，可以用 CSS 的方式去改他。

## GitHub Actions 自動提交索引

不廢話，直接上本站的 yml:

```yml
name: MeiliSearch Index

on:
  push:
    branches:
      - master  # Set a branch to deploy

jobs:
  deploy:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: | 
          npm i
          hugo --minify

      - name: Post Index
        run: | 
          curl \
            -X POST "https://search.tonypepe.com/indexes/hugo_blog/documents" \
            -H 'Authorization: Bearer ${{ secrets.MEILISEARCH_KEY }}' \
            -H 'Content-Type: application/json' \
            --data-binary "@public/searchindex.json"
```

其實重點就是在最後一步，把索引檔案 POST 到 MeiliSearch 就可以了。

## Referenc

* [MeiliSearch](https://meilisearch.com)
* [A simple javascript based full text search function](https://discourse.gohugo.io/t/a-simple-javascript-based-full-text-search-function/29119)
* [Hoppsotch](https://hoppspot.io)
* [Instant MeiliSearch](https://github.com/meilisearch/instant-meilisearch)
