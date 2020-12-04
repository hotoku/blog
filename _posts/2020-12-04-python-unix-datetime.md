---
layout: post
title: unix timeとdatetimeの変換
date: 2020-12-04 13:31:08 +0900
tags: python
---


```python
import datetime
datetime.datetime.fromtimestamp(1)
# => datetime.datetime(1970, 1, 1, 9, 0, 1)
datetime.date.fromtimestamp(1)
# => datetime.date(1970, 1, 1)
```
