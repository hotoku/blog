---
layout: post
title: 特定のパッケージをrequireしているパッケージを一覧する
date: 2020-10-27 16:30:00 +0900
tags: emacs
---

特定のパッケージををロードしているパッケージを一覧する方法。
例えば`cl`パッケージをロードしているパッケージを見るには

```
(require 'loadhist)
(file-dependents (feature-file 'cl))
```

とする。
