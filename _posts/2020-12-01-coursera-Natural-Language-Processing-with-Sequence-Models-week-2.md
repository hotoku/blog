---
layout: post
title: coursera Natural Language Processing with Sequence Models week 1
date: 2020-12-01 19:37:19 +0900
tags: coursera
---


## GRU

gated recurrent unit

{% include figure.html url="/assets/img/gru.png" description="GRUのイメージ © Coursera" %}

## GRUをtraxで定義する

```
mode = 'train'
vocab_size = 256
model_dimension = 512
n_layers = 2

GRU = tl.Serial(
      tl.ShiftRight(mode=mode), # Do remember to pass the mode parameter if you are using it for interence/test as default is train
      tl.Embedding(vocab_size=vocab_size, d_feature=model_dimension),
      [tl.GRU(n_units=model_dimension) for _ in range(n_layers)], # You can play around n_layers if you want to stack more GRU layers together
      tl.Dense(n_units=vocab_size),
      tl.LogSoftmax()
    )
```

`tl.ShiftRight`がキモい
