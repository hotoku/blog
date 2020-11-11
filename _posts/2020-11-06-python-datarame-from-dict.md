---
layout: post
title: 辞書からデータフレームに
date: 2020-11-06 16:47:03 +0900
categories: python
---

数値的な関数の挙動を確認するときに、各引数ごとに代表点を決めて、それら代表点の全ての組み合わせでの値を計算し
グラフを眺める、などすることは多いと思う。
そのような時に、辞書からデータフレームに変換できると便利だが、そのために`pandas.DataFrame.from_dict`という関数が
使えそうなのでメモ。

```python
def f(x, y):
    x**2 + y**2

xs = np.linspace(0, 10, 5)
ys = np.linspace(0, 10, 5)
_dic = {}
for x, y in product(xs, ys):
    _dic[(x,y)] = dict(val=f(x,y))
df = pd.DataFrame.from_dict(_dic, orient="index")
df.index.names = ["x", "y"]
df
```
