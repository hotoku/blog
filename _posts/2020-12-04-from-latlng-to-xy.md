---
layout: post
title: 緯度経度を平面直角座標系に変換する
date: 2020-12-04 13:40:11 +0900
tags: geo
---

```python
import pyproj
epsg_from, epsg_to = 4326, 6677
tr = pyproj.Transformer.from_proj(epsg_from, epsg_to)

lat, lng = 35, 139
tr.transform(lat, lng)
# => (-110621.37332562111, -76066.79268837719)
```
