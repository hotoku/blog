---
layout: post
title: groupbyで複数の統計量
date: 2020-12-17 11:24:05 +0900
tags: python pandas
---

```
data.groupby(
   ['month', 'item']
).agg(
    {
         'duration':sum,    # Sum duration per group
         'network_type': "count",  # get the count of networks
         'date': 'first'  # get the first date per group
    }
)
```

[参考](https://www.shanelynn.ie/summarising-aggregation-and-grouping-data-in-python-pandas/#summarising-the-dataframe)
