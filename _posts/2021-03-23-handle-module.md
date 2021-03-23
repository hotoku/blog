---
layout: post
title: モジュールをいじる
date: 2021-03-23 22:12:33 +0900
tags: python
---

- `pkgutil.iter_modules(モジュールのパス)`: とすると、モジュールの中の要素を列挙できる
- `importlib.import_module(文字列)`: とすると、ダイナミックにモジュールをロードできる 
