---
layout: post
title: Week number
date: 2020-12-08 11:01:05 +0900
tags: python
---

## 日付 -> 週番号
`datetime.datetime.isocalendar`で、年、週番号、週の中の何番目か(=曜日)のタプルを取得できる。

```python
from datetime import datetime
d = datetime(2020,12,1)
d.isocalendar()[1]
# => (2020, 49, 2)
```


## 週番号 -> 日付
`strptime`のフォーマットに週番号を指定すればOK

```python
from datetime import datetime
datetime.strptime("2020-48-2", "%Y-%W-%w").date()
# => datetime.date(2020, 12, 1)
```

`isocalendar`の返す週番号と`strptime`に渡すべき週番号は1ずれているので注意。ガッデム
