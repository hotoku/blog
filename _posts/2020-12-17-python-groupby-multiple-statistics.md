---
layout: post
title: groupbyで複数の統計量
date: 2020-12-17 11:24:05 +0900
tags: python pandas
---

```python
import pandas as pd
sample = pd.DataFrame(dict(
    x = [1,1,1],
    y = [1,2,3],
    z = [4,5,6]
))

sample.groupby(["x"]).agg({
    "y": ["mean", "sum", "max", "min", "median"],
    "z": ["mean", "sum", "max", "min", "median"]
})
```

[参考](https://www.shanelynn.ie/summarising-aggregation-and-grouping-data-in-python-pandas/#summarising-the-dataframe)
