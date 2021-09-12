---
title: "A320neo 冷艙到飛行"
date: 2021-07-21T22:08:20+08:00
draft: false
tags: 
    - a320neo
    - airbus
    - msfs
categories:
    - Flight
---

簡單記錄我所認知的 A320 的一些程序。

<!--more-->

> 注意這些都不是標準程序，只是我自己亂理解的，也省去蠻多步驟，基本上就是能起讓飛機動起來，標準程序肯定是更複雜的。

## 啟動飛機前檢查

~~模擬器中跳過還是可以飛~~

1. Engine Master 1 and 2 Switch -> OFF
   * 主引擎 1, 2 都關閉
2. Engine Mode Selector -> NORM
   * 引擎模式在 Normal 位置
3. Weather Radar -> OFF
   * 關閉氣象雷達
4. Landing Gear -> Down
   * 機輪放下
5. Wipers -> Both OFF
   * 兩個雨刷都關閉

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210723215225.png)
![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210723215410.png)

## 啟動飛機

1. Batt 1 and 2 -> ON
2. EXT Power -> ON
   * 啟動外部電源
   * 這時應該可以看到所有儀表亮起
3. APU Fire Test
   * APU 滅火測試
4. APU Master and wait 3 sec -> ON
   * 打開 APU 主開關，並等待 3 秒
5. APU START -> ON
   * 發動 APU
6. Wait for APU START -> Green "AVAIL"
   * 等 APU 發動完成
7. APU BLEED -> ON
   * 開啟 APU 供給氣壓
8. EXT Power -> OFF
   * 移除外部電源

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210723230551.png)

## Overhead Panel 上方儀表

基本上，由左至右，由下而上的檢查

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210723223858.png)

### 左邊那排

1. CREW SUPPLY -> ON
   * 打開組員氧氣供給
2. ADIRS 1, 2, 3 -> NAV
   * 開啟三個慣性導航，需等待 6-7 分鐘校準

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210723223442.png)
![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210723223529.png)

### 中間那排

1. NAV & LOGO Light -> ON
2. OVHD INTEG LT -> AS REQ.
3. DOME LT -> AS REQ.
4. ANN LT TEST
5. EMER EXIT LT -> ARM
6. SEAT BELTS -> ON
7. NO SMOKING -> ON
8. ALL PUMP -> ON
9. ENG 1 FIRE TEST
10. ENG 2 FIRE TEST

![img](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210724001302.png)
![20210724001418](https://cdn.jsdelivr.net/gh/TonyPepeBear/ImageBed@main/20210724001418.png)

### 右邊那排

基本上不用動

## MCDU 飛行電腦

在等待導航校準時，來設定飛行電腦。設定飛行電腦有一個口訣：

> D > I > F > S > R > I > P > P

* DATA
* INIT A
* F-PLN
* SEC PLAN
* RAD NAV
* INIT B
* PREF
* PROG

## TODO

## Reference

* [教官我想飛](https://www.youtube.com/channel/UCDKKDx4mNVI7vONL1vqTx7g)
* [機師阿楷](https://www.youtube.com/channel/UCOHc8xzWD25Nn-snDBJUMGQ)
* [a320-normal-procedures.pdf](https://www.theairlinepilots.com/forumarchive/a320/a320-normal-procedures.pdf)
