---
layout: post
title: デフォルト値の辞書
date: 2020-11-16 09:10:07 +0900
tags: python
---

`[ ]`でアクセスした際に、キーが登録されていなかった場合、デフォルトの値を返してくれる辞書。
初期化時に、デフォルトの値を作るための`callable`を渡す。
`list`, `int`などの既存の型も`callable`として渡せることに注意。

````python
>>> s = [('yellow', 1), ('blue', 2), ('yellow', 3), ('blue', 4), ('red', 1)]
>>> d = defaultdict(list)
>>> for k, v in s:
...     d[k].append(v)
...
>>> list(d.items())
[('blue', [2, 4]), ('red', [1]), ('yellow', [1, 3])]
````
