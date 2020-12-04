---
layout: post
title: コマンドでターミナルに通知させる
date: 2020-11-19 18:03:15 +0900
tags: mac bash
---

時間のかかる処理を行っている間、他のことをやりたい。が、終わったらすぐに気が付きたい、という気持ちになることは、帰宅間際に何か長い処理をする必要が出たときなどに思うことである。

## 音声を出す

```bash
say "hello"
```

## 通知を出す

```bash
echo ^G
```

`^G`は、`Ctrl-v` `Ctrl-g`で入力できる