---
layout: post
title: FacetGridのxlim
date: 2020-12-17 17:43:39 +0900
tags: python seaborn
---

```python
x = pd.DataFrame({
    "x": [a**2 for a in range(100)]
})
sns.displot(data=x, kind="ecdf", x="x")
```


{% include figure.html url="/assets/img/noxlim.png" description="xlimなし" %}

```python
x = pd.DataFrame({
    "x": [a**2 for a in range(100)]
})
_g = sns.displot(data=x, kind="ecdf", x="x")
_g.set(xlim=(-1, 100), ylim=(0, 0.2))
```

{% include figure.html url="/assets/img/xlim.png" description="xlimあり" %}
