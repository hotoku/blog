---
layout: post
title: jekyllのテーマをカスタマイズする
date: 2020-10-02 09:32:21 +0900
tags: jekyll
---

[参考](https://jekyllrb.com/docs/themes/)

- gem based themeは、`_layouts`などをgemとして持っている。これにより、bundleを通じて更新などの管理ができる
- themeの一部を更新したい時には、対象のファイルをローカルにコピーして編集する
  - `bundle info --path <パッケージ名>`でファイルのパスが分かる
