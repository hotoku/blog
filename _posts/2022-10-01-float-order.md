---
layout: post
title: 浮動小数点の演算
date: 2022-10-01 10:43:47 +0900
tags: python
---

``` python
one = float(1)
eps = float(1)

while one + eps != one:
    eps /= 2

print(
    (one + eps) + eps == one + (eps + eps)
)
```
`False`になる
