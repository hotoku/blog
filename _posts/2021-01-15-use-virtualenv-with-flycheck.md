---
layout: post
title: flycheckでvirtualenvを使う
date: 2021-01-15 13:43:13 +0900
tags: python emacs
---

以下を`.dir-locals.el`として保存する

```elisp
((python-mode
  (flycheck-python-flake8-executable . "/Users/hotoku/project/yclinic/batch/venv/bin/python")
  (flycheck-python-pylint-executable . "/Users/hotoku/project/yclinic/batch/venv/bin/python")))
```
