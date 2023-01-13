---
layout: post
title: clickで引数の型をカスタマイズする
date: 2023-01-06 08:51:45 +0900
categories: blog
tags: python click
---

[公式](https://click.palletsprojects.com/en/8.1.x/parameters/#implementing-custom-types)

```python
from typing import Any, Optional

import click

class IntList(click.ParamType):
    name = "IntList"

    def convert(
        self, value: Any, param: Optional[click.Parameter], ctx: Optional[click.Context]
    ) -> list[int]:
        if isinstance(value, str):
            ss = value.split(",")
            return list(map(int, ss))
        if isinstance(value, list):
            return value
        if param is None and ctx is None:
            return []
        assert False, "panic. IntList.convert"

@click.command()
@click.argument("ls", type=IntList())
def main(ls):
    print(ls)

main()
```
