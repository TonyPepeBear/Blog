---
title: S7 刷 Android 11 + Pokemon Go 飛人簡單紀錄
date: 2022-07-17T13:39:39Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/d0d9494e-6a67-4237-77aa-c4d7f059b400/public
draft: false
tags:
  - android
  - samsung
  - s7
  - twrp
  - pokemon
  - joystick
  - gps
  - pixle
  - magisk
  - odin
categories:
  - Android
---

今天把一台古老的 Samsung Galaxy S7 從 Android 6M 刷上 Android 11R，使用 Pixle Experience ROM，並安裝 Magisk 和 GPS JoyStick 來玩 Pokemon Go。過程不難，一步步做就不會出錯，從 Andoird 6 升到 11 也沒有早成手機有明顯卡頓，佩服作者。

<!--more-->

這次的動機主要是 Pokemon Go 最近開始不支援 Android 6 以下的裝置遊玩，只好升級原本的裝置。

## 步驟概覽

1. 刷入 TWRP
2. 刷入 Pixle Experience
3. 安裝 Magisk
4. 安裝 SmaliPatcher
5. 安裝 SafetyNet Fix
6. 安裝並設定 GPS JoyStick
7. 玩

手機應該不一定要是 S7 也可以照著這些思路完成。

## 手機事前準備

開啟 USB 偵錯和 OEM 解鎖。

看完本文，並可以先把會用到的東西都下載下來。

## 刷入 TWRP

1. 進入 Download Mode
2. 用 Odin 寫入 TWRP Recovery
3. 進入 TWRP

下載最新的 Odin 版本 (目前是 3.13.1)，[Odin 官網](https://odindownload.com/)

下載 [TWRP for Samsung Galaxy S7](https://twrp.me/samsung/samsunggalaxys7.html) (目前是 3.6.2)。

將手機連上電腦，並關機後進入 Download Mode (POWER + VOL DOWN + HOME)。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/4d367c79-5c09-4118-6b49-f09f918b8600/public)

開啟 Odin 並點 AP 選擇刷入 TWRP 檔案，關閉 Auto Reboot 後 Start，應該只要幾秒就會完成。

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/dacd3ce6-e43e-490d-0a1f-4f6b430e7800/public)

強制關機 (POWER + VOL DOWN + HOME) 螢幕黑掉後馬上把音量鍵下換成音量鍵上 (POWER + VOL UP + HOME) 進入 Recovery Mode，如果到目前為止都成功的話應該就會看到 TWRP 的介面。

## 刷入 Pixle Experience ROM

下載 [Galaxy S7 Pixle Experience](https://download.pixelexperience.org/herolte)，目前最新版本是 (20210923-1530)。

進入 TWRP 先 Wipe 四個分區：

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/eed93d6e-153c-43d5-eac0-7eceeee50b00/public)

如果 Wipe 失敗且是因為沒辦法 mount data，可以參考[這篇文章](https://forum.xda-developers.com/t/how-to-fix-unable-to-mount-data-internal-storage-0mb-in-twrp-permanently.3830897/)。

接下來可以選擇先將 ROM 放入 SD 卡，或是直接用 adb 命令刷 (電腦當然要裝好 adb，最快的方法還是用 Chocolatey)，我自己是直接用 adb 的命令刷。在 TWRP 主畫面選 Advanced，然後使用 ADB Sideload。

開啟電腦 Terminal，cd 到放剛剛下載的 ROM 的目錄，並輸入以下命令 (檔名記得替換自己的)：

```sh
adb sideload .\PixelExperience_herolte-11.0-20210923-1530-OFFICIAL.zip
```

這個會是全部耗費最久的步驟，要有耐心地等久一點。

完成後 Reboot 沒問題的話，等一兩分鐘 (官方好像是說 15 分鐘內，但我沒遇到那麼久) 應該就可以進入到系統。進入到系統後可以先做一些手機的初始化，確定手機使用上沒甚麼大問題後，可以先到 Google Play 下載 Pokemon Go 再繼續。

## 安裝 Magisk

[Magisk](https://magiskmanager.com/) 是所有 Root 玩家應該都會用到的好東西，應該也是下載最新版就可以(目前是 25.1)。下載後要將副檔名改成 zip。可以用手機直接下載，或是用電腦下載後用 adb 命令 push 到手機中，我還是選擇用 adb，指令如下。：

```sh
adb push magisk.zip /sdcard/Download
```

關機後再次進入 TWRP，這次選擇 Install，並安裝剛剛 push 到手機中的 Magisk.zip。安裝後重開機，再開啟 Magisk App 完成安裝。

安裝完成 Magisk 後，進入 Magisk 右上角的設定，選擇隱藏 Magisk，取一個自己喜歡的名字，避免被 Pokemon Go 偵測到 Magisk 的存在。

最後開啟兩個選項：Zygisk、強制黑名單，開啟這兩個選項後，需要再次重開機，並在**設定黑名單選項**中把 Pokemon Go (Pokemon Go App 好像有兩個 Package name 記得都要勾) 選擇起來。

## 安裝 SmaliPatcher 和 SafetyNet Fix

SmaliPatcher 是為了讓 Pokemon Go 偵測不到手機是用模擬的位置，SafetyNet 好像是讓 Pokemon Go 偵測不到有 Root (這我不是很確定，我只知道不裝進不了遊戲)

繼續將手機連機到電腦，用點腦下載 [SamliPatcher](https://forum.xda-developers.com/t/module-smali-patcher-7-4.3680053/)(目前最新是 0.0.7.4)，解壓縮後是個執行檔，用系統管理員的身分執行，並勾如圖的選項 (我是勾了這三個，但聽說好像只勾第一個也可以)：

![img](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/5678afd4-b35f-4d1b-94ec-f12496862700/public)

確定手機連接到電腦後按下 ADD PATCH，這會需要跑一陣子，也需要有點內心的等候，完成會在執行檔的目錄拿到一個檔名類似 SmaliPatcherModule 的壓縮檔，一樣可以用剛剛的 adb 命令 push 到手機中，最後用 Magisk 安裝這個模組後重開機即可。

> SmaliPatcher 截至目前是不支援 Android 12 的，我因為這個坑卡了整個下午，Pokemon Go 都會偵測到模擬位置

最後一個要安裝的東西，[SafetyNet Fix](https://github.com/kdrag0n/safetynet-fix/releases) (目前版本是 2.3.1)，可用剛剛的方式在電腦下載 zip 後 push 到手機，或是直接在手機下載，然後還是用 Magisk 安裝模組重開機即可。

## 設定 GPS JoyStick

不要從 Google Play 下載 GPS JoyStick，到他的[官網](http://gpsjoystick.theappninjas.com/)下載 Unlock Version (最新版本是 4.3.2)。

開啟 GPS JoyStick 會看到一個隱私模式，這也是為了避免被 Pokemon Go 偵測到這個 App 的存在，所以也是自己開心取個名字重新安裝。

到設定中關閉 `啟用間接模擬`，這選項預設是開啟的，一定要把它關閉。然後到開發人員選項中把模擬位置的選項設定成自己的 JoyStick 名字。

## 開啟 Pokemon Go

無須設定，大功告成

## Reference

- [Galaxy S7 Pixle Experience](https://download.pixelexperience.org/herolte)
- [Odin](https://odindownload.com/)
- [TWRP for Samsung Galaxy S7](https://twrp.me/samsung/samsunggalaxys7.html)
- [Magisk](https://magiskmanager.com/)
- [SamliPatcher](https://forum.xda-developers.com/t/module-smali-patcher-7-4.3680053/)
- [GPS JoyStick](http://gpsjoystick.theappninjas.com/)
