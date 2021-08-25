---
title: "用 VSCode 寫 C/C++"
date: 2021-06-08T00:55:19+08:00
draft: false
tags: 
    - vscode
    - code
    - c
    - c++
categories:
    - VSCode
---

其實在 VSCode 寫 C 根本不是一件難事，VSCode 本來就是一個優秀的文字編輯器，所以要要寫 C 完全不是問題，但問題是出在執行或 Debug 寫好的 Code 實在是很麻煩，要先經過不少設定。而且在官方的文件中，其實是教你怎麼建置專案，執行 Debug，如果只是寫一點簡單的小程式根本用不到那麼複雜的設定，所以本文是我目前發現比較容易在 VSCode 中執行 C 和 C++ 的方法。

<!--more-->

## gcc g++

在了解如何設定 vscode 前，我們先來了解一下基本的 gcc、g++ 指令，這是一個用來編譯 C 程式碼最快的方法，gcc 就是 C 的編譯器，g++ 則是 C++ 的。這裡不會解說如何安裝，在 Windows 下可以使用 MinGW，macOS 則是只要在 Terminal 下 gcc 指令，就會自動問你要不要安裝。

下面的範例會編譯 `main.cpp` 的 C++ 檔案：

```bash
g++ main.cpp
```

執行上面的指令後，會產生名為 `a.out` 的檔案，因為我們沒有指定輸出檔名，所以預設就是 `a.out`，在 Windows 上則為 `a.exe` 的執行檔。如果要執行產生的執行檔案：

```bash
./a.out
./a.exe # On Windows
```

要指定輸出檔名也很簡單，加個 `-o`：

```bash
g++ -o main.out main.cpp
```

這樣就可以將 `main.cpp` 編譯成 `main.out` 的執行檔。

上面這些不會也沒關係，但我還是建議了解一下，因為等一下要安裝的模組，只是幫你完成這些步驟，如果完全不了解指令的功能，發生問題可能自己會沒辦法解決。

## 設定 VSCode

第一步就是先在 VSCode 中安裝 **C/C++**，和 **Code Runner**，兩個延伸模組。

![img](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210608014749.png)

![img](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210608021309.png)

安裝完成後，應該就會看到右上角出現了一個執行的按鈕，可以按按看程式會不會執行。

![img](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210608021808.png)

如果找不到按鈕，或是想要停下程式，也可以用按下 `f1` 的方式叫出 VSCode 的指令輸入窗，輸入 `Run Code` 或是 `Stop Code Run`。

![img](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210608022037.png)

## Run In Terminal

現在可能會發先一個問題，這種執行模式是沒有辦法接收鍵盤輸入的，如果想要接收鍵盤輸入，我們要把執行模式改成在 Terminal 中。所以我們要開啟 VSCode 的 `settings.json` 設定檔，來更改設定，一樣是用 `f1` 叫出命令輸入區，並尋找 `open settings json`：

![img](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210608024052.png)

打開後在裡面新增一行：

```json
"code-runner.runInTerminal": true
```

如果前方有其他設定值，記得在前面的設定值的最後面加個逗號 `,`：

![img](https://raw.githubusercontent.com/TonyPepeBear/ImageBed/main/20210608024259.png)

現在就可以方便的在 VSCode 中寫 C，和方便的執行他們。
