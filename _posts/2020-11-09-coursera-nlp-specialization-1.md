---
layout: post
title: Coursera NLP Specialization Course 1
date: 2020-11-09 09:36:32 +0900
tags: coursera
---

CourseraのNLP SpecializationのCourse 1 Natural Language Processing with Classification and Vector Spacesのメモ書き

## Week 1

### ライブラリ
#### nltk
natural language tool kit.

- courpus
- stopwords
- stemmer
- tokenizer

など。

#### string
文字列処理のライブラリ

- punctuation

### 前処理のステップ
- Tokenizing the string
- Lowercasing
- Removing stop words and punctuation
- Stemming

#### punctuation
`:)` などの顔文字（emoticonというらしい）などがあるので気をつける。


#### stemming
単語の語幹を抽出する作業。

- happy
- happier
- happiness

みたいな単語のグループを`happi`に帰着させる。`nltk.stem`ライブラリにいくつかのアルゴリズムが実装されているらしい。


### dataset

[Twitter samples](http://www.nltk.org/howto/twitter.html): ツイートデータが1万件くらい

```
import nltk
nltk.download("twitter_samples")
nltk.download("stopwords")
```


## Week 2
2次元データを可視化するときに、散布図だけでなくて、confidence ellipse（正規分布の等高線）を書くのが、データの分布を把握するのに便利。

あとはnaive bayesの普通の話。

数値アルゴリズムをそのままPythonで書くとやっぱり遅いな・・

## Week 3

- `np.linalg.norm`: ノルムを計算する。ベクトルだけではなくて、行列の行ベクトル・列ベクトルのノルムをいっぺんに計算することもできる（`axis`を指定する）
- `np.dot`: `x @ y`でも計算できるらしい
- `np.sum`: 行和・列和も計算できる（`axis`を指定する）。 `np.mean`も同様


## week4

### dataset

- [English embeddings from Google code archive word2vec look for `GoogleNews-vectors-negative300.bin.gz`](https://code.google.com/archive/p/word2vec/)
- [the French embeddings from `cross_lingual_text_classification`](https://github.com/vjstark/crosslingual_text_classification)


### Locality Sencitivity Hash

k-NNを近似するのに使う方法。$$\mathbb{R}^n$$上のベクトル$$v$$を長さ$$N$$のビット列$$f(v) \in \{0,1\}^N$$に対応させる。
この時、$$f(v)=f(w)$$ならが$$v, w$$が$$\mathbb{R}^n$$上で近くにあるようにする。

これを使って、ベクトルの集合$$V$$から与えられたベクトル$$v$$に最も近い$$k$$個のベクトルを探す時に、ハッシュ値が等しいものだけに候補を制限することで計算を省くという近似アルゴリズムができる。

仕組みは単純で、まず、$$N$$ 個の平面をランダムに選んで固定する。
与えられたベクトルが各平面の **上** か **下** かを指示する1 or 0のフラグが$$N$$個得られるので、それをハッシュ値とする。

実際には、$$N$$個の平面の組を複数用意し、各組に対して上のハッシュ値を計算し、与えられたベクトルといずれかのハッシュ値が等しいベクトルを候補とすることで探索範囲を広げる。
