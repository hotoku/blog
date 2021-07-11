---
layout: post
title: pyrightとpyenvの設定
date: 2021-07-11 14:18:16 +0900
tags: python emacs
---


lsp-pyrgihtを使ってpyrgihtを起動している。このpyrightが、poetryやpyenv-virtualenvで分離された環境のライブラリを読めるようにしたい。

`lsp-pyright-venv-path`という変数があるので、これに、virtualenvへのpathを設定すれば良い。
例えば`~/.pyenv/versions/myversion`など。この値は、

- `pyenv prefix`
- `poetry env list --full-path`

などで知ることができる。

毎回、手で設定するわけにもいかないので

```
((python-mode . ((lsp-pyright-venv-path . "/Users/hotoku/.pyenv/versions/myversion"))))
```

という内容の.dir-locals.elをプロジェクトルートに置いておく。
