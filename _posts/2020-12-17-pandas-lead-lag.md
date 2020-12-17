---
layout: post
title: pandasでlead/lag
date: 2020-12-17 15:52:46 +0900
tags: python pandas
---

sqlの`lead(y) over (partition by x)`相当のことをpandas.DataFrameでやる。
indexをうまく使うのが味噌。

pandasのindexの扱いにはなかなか慣れないなぁ・・

```python
import pandas as pd
x = pd.DataFrame({
    "x": [1,1,1,2,2,2],
    "y": [1,2,3,4,5,6]
})
_x = x.x[:-1]
_y = x.y[:-1]
_x.index = x.index[1:]
_y.index = x.index[1:]
x["lead_x"] = _x
x["lead_y"] = _y
x.loc[x.x != x.lead_x, "lead_y"] = None
del x["lead_x"]
print(x)
# =>    x  y  lead_y
# => 0  1  1     NaN
# => 1  1  2     1.0
# => 2  1  3     2.0
# => 3  2  4     NaN
# => 4  2  5     4.0
# => 5  2  6     5.0
```

あと、indexに重複がある場合にはうまく行かない
