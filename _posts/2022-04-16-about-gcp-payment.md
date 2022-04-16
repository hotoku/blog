---
layout: post
title: GCPの支払い方法まとめ
date: 2022-04-16 15:39:52 +0900
tags: gcp
---

GCPの支払い方法に関するドキュメントを読んだときのメモ。

[link](https://cloud.google.com/billing/docs/how-to/payment-methods?hl=ja)

- Cloud請求先アカウント→支払い者のアカウント
  - お支払いプロファイルに紐付けられる
  - [お支払いプロファイル](https://support.google.com/paymentscenter/topic/9017382?hl=ja) = 支払い方法が登録される場所
    - お支払いプロファイルとお支払いセンターは、同じ意味で使われてそうな気がする
  - お支払いセンターは、GCPではなく、Googleレベルのリソース
  - なので、この辺のアカウントの権限は、GCPのアクセス権限とは別になる
