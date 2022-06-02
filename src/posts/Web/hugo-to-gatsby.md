---
title: 從 Hugo 遷到 Gatsby 的紀錄
date: 2022-06-01T15:17:28.142Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/2892b2bf-2c12-4d17-21f7-ba2e57c98100/public
draft: false
tags:
  - hugo
  - gatsby
  - blog
  - web
  - node
  - npm
  - meilisearch
  - search
categories:
  - Category
---

最近把網站從 Hugo 遷移到 Gatsby，遇到了一些問題，我就來簡單記錄一下解決問題的過程，而且因為我對 Node 也不是很熟，所以主要是在當作我練習 Node 和 React。

<!--more-->

## Why？

1. Hugo 實在很難使用 Node 套件
2. 單純想給自己一個接觸 Node 的機會

許多網頁的套件庫都是使用 node 開發的，但因為 Hugo 是用 go 開發，雖然有提供對 npm 套件的支援，但是還是沒有原生的方便，在用套件的時候常常會遇到問題。所以我還是下定決心換到 Gatsby，也可以順便熟悉一下 React。另外，我是使用 TypeScript 來開發，這也是有點虐待自己，不過還好還是順利完成，也對 TS 有多點認識。

目前遇到的一個最大的缺點，大概就是 Hugo 產生網頁的速度真的超級快，Gatsby 因為依賴一大堆 npm 套件，所以我在 Cloudflare Pages 上的平均需要大約 5 分鐘網頁才能建置好。

## 遇到的問題

目前遇到的主要問題大概就是下面三點：

1. npm build 不成功
2. 觀看更多的功能
3. meilisearch

## npm to yarn

一開始我是使用 npm 作為套件管理，我在本機開發時都沒有遇到什麼問題，直到我幾乎都開發完成後，我就將網頁 push 到 GitHub 上，GitHub Actions 在 Build 時也沒有遇到問題，直到 Cloudflare Pages 在建置時，就是會一直失敗，我也一直確定 node 和 npm 版本跟我本地的一樣，但無論如何就是失敗，直到我上網查後，才發現 Gatsby 官方也是建議使用 yarn，npm 好像會遇到問題。我就試著 `yarn` 一下，讓專案自動遷移到 yarn，就沒又再出現問題了，實在莫名其妙。所以也是建議大家以後若有使用到 Gatsby，還是使用 yarn 比較好一點。

## 觀看更多

在 Hugo 時，Hugo 支援在 Markdown 中使用 `<!--more-->` 的標籤來提取標籤前的部分當作文章摘要，用來顯示在 ListTemplate，而 Gatsby 只有提供提取前 n 字的功能。而這對我網頁的美觀程度就有一點不方便，因為我 Hugo 已經累計了不少文章，若要現在再去一篇篇修改，也是會有點麻煩，所以只好自己稍微研究一下要怎麼處理。

```md
Hello

摘要

<!--more-->

正文

正文
```

我處理的方式簡單暴力，我發現 Gatsby 在 GraphQL 的時候，可以拿到 RawMarkdown，而且這個也會保留註解，所以我靈機一動，我就自己使用 Node 套件，自己解析 Markdown 不就好了？所以我就用 `marked` 套件，幫我把 md 轉成 html。範例大致如下：

```typescript
import { marked } from "marked";

export default function ({ node }: Props) {
  const summary = node.rawMarkdownBody.spllit("<!--more-->")[0];
  return <div dangerouslaSetSetInnerHTML={{ __html: marked.parse(summary) }} />;
}
```

## MeiliSearch

我原本的 Hugo 網頁，就是使用 MeiliSearch 來當我的搜尋功能，可以參考[這一篇]("posts/web/meilisearch-hugo") 。所以一樣是會需要產生一個 `SearchIndex.json`，我直接在 `gatsby-node.ts` 裡的 `noPostBuild` 手動產生 json，再用 `fs` 寫入檔案，直接給大家程式碼參考。

```typescript
export const onPostBuild: GatsbyNode["onPostBuild"] = async ({
  graphql,
  actions,
}) => {
  const { errors, data } = await graphql<ArticleListData>(articleGraphql);
  // SearchIndex.json
  const searchArr: SearchIndex[] = [];
  data!!.allMarkdownRemark.edges.forEach(({ node }, index) => {
    const summary = node.rawMarkdownBody.split("<!--more-->")[0];
    const url =
      "/posts/" +
      node.fileAbsolutePath
        .split("/posts/")[1]
        .split(".md")[0]
        .replace(" ", "-")
        .toLowerCase();
    const miliseconds = new Date(node.frontmatter.date).getTime();
    searchArr.push({
      id: index,
      date: miliseconds,
      url: url,
      title: node.frontmatter.title,
      summary: summary,
      content: node.internal.content.replace("\n", " "),
      tags: node.frontmatter.tags,
    });
  });
  fs.writeFileSync("./public/SearchIndex.json", JSON.stringify(searchArr));
};
```

產生 Json 後，我一樣是使用 GitHub Actions 來自動把 Index 推到 MeiliSearch Server。

## Tag Page

其實 Gatsby 應該也是有方法可以產生 Tag Page，但是因為我想到要用 Tag Page 時，我已經弄好 MeiliSearch 了，所以我就靈機一動，想想是不是也可以直接簡單的使用 MeiliSearch 來動態的產生 Tag Page 就好，結果還真的被我弄成功了，就來紀錄一下我大概的思路。雖然我知道這八成不是什麼好方法，但是簡單暴力。

MeiliSearch 可以設定 `filterableAttributes` 的屬性，所以我把我的 Index 中的 Tag 屬性設定成可以 Filterable，然後再取得網址的 Params，最後向 MeiliSearch 搜尋後動態的把結果顯示在網頁上。

這時遇到的問題就是 Gatsby 是 Server Side Rendering，所以取的 Params 要使用額外的 plugin，我是使用 `gatsby-plugin-use-query-params`，就可以像是 React 的 useState 的方式來取的網址的 Parm。

也是提供部分的程式碼給大家參考：

```typescript
export default function SearchTags() {
  const [{ tag }, _] = useQueryParams({ tag: StringParam }); // 取的 Params
  const [result, setResult] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    // 執行搜尋
    client
      .index("gatsby-blog")
      .search("", {
        filter: ["tags=" + (tag ? tag : "")],
        limit: Number.MAX_SAFE_INTEGER,
      })
      .then((res: any) => {
        setResult(res.hits);
        setIsLoading(false);
      });
  }, []);
  return (
    <MainLayout title={"tag: " + tag + " - TonyPepe"}>
      <div>
        <h1 className="my-4 bg-white rounded-md py-4 px-6 text-2xl">
          {"Tag: " + tag}
        </h1>
        {isLoading ? <LoadingChild /> : <ResultClild hits={result} />}
      </div>
    </MainLayout>
  );
}

const client = new MeiliSearch({
  host: "https://search.tonypepe.com",
  apiKey: "",
});
```

## 後紀

Node 在建置上實在是太慢，真的會有一點受不了，每次光是要 Run 起 Dev Server，就至少需要 30 秒，相比 Hugo 就算是有裝一點點的 npm 套件，還是只要 10 秒左右就可以開始寫網頁了。

當然，使用 Gatsby 開發的好處也是很多，可以最大化的自訂網頁的長相和功能，不會被 Hugo 的功能限制住，如果缺少了什麼功能，都可以自己用 js 開發出來，而且在使用一些 Web Library 和 React 真的太方便了。

## Reference

- [Gatsby](https://gatsbyjs.org/)
