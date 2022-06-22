---
title: 用 Cloudflare Workers 架設 Serverless 短網址服務
date: 2022-06-21T09:15:49Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/b6cf9d30-1028-4aa5-c136-0dbc6c098f00/public
draft: false
tags:
  - cloudflare
  - workers
  - worker
  - web
  - short
  - url
categories:
  - Web
---

Cloudflare Workers 也是 Cloudflare 的佛心服務之一，可以把 node 程式部署到 Cloudflare 上的眾多節點，效能也不俗，每天還有 100,000 次的免費呼叫，也沒有冷啟動的問題，對流量不高的網頁來說完全夠用。另外，還有 Workers KV 可以用來儲存資料，這就可以寫出簡單的動態網頁，甚至是一些更複雜的應用。今天就來寫一個 Serverless 的短網址服務，並把資料存在 KV 中，就我目前自己測試下來，Workers 的效率真的沒話說。

<!--more-->

## Workers Playground

如果想要在網頁中先試試看 Workers，可以到 [Cloudflare Workers](https://cloudflareworkers.com/) 這個網站。

會有一個預設的模板長這樣：

```js
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Fetch and log a given request object
 * @param {Request} request
 */
async function handleRequest(request) {
  console.log("Got request", request);
  const response = await fetch(request);
  console.log("Got response", response);
  return response;
}
```

讓我們先來理解一下程式碼。

可以看到程式有兩個 function，其中 `addEventListener(...)` 就是程式的入口，當 Workers 收到 Request 之後，就會傳入你給他的 function，然後再決定要用什麼 Response 回傳到 Client，這裡他寫了一個 `handleRequest` 的 function 來處理。所以這個程式碼實際上做的事，就只有把 Request 和 Response 給 log 出來，回傳原本的網頁的樣子不做任何更動。

下圖是 Workers 在 Cloudflare 上的運行順序，可以看到 Workers 被放在最後一個，也就是最後一個決定要回傳什麼內容給 User 的地方，也可以理解為可以在這裡對原本的 Response 做最後的更動，再回傳給 Client。

所以這個 Playground 上可以輸入任意的 URL，來預覽你的 Workers 在任何一個網站上，會對 Response 做的更動。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/32bd1508-ba78-4e94-76a0-adec503fe000/public)

也就是說如果把程式改成下面這樣，就可以發現任意網站都會變成 Google 的模樣。

```js
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const response = await fetch("https://google.com");
  return response;
}
```

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/d7409a8b-8203-4e23-6491-309a4cc5b500/public)

理解後就會發現，其實 Workers 可以對網頁有即時性的更改，也就是說可以對現有的網頁加上新功能，或是在不更動原本網頁的情況下去修 bug。

## Wrangler

Wrangler 是管理 Workers 會用到的 cli 工具，雖然不安裝也是可以在網頁中撰寫 Workers ，但是功能就會少很多，所以還是建議安裝一下。這裡是官方的 Repo [cloudflare/wrangler2](https://github.com/cloudflare/wrangler2)。

用 npm 安裝到 Global：

```bash
npm i @cloudflare/wrangler -g
```

還是建議去官方 Repo 看下有沒有其他注意事項

安裝完成後要登入 Cloudflare 帳號，`wrangler login`，再用瀏覽器登入即可。

## Init Project

`wrangler init <project-name>` 創建新的專案，這當中 Wrangler 會問一些問題，可以按照自己的需求決定。

init 完成後，可以看到自動產生了一些檔案，基本上會用到的只有 `wrangler.toml` 和 `index.js` 兩個檔案。

現在可以先在 Terminal 中輸入 `wrangler dev`，就可以讓 Workers 跑在本地。

### Bug

因為我的 Cloudflare 一次登入多個 User，所以在使用 wrangler 的 **2.0.14** 時候會出 bug 直接閃退，我解決的方式是直接在 `wrangler.toml` 中輸入 `account_id` 來避免 wrangler 會需要選擇帳號的問題。

```toml
account_id = "xxxxxxxxxxxxxxx"
```

## Cloudflare Workers KV

看到名字取作 KV，直觀的就是表示 `key-value` 鍵值對，缺點是 Key 只能對上一個 Value，不能要巢狀的 Value (像是 Json 那樣)，解決的方式其實也是不難，可以直接在 Value 中存上整的 Json 檔案，但在本文不會多做說明，可以自己研究看看。

另外 Cloudflare 也有提到，KV 存取在全球可能不是即時性的，好像是只保證 60 秒後會同步到所有 Server，雖然我覺得最慢應該也是 5 內秒啦，我從來沒有感受到延遲過，但如果對即時性有疑慮的專案可能也要注意一下。

下面就來創建一個 KV namespace，這就是一個 Database 的基本單位，目前 Cloudflare 是允許一個帳號有 100 個 KV namespace，所以正常來說應該也不用擔心會用完。下面用 `URLS` 當作 namespace 的名稱，因為我們是要存短網址的資料。

```bash
$ wrangler kv:namespace create "URLS"

🌀  Creating namespace with title "my-site-MY_KV"
✨  Success!
Add the following to your configuration file:
kv_namespaces = [
  { binding = "URLS", id = "xxxxxxxxxxxxxxxxxxxxxxx" }
]
```

然後 wrangler 會有個給你一個 binding 和 id，就直接複製貼上到 `wrangler.tmol` 中即可：

```toml
kv_namespaces = [
  { binding = "URLS", id = "xxxxxxxxxxxxxxxxxxxxxxx" }
]
```

如果要在 wrangler 的 dev 模式中測試 KV，就多申請一個 Preview KV，來避免對已經上線的服務造成影響：

```bash
$ wrangler kv:namespace create "URLS" --preview

⛅️ wrangler 2.0.14
--------------------
🌀 Creating namespace with title "URLS"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "URLS", preview_id = "xxxxxxxxxxxxxxxxxxxx2" }
```

這次把 `preview_id` 家在原本的 id 後方即可：

```toml
kv_namespaces = [
    { binding = "URLS", id = "xxxxxxxxxxxxxxxxxxxx", preview_id = "xxxxxxxxxxxxxxxxxxxx2" }
]
```

設定好後，wrangler 會直接把你剛剛取的名字直接用環境變數 (ENV) 傳入，具體的使用方式可以繼續往下看。

## Routing

為了方便等等我們處理傳入的 Routing，我們先來安裝一個 npm 套件。對你沒看錯，Workers 也是支援 npm 套件的：

```bash
yarn add itty-router

npm i itty-router
```

這樣等等就可以用 itty-router 來處理傳入的 request。

我們先將 Handle Request 完全丟給的 itty-router 來處理，將 index.js 改成下方這樣：

```js
import { Router } from "itty-router";

const router = Router();

export default {
  fetch: router.handle,
};
```

可以看到直接 export router 的 handle 方法，這樣就完全把 Requse 交給 Router 來處理。我們先將 root 回傳 Hello 測試看看：

```js
import { Router } from "itty-router";

const router = Router();

router.get("/", async (req, env) => {
  return new Response("Hello Workers", {
    status: 200,
  });
});

export default {
  fetch: router.handle,
};
```

現在可以 `wrangler dev` 一下，然後到 `loclahost:8787/` 看看會不會回傳 Hello Workers。

> 之後的程式碼就不再完整的寫出來了，但就是在這個大框架下撰寫

### New 短網址

我們寫一個 post 方法來接收新的網址，並回傳他的新短網址給他。

```js
router.post("/new", async (req, env) => {
  const body = await req.json();        // 取得 POST JSON BODY 並轉成 JS 物件
  console.log(JSON.stringify(body));
  var { url, len } = body;
  if (url == undefined) return f00(""); // JSON 有誤，回傳 400 錯誤
  if (!isValidHttpUrl(url)) return f00("URL is not valid");  // 確認是否為 Http 網址
  if (len == undefined) len = 5;
  if (len < 4) return f00("Lenght must be at least 4"); // 確認至少大於等於 4
  var s = getRandomString(len); // 產生英文亂碼
  while ((await env.URLS.get(s)) != undefined) { // 從 kv 確認沒有重複
    len++; 有重複將 len +1 後再產生新的
    s = getRandomString(len);
  }
  await env.URLS.put(s, url); // 存入 kv
  return new Response(s);
});

const f00 = (msg) => new Response(msg ? msg : "BAD REQUEST", { status: 400 });

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function getRandomString(len) {
  var s = "";
  for (let i = 0; i < len; i++) {
    s += String.fromCharCode(getRandomInt(26) + 97);
  }
  return s;
}
```

這個 POST 要吃一個像是下面的 json body，分別有要縮的網址，和要產出的短網址長度：

```json
{
  "url": "https://tonypepe.com",
  "len": 3
}
```

可以發現我們是沒有做權限檢查的，所以任何人只要對 POST `/new`，都可以產生新的短網址，但我自己是覺得問題也不大，畢竟 Cloudflare 就是一家 ddos 防護商，所以要被攻擊到一天的使用量都用完應該也很難。或是你想要做權限檢查，也可以試著實作看看。

## Redirect 重新導向

最後一步就是把短網址重新導向到原本的網址，這部份很簡單，就是從 kv 取得原本的網址，然後 Response HTTP 303 來做重新導向，取不到 value 就給 404。

```js
router.get("/:path", async (req, env) => {
  const { params } = req;
  const url = await env.URLS.get(params.path.toLowerCase());
  if (url == undefined) return new Response("NOT FOUND", { status: 404 });
  const response = new Response("", { status: 303 });
  response.headers.append("Location", url);
  return response;
});
```

## Publish

`wrangler publish` 就可以把程式碼部署到全球的 Cloudflare 節點，如果沒有自己網域，Cloudflare 也會給你一個 `xxx.workers.dev` 的網域免費使用，可以現在這裡測試看看，再決定要不要把自己的網域綁定上去。

## 後記

這篇用不到 100 行程式碼熟練了 Cloudflare 的 Serverless 服務，和寫出了短網址應用，讓我們不用自己架設自己的 Server 就可以有動態網頁的功能。我還看到官方的文件中可以把 Response 加上 Cors 的標頭，讓原本不允許跨站存取的 api 可以跨站存取，雖然很不道德，但是我喜歡。我自己還想到可以對原本的靜態網頁加上限制存取的功能，或是網頁有誤直接把網頁先導向 404，這都是很有趣的應用，大家可以自己發揮看看。

如果要完整程式碼：[Gist](https://gist.github.com/TonyPepeBear/f435dae11b83fc2626a49a6b3cc9848b)

## Reference

- [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
