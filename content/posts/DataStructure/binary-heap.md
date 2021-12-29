---
title: "Binary Heap"
description: 資料結構中有一種很特別的樹，很接近一般的二元樹。 
date: 2021-11-24T08:28:51Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/b8c0336c-3dab-407e-e3c5-0e9db8d93700/public
hidden: false
draft: true
tags: 
    - binary-heap
    - binary
    - heap
    - data-structure
    - data
    - structure
categories:
    - DataStructure
---

資料結構中有一種很特別的樹，很接近一般的二元樹。

## Heap Tree 基本特性

* 每個節點 (Node) 最多兩個子節點 (Child Node)
* 每層由左到右新增資料
* Min Heap 的節點都比自己的子節點小，Max Heap 則相反
* 承上可以發現，Min Heap 的根節點 (Root Node) 會是全部資料中最小的，Max Heap 則相反

下面是一個 Min Heap 的範例：

```txt
        1
      /   \
    2      4
   /  \   
  8    5
```

## Array v.s. Heap

因為 Heap Tree 由右到左存放資料的特性，所以非常適合使用陣列來儲存資料。

順便複習一下用陣列儲存二元樹的方式，從一開始跟從零開始都複習：

陣列從 `1` 開始存：

* n 的父節點：n / 2
* n 的左節點：2 * n
* n 的右節點：2 * n + 1

陣列從 `0` 開始存，我之後的範例程式以這個為準：

* n 的父節點：(n - 1) / 2
* n 的左節點：(2 * n) + 1
* n 的右節點：(2 * n) + 2

可以看看下面的比較：

```txt
        1
      /   \
    2      4
   /  \   
  8    5

index:  1  2  3  4  5
index:  0  1  2  3  4
  arr: [1, 2, 4, 8, 5]
```

## 新增節點

## 刪除節點

## Reference

* [資料結構大便當： Binary Heap](https://medium.com/@Kadai/資料結構大便當-binary-heap-ec47ca7aebac)
* [Binary Heap - GeeksforGeeks](https://www.geeksforgeeks.org/binary-heap/)
