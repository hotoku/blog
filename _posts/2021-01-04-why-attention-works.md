---
layout: post
title: Attentionがなんで有効なのか
date: 2021-01-04 15:43:52 +0900
tags: math
---

CourseraのNLPのspecializationの中でattentionを学んだのだが、なんで、このネットワークで精度が上がるのかがよく分からん・・と思っていたんだが、
[もともとの論文](https://arxiv.org/abs/1409.0473)を読んでみたら、

> The most important distinguishing feature of this approach from the basic encoder–decoder is that it does not attempt to encode
> a whole input sentence into a single fixed-length vector. Instead, it encodes the input sentence into a sequence of vectors
> and chooses a subset of these vectors adaptively while decoding the translation.
> This frees a neural translation model from having to squash all the information of a source sentence,
> regardless of its length, into a fixed-length vector. We show this allows a model to cope better with long sentences.

と書いてあって腑に落ちた。プリミティブなencoder-decoderでは、文全体の意味が決まった長さ（次元）のベクトルに詰め込まれなければならない。
一方で、Attentionを使えば、入力文の意味は、単語数だけのベクトルを使って表現できる。
そして、その大量に増えた入力の中から、各ステップにおいて最も注目すべき場所を自動的に選ぶことができる。

プリミティブな形では、1つの内部状態は「文章全体の意味」を表現しなければならなかったが、Attentionを使うと、「1つの単語の意味」と「いつ使われるべきか？」
という情報だけを表現すれば良いことになる。
