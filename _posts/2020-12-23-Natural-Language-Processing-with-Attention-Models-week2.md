---
layout: post
title: Natural Language Processing with Attention Models week 2
date: 2020-12-23 09:40:49 +0900
tags: coursera
---

## Transformers vs RNNs

- RNNでは、本当に長い列の場合、LSTMやGRUでもgradient vanishingは起きる
- RNNは、並列化に向かない
- Transformerでは、multi head attentionを使って、列全体を一気に処理
- Transformerでは、文章中の位置の情報が失われるので、それは別途コード化する

## Transformer Applications

- GPT2, BERT, T5はTransformerの応用
- T5は、複数のタスク（翻訳、要約、質問応答など）を**同一のモデルで**こなす。すごい

## Dot-Product Attention

- attentionはdot-productだと言っている
- それは分かってるんだが・・

## Causal Attention

Attentionの3タイプ

- encoder/decoder
- Causal
- bidirectional

Causalは、1つの文章の中で、一つの単語とそれより前の単語の関連度合いを考慮するもの。
Bidirectionalは、1つの文章の中で、1つの単語とそれ以外のすべての単語の関連度合いを考慮するもの。
