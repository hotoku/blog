---
layout: post
title: ネストしたリスト内包表記
date: 2020-11-16 10:39:04 +0900
tags: python
---

Pythonのリスト内包表記はネストできるということを最近、知ったのでメモ

### 2重の例

```python.
>>> import numpy as np
>>> x = np.arange(6).reshape((2,3))
>>> x
array([[0, 1, 2],
       [3, 4, 5]])
>>> [l for l in x]
[array([0, 1, 2]), array([3, 4, 5])]
>>> [elm for lst in x for elm in lst]
[0, 1, 2, 3, 4, 5]
```

### 3重の例

```python
>>> y = np.arange(24).reshape((2,3,4))
>>> y
array([[[ 0,  1,  2,  3],
        [ 4,  5,  6,  7],
        [ 8,  9, 10, 11]],

       [[12, 13, 14, 15],
        [16, 17, 18, 19],
        [20, 21, 22, 23]]])
>>> [elm for ll in y for l in ll for elm in l]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

```

**１番外側から剥がしていく** 感じ
