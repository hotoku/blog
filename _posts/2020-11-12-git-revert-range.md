---
layout: post
title: git revertで範囲指定
date: 2020-11-12 10:36:05 +0900
tags: git
---
gitで、複数のコミットを一気にrevertしたい場合のコマンドをメモ。

```
A -> B -> C -> D
```
こんなコミット履歴があって、`B, C`をrevertしたいとする。

```bash
$ git revert B^..D
```
`B`自身ではなく、`B^`(i.e. `B`の最初の親)を指定することに注意。
