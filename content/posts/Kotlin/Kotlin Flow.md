---
title: "Kotlin Flow"
date: 2022-04-17T14:00:13Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/973beda6-caa9-4559-1f92-8ab5bd7d2700/public
draft: false
tags: 
    - kotlin
    - coroutines
    - flow
    - android
categories:
    - Kotlin
---

Kotlin 在多工處理上提供非常好用的 Coroutine。當不同 Job 之間需要傳遞資料時，總會遇到許多問題，以前最簡單的方式就是 Callback，但 Callback 模式已經在各個程式語言中產生許多問題，這邊就不多討論。Kotlin Coroutine 如果只是要回傳一個值，可以直接用 Suspend 的 Return 值，但如果是要回傳很多資料呢？簡單的方式是直接回傳 List，可是如果資料非常大，也會產生出問題。所以 Kotlin 提供 Flow 來幫助解決大量資料傳遞的問題。

<!--more-->

## Kotline Coroutine

如果還不知道什麼是 Coroutine 的，我以前也有寫過[Kotlin Coroutine](/posts/kotlin/kotlin-coroutine/)。

## List OF Numbers

讓我們先來看一個簡單的範例，產生一個會回傳 1 到 100 的 Int Function：

```kotlin
fun nums(): List<Int> {
    val ans = mutableListOf<Int>()
    for (i in 1..100) {
        ans.add(i)
    }
    return ans
}

fun main() {
    nums().forEach { value ->
        println(value)
    }
}
```

乍看之下沒什麼問題，但是如果這是一個需要大量 CPU 或 IO 處理的工作而且回傳值非常大，就會對記憶體產生負擔。下面假設我們需要 1 到 100,000，並用 `delay()` 模擬 CPU 工作，然後改成 Suspend Function。下面也把 main 改成 `runBlocking`，方便執行 Suspend Function：

```kotlin
suspend fun nums(): List<Int> {
    val ans = mutableListOf<Int>()
    for (i in 1..100_000) {
        delay(100)
        ans.add(i)
    }
    return ans
}

fun main() = runBlocking {
    nums().forEach { value ->
        println(value)
    }
}
```

上面的範例就會對記憶體產生一定的負擔，這時就是改成 Flow 的好時機：

```kotlin
suspend fun nums(): Flow<Int> = flow {
    for (i in 1..100_000) {
        delay(100)
        emit(i)
    }
}

fun main() = runBlocking {
    nums().collect {
        println(it)
    }
}
```

可以看到上面的範例沒有一次產生一個很大的 List，再一次把資料回傳，寫的也可以更簡潔。

## Flow is Cold

這句話的意思是，如果 Flow 沒有被 Collect，那麼 Flow 就永遠不會被執行。

下面的例子我們在 Emit 前加上一個 `println` ，並用一個變數接住一個 Flow，但不去呼叫 Collect，所以會先輸出 `Hello World` 才會輸出 `Start Flow`。

```kotlin
suspend fun nums(): Flow<Int> = flow {
    println("Start Flow")
    for (i in 1..5) {
        delay(100)
        emit(i)
    }
}

fun main() = runBlocking {
    var n: Flow<Int> = nums()
    println("Hello World")
    n.collect {
        println(it)
    }
}
```

輸出：

```text
Hello World
Start Flow
1
2
3
4
5
```

## Emit 時 才會呼叫 Collect

把上面的例子再 emit 前加上一個 `println()`：

```kotlin
suspend fun nums(): Flow<Int> = flow {
    println("Start Flow")
    for (i in 1..5) {
        delay(100)
        println("emit $i")
        emit(i)
    }
}

fun main() = runBlocking {
    var n: Flow<Int> = nums()
    println("Hello World")
    n.collect {
        println(it)
    }
}
```

看到輸出可以發現，會先看到 emit() 上面的 print 被執行，才會執行到呼叫 collect 時傳進去的 function。

```text
Hello World
Start Flow
emit 1
1
emit 2
2
emit 3
3
emit 4
4
emit 5
5
```

## Flow 的資料量是固定的

這句話的意思並不是說 flow 只能定義好數量再回傳，而是說如果 flow 裡的所有 emit 沒有被 collect，就會出錯。

下面的 flow 就一定要被 collect 五次，如果因為呼叫他的 function 被意外中斷，這個 flow 也會拋出錯誤。

```kotlin
suspend fun nums(): Flow<Int> = flow {
    for (i in 1..5) {
        emit(i)
    }
}
```

那麼如果我只要一定數量的資料怎麼辦？下面範例取自官方文件：

```kotlin
fun numbers(): Flow<Int> = flow {
    try {                          
        emit(1)
        emit(2) 
        println("This line will not execute")
        emit(3)    
    } finally {
        println("Finally in numbers")
    }
}

fun main() = runBlocking<Unit> {
    numbers() 
        .take(2) // take only the first two
        .collect { value -> println(value) }
}

/* output:
1
2
Finally in numbers
*/
```

## Flow mapping

Flow 可以用 map 的方式，轉換成另一個 Flow。

這個例子產生平方數：

```kotlin
suspend fun allNumbers(n: Int): Flow<Int> = flow {
    for (i in 1..n) {
        emit(i)
    }
}

suspend fun square(n: Int): Flow<Int> = allNumbers(n).map { it * it }

fun main() = runBlocking {
    square(10).collect {
        println(it)
    }
}

// output: 1 4 9 16 25 36 49 64 81 100 
```

## Flow Filter

這個例子輸出 1 到 100 之間的所有質數：

```kotlin
suspend fun allNumbers(n: Int): Flow<Int> = flow {
    for (i in 1..n) {
        emit(i)
    }
}

suspend fun primeNumbers(n: Int): Flow<Int> = allNumbers(n).filter { it.isPrime() }

fun Int.isPrime(): Boolean {
    if (this <= 1) return false
    for (i in 2..this / 2) {
        if (this % i == 0) {
            return false
        }
    }
    return true
}

fun main() = runBlocking {
    primeNumbers(100).collect {
        print("$it ")
    }
}

// output: 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 
```

> 碎念：這段程式真的充分展現 Kotlin 的威力..

## 後記

Flow 還有很多複雜的用法，像是合併兩個 flow 之類的，建議有興趣的人可以自己去看官方文件。

## Reference

* [Asynchronous Flow](https://kotlinlang.org/docs/flow.html)
