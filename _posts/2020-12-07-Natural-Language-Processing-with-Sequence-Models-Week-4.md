---
layout: post
title: Natural Language Processing with Sequence Models Week 4
date: 2020-12-07 18:58:37 +0900
tags: coursera
---

## triplet loss

文章$$X$$と$$Y$$は同じ意味か？を判断するようなモデルを学習する際に使われる損失関数。

一つの観察として、3つの文章を用意する

- Anchor $$A$$. 任意の文章
- Positive $$P$$. $$A$$と同じ意味だが別の表現の文章
- Negative $$N$$. $$A$$と別の意味の文章

例えば

- $$A$$: How old is he ?
- $$P$$: What is his age ?
- $$N$$: I'm 10 years old

など。

まず、類似度を計算する関数$$s(A, X)$$を用意し、$$s(A, N) - s(A, P)$$という量を考える。
($$s(A, X)$$が1つのネットワークで実装されている)

これは、$$s(A, N)$$が小さく、$$s(A, P)$$が大きいほど小さくなる。したがって、この量が小さくなるように学習すれば良い。
ただし、$$s(A, N)$$はいくらでも小さくし得るが、そうすることに意味はないので、

$$
\max\{s(A, N)-s(A,P), 0\}
$$

損失関数とする。さらに、$$s(A, P)$$と$$s(A, N)$$が0でなく有限の量だけ異なるように

$$
\max\{s(A, N)-s(A,P)+\alpha, 0\}
$$

を使うことが多い。

さらに、学習を早めるために、

$$
\max\{\mathrm{mean negative}-s(A,P), 0\} \\
\max\{\mathrm{closest negative}-s(A,P), 0\} \\
$$

といった量を使うこともある。

- mean negative: バッチの中のnegativeのスコアの平均
- closest negative: バッチの中のnegativeで一番高いスコア

コースでは、この2つの値の和を損失として使う。

## データセット
[Quora question answer dataset](https://www.kaggle.com/c/quora-question-pairs)
