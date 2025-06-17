---
layout: post
title: WireGuardをWidnowsで使う
date: 2025-06-17 17:12:30 +0900
tags: it
---

Windows で WireGuard を使う方法をメモしておく。

## インストール

[link](https://www.wireguard.com/install/) からダウンロード

## 設定

インストールすると、勝手に起動する。すごいシンプルな UI。

トンネルを追加 → 空のトンネルを追加を選択。すると、鍵ペアを自動で作ってくれている。あとは、[この記事](https://www.hotoku.info/blog/blog/2023/11/24/use-wireguard-cli.html)と同様に設定ファイルを作って適当な名前を付けて保存。その後、有効化を押すと、VPN に接続できる。

意外とあっけなかった。
