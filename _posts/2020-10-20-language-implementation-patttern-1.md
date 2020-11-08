---
layout: post
title: 言語実装パターン 1
date: 2020-10-20 20:00:43 +0900
tags: 言語実装パターン
---

## 左再帰性
```
S -> T S
T -> S
...
```
こんな文法があったとする。これをLLでパースしようとすると、
```
S
-> T S
-> S S
-> T S S ...
```
と無限ループに陥る。このように、ある非終端記号をの導出した先の左端に同じ記号が出る時、その文法を左再帰的という。
LLでパースできるためには、左再帰的ではいけない。

## left factoring
```
A -> qB | qC
```
のようなルールがあると、qを見ただけでは次の構文候補を決定できない（Bに行けば良いかCに行けば良いか分からない）。
このような時は、
```
A -> qD
D -> B | C
```
のように書き換える。

## LL(k)パーサー

任意の言語が与えられたとき、それを受理するLL(k)パーサーが存在するかどうかは決定不可能、らしい。マジか。


#### 参考：
- [Wikipedia][wiki]
- [StackOverflow][so]


[wiki]: https://en.m.wikipedia.org/wiki/LL_parser
[so]: https://stackoverflow.com/questions/15194142/difference-between-left-factoring-and-left-recursion
