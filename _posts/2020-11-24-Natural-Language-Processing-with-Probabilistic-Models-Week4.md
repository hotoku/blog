---
layout: post
title: Natural Language Processing with Probabilistic Models Week 4
date: 2020-11-24 08:02:15 +0900
tags: coursera
---

## CBOW model

- continuous bag of words model
- 1つの単語の前後n個の単語(context)から、その単語を予測する

### architecture

- vocabulary size: V
- 埋め込みの次元: N

各単語を1-hot encodingし、contextの平均値を入力とする。
1-layerの隠れ層(N次元)を置く。
出力は、ターゲットとなる単語の確率分布を表すsoft max。
各レイヤーの間は、fully connectedで繋げる。

逆に、1つの単語から周囲のcontextを予測するモデルがskip-gram

### embedding vector
入力 → 隠れ層 or 隠れ層 → 出力の計算に使う行列の各行 or 列あるいは、それらの平均を各単語の
埋め込みベクトルとして使う。


## 評価
### intrinsic evaluation
- 言葉の関係が正しいか？(東京, にほん) : (パリ, ?)みたいなやつ。
- 似た単語が似たベクトルになっているか。ベクトルのクラスタリング

### extrinsic evaluation
- 得られたembeddingを他のタスクに応用し、その結果をもって評価すること
