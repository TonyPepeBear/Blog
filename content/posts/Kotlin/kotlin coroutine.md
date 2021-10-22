---
title: "Kotlin Coroutine"
description: Kotlin 在非同步處理上有新的方法，協程 Coroutine，Coroutine 不會像 Thread 會耗費大量的資源，能在原本的線程上創建極為輕量的協程，且較不會發生記憶體洩漏的情況。
date: 2021-09-19T07:26:56Z
draft: false
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/6f11a63e-3923-4ce5-3b6e-d06243815300/public
tags: 
    - kotlin
    - coroutine
categories:
    - Kotlin
---

Kotlin 在非同步處理上有新的方法，協程 `Coroutine`。`Coroutine` 不會像 `Thread` 會耗費大量的資源，能在原本的`線程`上創建極為輕量的`協程`，且較不會發生記憶體洩漏的情況。

<!--more-->

## 導入 Coroutine

在 `build.gradle` 中添加依賴項

```groovy
dependencies {
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.2'
}
```

若要在 `Android` 中使用需要再添加 `Android` 依賴

```groovy
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.2'
```

## 第一個 Coroutine

```kotlin
import kotlinx.coroutines.*

fun main() {
    GlobalScope.launch { //在後台啟動一個新的縣協程
        delay(1000L) //非阻塞式的等待 1 秒鐘
        println("World!")
    }
    println("Hello,")
    Thread.sleep(2000L) // 阻塞主線程兩秒確保主線程存活
}
```

上面的程式碼輸出結果：

```kotlin
Hellow, 
World
```

基本上 `Coroutine` 就是輕量的協程

也可以分別將 `GlobalScope.launch{...}` 和 `delay(...)` 替換成`thread { ... }` 和 `Thread.Sleap(...)`，也可以得到相同的結果，可以嘗試一下。

如果只將 `GlobalScope.launch{...}` 替換成 `thread{...}` 你會得到以下錯誤：

```shell
Error: Kotlin: Suspend functions are only allowed to be called from a coroutine or another suspend function
```

因為 `delay()` 是一個特殊的 `suspend function` (有人譯作 `掛起函數`)，他不會阻塞線程，但是會 `suspend` 協程，而且只能在協程中使用。

## 橋接阻塞和非阻塞的世界

上面的範例中同時使用了非阻塞式的 `delay()` 和阻塞式的 `Thread.sleap()`，這樣很容易讓我們混淆哪個會阻塞線程。下面我們使用 `runblocking{...}` 來阻塞線程

```kotlin
import kotlinx.coroutines.*

fun main() {
    GlobalScope.launch { // 在後台啟動一個新的協程
        delay(1000L)
        println("World!")
    }
    println("Hello,") 
    runBlocking {     // 這個表達式會阻塞主線程
        delay(2000L)  // 延遲兩秒來確保主線程存活
    }
}
```

結果基本上是相似的，只是都是使用了非組塞式的 `delay()`。調用了 `runblocking{...}` 的主線程會被阻塞直到 `runblocking{...}` 內的協程執行完畢。

下面用一個更合乎慣用法的方法在寫一次，用 `runblocking{...}` 來包裝 `main` 方法：

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking<Unit> { // 開始執行主協程
    GlobalScope.launch { // 在後台啓動一個協程並繼續執行
        delay(1000L)
        println("World!")
    }
    println("Hello,") 
    delay(2000L)  // 延遲 2 秒來確保主線程存活
}
```

這裡的 `runBlocking {...}` 用來啟動主線程。我們顯式指定了其返回類型 `Unit`，因為在 Kotlin 中 `main` 方法必須回傳 `Unit`。

## 等待一個作業完成

延遲一段時間來確保協程的運行並不是一個好辦法利用 `job.join()` 來確保工作執行結束。

```kotlin
val job: Job = GlobalScope.launch { 
    delay(1000L)
    println("World!")
}
println("Hello,")
job.join() 
```

`launch` 會回傳一個 `Job` 物件，而 `job.join()` 其實就是會等待 `job` 的工作完成再繼續持行。

我們也可以利用 `job.cancel()` 取消協程：

```kotlin
val job: Job = GlobalScope.launch { 
    delay(1000L)
    println("World!")
}
println("Hello,")
job.cancel() 
```

但是如果 `job` 已經完成工作，`cancel` 是不會發生任何事。

## 參考資料

* [Coroutine Basics](https://kotlinlang.org/docs/reference/coroutines/basics.html)
