---
layout: post
title: 動的なクラス定義
date: 2021-03-23 22:02:12 +0900
tags: python
---

Pythonで、コードの中でクラスを定義するにはtypeを使えば良い。

```
X = type("X", (), dict(
    x=1
))
X.x  # => 1


Y = type("Y", (X,), dict(
    y=10
))
Y.x  # => 1
Y.y  # => 10

x = X()
y = Y()
```

typeの引数は、

1. クラス名
2. 親クラス
3. クラス変数

という感じ。メンバ変数とかメンバ関数とかを定義するには・・というのは、また今度しらべる。
