---
layout: post
title: リスト内包表記のネスト
date: 2021-01-16 11:25:05 +0900
tags: python
---

```python
import numpy as np
vss = np.arange(10).reshape((-1,2))
[v for vs in vss for v in vs]
# => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

外側のループから先に書く。
