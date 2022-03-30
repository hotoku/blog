---
layout: post
title: curious course on coroutines and concurrency 2
date: 2022-03-30 09:02:20 +0900
tags: python
---

[前の投稿](/2022/03/23/curious-course-on-coroutines-and-concurrency.html)で、`yield`によって値を受け渡したり、ジェネレーターの呼び出し元とジェネレーターの中を行き来したりすることができるようになったのを見た。

ただ、ここには一つ制約があって、ジェネレーターが別のジェネレーターを呼び出すときに問題が生じる・・らしい
（todo: が、その問題が何なのか、まだよく分かってないので、分かったら書き直す）。
これを回避するために、トランポリンというテクニックを使う。
