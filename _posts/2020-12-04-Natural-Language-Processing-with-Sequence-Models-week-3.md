---
layout: post
title: Natural Language Processing with Sequence Models week 3
date: 2020-12-04 09:18:42 +0900
tags: coursera
---

## Gradient Descentについて

[このポスト](https://blog.paperspace.com/intro-to-optimization-in-deep-learning-gradient-descent/)
が詳しい。

ロス関数の可視化。[Filter normalization](https://www.cs.umd.edu/~tomg/projects/landscapes/)という
手法があり、ネットワークのアーキテクチャがロス関数の形状に与える影響を見れる。
skip-connectionを導入したり、各層をwideにすることで、ロスがなめらかで凸に近くなる、らしい。

色んなモデルのロス関数を可視化したページ: [https://losslandscape.com/](https://losslandscape.com/)

- global minimaにこだわる必要はない。「良い」local minimaがたくさんあることが知られている
- stochastic gradient descentは、saddle pointを回避する効果もある（サンプルによって、lossの形状が変わるから）
- learning rateのスケジュールにも色々ある
  - 一定回数lossが改善しなくなったらlrを小さくする。lossが十分小さくなったら止める
  - lrを小さくしたり大きくしたりするのを繰り返す
  - Stochastic Weight Averaging: ランダムな初期値からの学習を数回繰り返し、予測として、それらの平均を使う

## LSTM

RNNで時間方向のbackpropagationで勾配が消失することを避けるために使う。

{% include figure.html url="/assets/img/lstm.png" description="LSTMのイメージ © Coursera" %}

- c: cell memory
- h: hidden state
- x: 入力
- 左のシグモイド: forget gate。状態と入力から忘れるべき場所を計算
- 真ん中のシグモイドとtanh: input gate。tanhで、今回の情報を計算。シグモイドで、更新の対象を計算。
- 右のtanhとシグモイド: output gate。メモリーから次の状態を計算。

[LSTMの解説](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)
