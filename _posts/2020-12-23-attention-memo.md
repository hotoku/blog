---
layout: post
title: attentionの解説記事を読む
date: 2020-12-23 15:44:12 +0900
tags: math ml
---

[これ](http://akosiorek.github.io/ml/2017/10/14/visual-attention.html)を読んだ時のメモ

## Attentionとは

- $$x \in R^d$$: 入力
- $$a \in [0, 1]^k$$: アテンション
- $$g \in R^k$$: attention glimpse
- $$z \in R^k$$: feature

として、

$$
a = f_{\phi}(x) \\
g = a \odot z
$$

という処理を行うメカニズムである。

ただし、$$f_{\phi}$$は、パラメータ$$\phi$$を持ったネットワークで、$$z$$は別のパラメータ$$\theta$$を持ったネットワークの出力：$$z=f_{\theta}(x)$$とする。

### アテンションで効率が良くなるのか？

NNは、線形変換 → 要素ごとの非線形変換 の繰り返し。例えば、入力の複数の要素の掛け算を学習しようとしたら、足し算を必要な回数繰り返す、という構造が実現されるはず。
これは非常に効率が悪いと考えられ、アテンションが掛け算の演算を導入することが効率化のキーと考えられる。

※ なるほど。というか、入力の掛け算的なアウトプットが必要な関数を、NNはどうやって近似するんだろうか・・？