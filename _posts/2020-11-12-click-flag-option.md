---
layout: post
title: clickでフラグオプション
date: 2020-11-12 10:10:28 +0900
tags: python click
---

clickで`True`/`False`のフラグオプションを作るには、
```
@click.option("--flag/--no-flag", default=False)
```
のような感じにする。
