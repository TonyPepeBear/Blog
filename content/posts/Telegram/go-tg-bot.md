---
title: "用 Go 寫 Telegram Bot"
description: Telegram Bot 沒有任何使用限制，可以寫出許多屬於自己的幫手。本篇簡單的用 Go 寫一個鸚鵡機器人，用戶說什麼，機器人就回什麼。
date: 2021-12-11T14:30:15Z
image: https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/f8c04956-a2ef-4cba-b9fe-2a5ceff40b00/public
hidden: false
draft: false
tags:
  - go
  - golang
  - telegram
  - bot
  - telegram-bot
categories:
  - Telegram
---

Telegram Bot 沒有任何使用限制，可以寫出許多屬於自己的幫手。本篇簡單的用 Go 寫一個鸚鵡機器人，用戶說什麼，機器人就回什麼。

<!--more-->

## 新增自己的 Bot

![image](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/fbf36cb0-84f4-4f7a-2553-04ecccf44800/public)

Telegram 非常有趣，要新增自己的 Bot，只要跟 Telegram 上的 [BotFather](https://telegram.me/BotFather) `說一下`，他就會給你一個 Bot。

![image](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/9200bc38-828c-4ad4-a022-d34c3a692d00/public)

按 BotFather 給你的步驟做，最後可以看到他會提供一個 API Token 給你，只要有這個 Token 就可以跟 Bot 溝通，要保存好，等等會用到，也不要給別人看到，以免自己的 Bot 變成別人的玩具。

## go-telegram-bot-api

Go 已經有社區開發的函式庫可以用 [telegram-bot-api](https://github.com/go-telegram-bot-api/telegram-bot-api)。

```shell
go get -u github.com/go-telegram-bot-api/telegram-bot-api/v5

```

之後只要 import 就可以使用：

```go
import (
    tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)
```

## 連線到 Telegram Bot

利用剛剛 import 的函式庫，只需要剛剛創建好的 Bot 的 API Token 就可以連線到 Telegram。

```go
bot, err := tgbotapi.NewBotAPI(os.Getenv("TELEGRAM_API_TOKEN"))
if err != nil {
    panic(err)
}
```

上面用環境變數的方式來取得 TOKEN，避免需要直接寫在程式碼裡，如果覺得在測試時設定環境變數很麻煩，可以用 JetBrains 的 [GoLand](https://www.jetbrains.com/go/)，設定 Runtime 的環境變數：

![image](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/9af5d8a5-3504-479d-ab04-f8b0adf93500/public)

## 處理 Update

要接收使用者傳過來的訊息，Telegram API 稱為 Update，我們使用的函示庫基本上都自動處理好了，只需要接收一個 Channel 就好。使用 `bot.GetUpdatesChan(config)` 會需要給一個 Config，這可以用 `tgbotapi.NewUpdate(0)` 來生，然後這邊設定 Timeout 為 60，如果對這個設定值有興趣，可以去看 Telegram 的文件。

```go
updateConfig := tgbotapi.NewUpdate(0)
updateConfig.Timeout = 60
updates := bot.GetUpdatesChan(updateConfig)
```

## 回復

我們先簡單寫一隻鸚鵡，把用戶傳過來的 Text，直接傳回去。

![image](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/19bbc73e-3090-4a0d-0eec-d65671c01900/public)

用 for 把 Channel 中的 Update 一個一個拿出來，然後用 `tgbotapi` 產生一個 Message 物件，裡面放在聊天室的 ID 和要回傳的 Text，最後用 bot 把 Message 傳回去。

```go
for update := range updates {
    text := update.Message.Text
    chatID := update.Message.Chat.ID
    replyMsg := tgbotapi.NewMessage(chatID, text)
    _, _ = bot.Send(replyMsg)
}
```

## 簡單鸚鵡的完整程式碼

```go
package main

import (
    tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
    "os"
)

func main() {
    bot, err := tgbotapi.NewBotAPI(os.Getenv("TELEGRAM_API_TOKEN"))
    if err != nil {
        panic(err)
    }
    bot.Debug = true
    updateConfig := tgbotapi.NewUpdate(0)
    updateConfig.Timeout = 60
    updates := bot.GetUpdatesChan(updateConfig)
    for update := range updates {
        text := update.Message.Text
        chatID := update.Message.Chat.ID
        replyMsg := tgbotapi.NewMessage(chatID, text)
        _, _ = bot.Send(replyMsg)
    }
}
```

## 改寫成非阻塞的 Goroutine

因為每次處理和回復都會需要一點時間，甚至是要去 DB 找資料，如果用上面的寫法，在處理多人或高速傳訊息的時候會被卡住，一次只能處理的一個訊息。還好 Go 的併發寫法非常簡單，只要放一個 go 在前面，就可以非阻塞的執行 function 中的內容。

我們先把 `handleUpdate` 提取成一個 function，然後再用 go 去執行他：

```go
func main() {
    bot, err := tgbotapi.NewBotAPI(os.Getenv("TELEGRAM_API_TOKEN"))
    if err != nil {
        panic(err)
    }
    bot.Debug = true
    updateConfig := tgbotapi.NewUpdate(0)
    updateConfig.Timeout = 60
    updates := bot.GetUpdatesChan(updateConfig)
    for update := range updates {
        go handleUpdate(bot, update)
    }
}

func handleUpdate(bot *tgbotapi.BotAPI, update tgbotapi.Update) {
    text := update.Message.Text
    chatID := update.Message.Chat.ID
    replyMsg := tgbotapi.NewMessage(chatID, text)
    _, _ = bot.Send(replyMsg)
}
```

## 回復特定訊息

要回復 `回復訊息` ，像是下面的效果也很簡單：

![image](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/22010000-e325-45e6-52f9-64eec6b28500/public)

只需要設定 `replyMsg.ReplyToMessageID` 就可以回復特定的訊息，下面就是直接回覆接收到的訊息：

```go
func handleUpdate(bot *tgbotapi.BotAPI, update tgbotapi.Update) {
    text := update.Message.Text
    chatID := update.Message.Chat.ID
    replyMsg := tgbotapi.NewMessage(chatID, text)
    replyMsg.ReplyToMessageID = update.Message.MessageID
    _, _ = bot.Send(replyMsg)
}
```

## 處理 Command

Telegram 中，用 `/` 開頭的文字就是 Command，這個函示庫也有寫好處理 Command 的方法，只需要用 `isCommand()`，確認一下是不是 Command 就可以：

```go
func handleUpdate(bot *tgbotapi.BotAPI, update tgbotapi.Update) {
    text := update.Message.Text
    chatID := update.Message.Chat.ID
    replyMsg := tgbotapi.NewMessage(chatID, text)
    if update.Message.IsCommand() {
        switch update.Message.Command() {
        case "start":
            replyMsg.Text = "Hello " + update.Message.From.FirstName
        case "help":
            replyMsg.Text = "What can I help you?"
        default:
            replyMsg.Text = "No such command!!!"
        }
    }
    _, _ = bot.Send(replyMsg)
}
```

上面的程式碼其實也可以看到如何拿到傳送者的一些基本資料。

![image](https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/0fd54240-5c18-4b75-c7be-981cdb144e00/public)

## Reference

- [Telegram APIs](https://core.telegram.org/)
- [Golang bindings for the Telegram Bot API - GitHub](https://github.com/go-telegram-bot-api/telegram-bot-api)
