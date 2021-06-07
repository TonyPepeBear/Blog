---
title: "用 Github Actions 來發布 Hugo 靜態網頁"
date: 2021-06-07T22:00:53+08:00
draft: false
tags: 
    - hugo
    - github
    - github-actions
    - web
categories:
    - Hugo
---

Github Actions 是 Github 官方提供的 CI/CD 服務，編寫簡單的腳本，就可以在每次 Push、 PR 時，自動的檢查程式碼可不可以通過 Test，或是直接產生 Release 來交付專案成品。另外一個重點是，這個服務完全免費，而在私有 Repo，則是有限制容器的執行時間。本文使用 Github Actions 來自動將 Hugo 專案自動產生靜態網頁，並且將網頁發布到 `gh-pages` 的 git 分支。

<!--more-->

Github Actions 也是容器化技術的一環，也是類似 Docker 容器的一種，如果對 Docker 還不熟悉，應該會對本文有點吃力，但也可以對完全不了解 Docker 的人，多一點對容器化技術的認識。

## 編寫 Workflows 檔案

Workflows 工作流檔案，就是在 CI/CD 中最重要的檔案，這個檔案寫下這個專案的工作流程，像是如何 Test、交付成品，都是寫在這的檔案裡，Github 會自動讀取所有工作留檔案和自動執行，所以只要寫好一次，基本上就一勞永逸，每次只需要 Push，Gihtub 就會按照腳本完成指定的工作。

Github Actions 的 Worksflows 檔案都是放在專案跟目錄的 `/.github/workflows` 這個資料夾中，Github 會讀取這個資料夾中的 `*.yml` 檔案，並且自動執行他們。我們現在在這個目錄下新增一個叫做 `hugo-public.yml` 的檔案，檔名可以自訂沒關係，Github 不會關心檔名長怎樣，如果有多個檔案也每個都會分別執行。

我們在現在 `/.github/workflows/hugo-public.yml` 的檔案中新增如下的腳本：

```yml
name: github pages

on:
  push:
    branches:
      - master  # Set a branch to deploy
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/master'
        with:
          github_token: ${{ secrets.ACCESS_TOKEN }}
          publish_dir: ./public
```

下面我們分段來解釋上面腳本每行的意思。

## Name

基本上就是這個腳本的名稱，可以隨意自訂不會影響結果。

## On

```yml
on:
  push:
    branches:
      - master  # Set a branch to deploy
  pull_request:
```

`on` 區段定義了這個腳本什麼時候會被執行，我們現在這個範例中，定義了這個腳本會在 `master` 這個分支被 push 的時候自動執行。Github 現在預設的分支名稱是 `main`，如果是 `main` 的人千萬要記得改，以免這個腳本永遠不會執行。

## Jobs

```yml
jobs:
  deploy:
    # 以下省略
```

jobs 是整個檔案中最核心的部分，可以分成許多不同的 Job，目前我們只有一個叫做 `deploy` 的 Job，這個名稱也是可以自訂的，這裡只是取叫 `deploy` 看不順眼可以自己換。如果還需要有其他工作，可以自己視情況增加。

### Job

終於來到最核心的部分，deploy 任務中的第一行，就定義了這個任務要 Run 在哪個容器內，或是稱作哪個系統內。這邊是用 `ubuntu` 的 20.04，建議不要亂改，因為其他的 Linux 不一定可以完任務。

``` yml
deploy:
    runs-on: ubuntu-20.04
    ## 以下省略
```

### Steps

接下來就是分步驟執行命令，`uses` 是利用 Github 上別人已經寫好的 Actions 腳本來執行命令，像是第一個 `uses: actions/checkout@v2` 就是李用 Github 上別人已經寫好的 `git checkout` 命令來把專案 checkout 到容器中。

第二個部分也是使用別人已經寫好的腳本，快速的安裝 Hugo 到容器內，用別人寫好的東西來完成工作，避免不必要的重複造輪子。

```yml
steps:
    - uses: actions/checkout@v2
    with:
        submodules: true  # Fetch Hugo themes (true OR recursive)
        fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

    - name: Setup Hugo
    uses: peaceiris/actions-hugo@v2
    with:
        hugo-version: 'latest'
        extended: true

    - name: Build
    run: hugo --minify

    - name: Deploy
    uses: peaceiris/actions-gh-pages@v3
    if: github.ref == 'refs/heads/master'
    with:
        github_token: ${{ secrets.ACCESS_TOKEN }}
        publish_dir: ./public
```

看到這裡也可以發現任務也是分很多步驟，第三部分的 Build 就是像是我們在本機目錄的產生方法一樣，直接輸入 `hugo` 命令產生靜態網頁。

第四部分的 Deploy 就會比較複雜，這邊也是利用別人寫好用來發布 Github Pages 的任務，他會需要一個 Github Token，這個 Token 是要用來對 Repository 有 Push 的權限，雖然可以直接寫在腳本裡，但是就所有人都看得到你的 Token，那就會產生資安問題。所以 Github 提供 Secrets 的模式，可以把不方便直接寫在專案裡的機敏資料，放在 Github 上。

所以我們現在會有兩件事要做：

1. 產生 Token
2. 把 Token 放到專案的 Secrets 中

我們先來產生 Token，先到個人的設定頁面找到 Developer settings：

![](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210607222716.png)

再到 Token 的頁面產生新的 Token：

![](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210607222844.png)

名稱可以自己隨意訂，Repo 的權限就全部打開，除了 Repo 以外的權限則都不需要。都確定後直接拉到最下面產生 Token：

![](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210607223119.png)

會得到一組新的 Token，請注意不要像我一樣 Show 出來給別人看，請妥善保存，而且 Github 也只會顯示這一次，以後想要看都看不到，只能產生新的 Token。

![](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210607223221.png)

複製下 Token 後，我們到專案層級的設定，注意是**專案**的設定，不是個人設定：

![](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210607223843.png)

找到 Secrets 並新增 Secrets：

![](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210607224004.png)

名字取好後，填入剛剛拿到的 Token，注意名稱要和剛剛在腳本中寫的一樣：

![](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210607224102.png)

都填完後就大功告成，基本上只要 Push 到 Github 上，應該就會自動觸發上面寫的工作，以後只要文章有新的變動，Push 上來就會自動更新網頁網頁到專案的 `gh-pages` 分之上。想要進一步看到 Pages 的設定，可以到專案下的 Pages 的設定下看看，也可以在這裡自訂 Domian。

![](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210607224634.png)

