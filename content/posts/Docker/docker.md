---
title: "Docker"
date: 2021-08-25T18:31:57Z
draft: true
tags: 
    - docker
categories:
    - Docker
---

Docker 是一個虛擬化技術，可以將我們編寫好的程式包裹成一個小的「容器」，再發佈到伺服器上。Docker 解決了困擾程式設計多年的環境問題，只要伺服器安裝了 Docker 就可以確保一定可以執行服務。

<!--more-->

## Docker v.s. VM

入門 Docker 最常見的問題就是，Docker 和 VM 差在哪裡？這個問題不難理解，VM 「虛擬機」，顧名思義是虛擬化「硬體」。而 Docker 則是只虛擬化作業系統，或是稱作「軟體」。

大家都應該知道每創建一個虛擬機，都會耗費掉數分鐘的時間，若還要安裝環境，那耗費的時間則會相當可觀，也會耗費掉相當大的硬體資源。Docker 只虛擬化軟體的優勢，就是可以在幾秒內就啟動服務，耗費資源也相當少，還省去了建立環境的時間。

## Docker Hub

> Git 有 GitHub，Docker 有 Docker Hub

Docker Hub 是 Docker 官方用來存放 Image 的倉庫 (Registry)，使用者也可以自架 Registry，但是如果未指定 Registry，Docker 預設會去找 Docker Hub 上的 Image。

## Image and Container

Docker 用 Image 創建 Container，也就是說，Container 是 Image 的實例。

## Image

Docker Image 可以由下列幾方式取得：

- 從 Docker Hub 上下載
- 由 Dockerfile 構建
- 從其他電腦 import
