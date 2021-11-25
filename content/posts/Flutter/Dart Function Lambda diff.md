---
title: "Flutter/Dart (){} 和 () => 的差別"
description: Flutter 因為大量使用依賴注入，所以常常會需要傳入 Function。傳入 Function 時，常常會看到兩種寫法，一下是 () {} 寫法，另一個是 () => 寫法。我剛開始寫的時候被搞得頭昏腦脹，查了一下才發現這兩個本身沒什麼不同。 
date: 2021-11-04T05:52:44Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/f8a3eaa5-e9c2-455f-d301-43fc77fee200/large
hidden: false
draft: false
tags: 
    - dart
    - flutter
    - function
categories: 
    - Flutter
---

Flutter 因為大量使用依賴注入，所以常常會需要傳入 Function。傳入 Function 時，常常會看到兩種寫法，一下是 `() {}` 寫法，另一個是 `() =>` 寫法。我剛開始寫的時候被搞得頭昏腦脹，查了一下才發現這兩個本身沒什麼不同。

## 不同在哪

下面我用在寫 Flutter 中常見的創建一個有 10 個 Text 的 List 舉例。

創建一個有 10 項元素的 List：

```dart
List<Text> list = List.generate(10, (index) => Text(index.toString()));
```

上面就是輸出一個帶有 0-9 的 List，那現在假設我會需要再創建 Text 前，根據 index 來做一些改變，下面就做最簡單的平方。

```dart
List<Text> list = List.generate(10, (index) {
    // do some work
    var text = (index * index).toString();
    return Text(text);
});
```

觀察上面兩個例子，不難發現兩個的差別，第一個寫法 `() =>` 後面直接接上一個表達式(Expression)，當作回傳值。而 `() {}` 則是在大括號中寫一個完整的 Function，所以要寫一個 return。

## Reference

* [Flutter/Dart - Difference between () {} and () => {}](https://stackoverflow.com/questions/51868395/flutter-dart-difference-between-and)
