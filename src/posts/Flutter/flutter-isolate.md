---
title: Flutter Isolate 多執行緒
date: 2023-03-15T01:53:01.621Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/2aa71d52-6fd6-4086-80fc-ba6692219700/public
draft: false
tags:
  - flutter
  - dart
  - isolate
  - multithread
categories:
  - Flutter
---

本文翻譯自 Medium。[原文網址](https://medium.flutterdevs.com/multithreading-in-flutter-aa07e2ae2971)，請在閱讀前先去幫原作者拍拍手。另外，我也有在原文中加入一些我自己的理解。

Flutter 是由 Google 開發的跨平台框架，因其出色的用戶界面能力和動畫而引起了廣泛關注。如果我們遇到畫面卡住、動畫未按預期工作以及螢幕跳躍等問題，它的威力就會受到阻礙，進而導致整個用戶體驗變得很糟糕。通常，觸發這種現象的原因可能是同步訪問多個 API 請求、圖像處理、動畫或任何其他耗時操作。

很多開發人員希望在他們的應用程式中解決此問題，以便讓程式不會出現這種情況。可以通過創建多個隔離線程 `Isolate`，這些線程具有自己的事件循環並與運行 Flutter 的主執行緒 (Main Thread) 不共享記憶體來完成此操作。此過程稱為多執行緒處理。

<!--more-->

Dart 是一種單線程語言：所有的 Dart 程式碼都在一個 `Isolate` 中運行，這讓它們非常重要，整個 Dart 應用程序都在一個隔離體中運行。

> 在 Flutter 中，每一個執行緒 (Thread) 就稱做一個 Isolate。

## Need for Isolate

在 Flutter 中，即使是使用 async/await 的情況下，所有程式碼都在 Main Isolate 中執行 (雖然看起來是非同步的執行，但他們只是在 Main Isolate 中輪流執行，所以 async/await 數量一多還是會造成卡頓)，因此多線程是必不可少的。

`Isolate` 非常有用，可以運行需要很長時間才能完成而不會阻塞主線程的程式碼，這對於提供流暢和反應靈敏的用戶體驗非常重要。多線程允許程式的兩部分或更多部分並行執行，利用 CPU 的多核心。同時也可以讓程式同時執行多項任務，以減少對用戶輸入等事件做出反應時間。

在深入探討 `Isolate` 的類型之前，有幾件事情需要記住：

- 線程之間無法相互通訊：創建的隔離體之間沒有通訊，包括在 Flutter Isolate 中的自定的對象。
- 通訊是透過 `port` 完成的：線程之間的任何通訊都是通過 port 進行的。

## Types Of Isolate In Flutter

在 Flutter 中有兩種方式可以創建 Isolate：

- `Compute` function
- `Spawn` function

### Spawn Function

使用 `spawn` 創建 Isolate 很簡單，它需要兩個參數：一個 Function 和 （可選的）Function 傳入值。

以下是如何使用 Isolate.spawn 創建 Isolate 的範例：

```dart
import 'dart:isolate';

void main() {
    // create the isolate
    Isolate.spawn(isolateFunction, "Hello from the main isolate!");
}

void isolateFunction(dynmic message) {
    print(message);
}
```

這會創建一個 Isolate 並在背景中執行 `isolateFunction` 中的程式碼。Main Isolate 將字串 "Hello from the main isolate!"，傳給新的 Isolate，這個字串會被新的 Isolate 接收到並且印出來。

請注意，Isolate 是被不同的 Thread 執行的，他們並不共享記憶體，這意味著你需要用 Isolate 之間的通訊技術來在不同的 Isolate 中傳遞數據（就像面的範例是在創建 Isolate 時傳入，或是晚點會介紹的 Port）。

### Compute Function

Flutter 中。你可以使用 Compute function 在單獨的 Isolate 中執行 function，Compute function 是一個 `Isolate.spawn` 的包裝器 (wrapper)，讓 Isolate 執行計算密集型的任務更方便一點。

下面是一個在 Flutter 中使用 Comput function 創建 Isolate 的範例：

```dart
import 'dart:async';

Future<void> computeFunction async {
    int result = await compute(computeIntensiveFunction, 100);
    print(result);
}

int computeInstensiveFunction(int value) {
    // 執行一些計算密集型任務
    return value * value;
}
```

在這個例子中，使用 `compute()` 來創建一個獨立的 Isolate 來執行 `computeInstensiveFunction` 中的程式碼。Compute function 會回傳一個 `Future` ，會在 Function 執行完成時，回傳 Function 的回傳值。在這個例子中是會回傳 100 \* 100 = 10000，所以 result 的直是 10000。

請注意，傳遞給 Comput function 的 Function，必須是頂層函數 (top-level function)，或是 static method，並且傳入值和回傳值的型態都是 dynmic。

## Isolate 們如何相互溝通

要在 Isolate 之間通訊，可以使用 `SendPort` 和 `ReceivePort`。

以下是一個範例，告訴你如何使用這兩個 classes 來將訊息從 Main Isolate 傳送到新的 Isolate：

```dart
import 'dart:isolate';

void main() {
    // 創建一個 SentPort 來將訊息傳送到新的 Isolate
    final sendPort = new SendPort();
    // 創建一個新的 Isolate
    Isolate.spawn(isolateEntryPoint, sendPort);
}

void isolateEntryPoint(SendPort sendPort) {
    // 創建一個 ReceivePort 來接從 Main Isolate 接收訊息
    final receivePort = new RceivePort();

    // 傳送 receivePort 的 sendPort 給 Main Isolate，來讓 Main Isolate 可以傳送訊息到這個 Isolate
    sendPort.send(receivePort.sendPort);

    // 監聽來自 Main Isolate 的訊息
    receivePort.listen((message) {
        print('Message received: $message');
    });
}
```

要從新的 Isolate 傳送訊息回到 Main Isolate，可以用從 Main Isolate 傳入的 SendPort。

以下是如何使用此 SendPort 將訊息傳回 Main Isolate：

```dart
void isolateEntryPoint(SendPort sendPort) {
    // 創建一個 ReceivePort 來接從 Main Isolate 接收訊息
    final receivePort = new RceivePort();

    // 傳送 receivePort 的 sendPort 給 Main Isolate，來讓 Main Isolate 可以傳送訊息到這個 Isolate
    sendPort.send(receivePort.sendPort);

    // 監聽來自 Main Isolate 的訊息
    receivePort.listen((message) {
        print('Message received: $message');

        // 傳送訊息回 Main Isolate
        sendPort.send("Hello from the isolate!");
    });
}
```

在 Main Isolate 中，你可以使用 ReceivePort 來監聽來自新的 Isolate 的訊息：

```dart
import 'dart:isolate';

void main() {
    // 創建一個 SentPort 來將訊息傳送到新的 Isolate
    final sendPort = new SendPort();

    // 創建一個新的 Isolate
    Isolate.spawn(isolateEntryPoint, sendPort);

    // 創建一個 RecivePort 來接收來自新 Isolate 的訊息
    final receivePort = new ReceivePort();

    // 傳送 ReceivePort 的 SendPort 給新的 Isolate
    sendPort.send(receivePort.sendPort);

    // 監聽訊息
    receivePort.listen((message) {
        print('Message received: $message');
    });
}
```

`flutter_isolate` 套件提供了一種在單獨 Isolate（單獨的執行 Context）中運行 Dart 程式碼的方法。 Isolate 用於並行執行程式碼，可以用於實現負載平衡，因為它們允許你將工作負載分佈到多個線程中。

以下是如何在 Flutter 中使用 `flutter_isolate` 來平衡工作量的範例：

```dart
import 'package:flutter_isolate/flutter_isolate.dart';

void main() {
    // 創建一個要負載平衡的 function
    final workload = () {
        // Do some work here
    };

    // 創建一個列表的 Isolate
    final isolates = [
        IsolateRunner(workload),
        IsolateRunner(workload),
        IsolateRunner(workload),
    ];

    // 執行每一個 Isolate
    for (final isolate in isolates) {
        isolate.run();
    }
}
```

這個範例創建了一個包含三個 Isolate 的列表，每一個 Isolate 都有相同的工作，你可以呼叫每個 Isolate `run()` 來執行他們。

其他使用方法可以看 [flutter_isolate 的官方文件](https://pub.dev/packages/flutter_isolate)

## Reference

- [原文網址](https://medium.flutterdevs.com/multithreading-in-flutter-aa07e2ae2971)
- [flutter_isolate](https://pub.dev/packages/flutter_isolate)
