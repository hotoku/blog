---
layout: post
title: C++でソートする時に気をつけること
date: 2020-11-15 23:38:24 +0900
tags: c++
---

独自のクラスの配列や`vector`などを`std::sort`でソートする場合、`bool operator<`を定義することになる。
このオペレータは、`x`と`y`が同順位の場合には、`false`を返さなくてはならない（`<=`ではなくて`<`なので）。

`x<y`と`y<x`の両方が真となり得るような実装だと、異常終了する場合があるぽい。

同順位だから別にどっちでも良いやろ、と適当な考えでいたら、
[ABC183 D](https://atcoder.jp/contests/abc183/submissions/18155680)でこれにはまって悔しい思いをした。
謎のRun Time Errorでコンテスト終了までにデバッグできず・・
