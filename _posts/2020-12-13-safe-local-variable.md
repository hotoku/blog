---
layout: post
title: ファイルローカルな変数の安全性
date: 2020-12-13 14:47:02 +0900
tags: emacs
---

file local variableを設定してあると、開くたびに、Emacsがファイルローカルの値を適用して良いか？と確認してきて面倒い。

変数の`safe-local-variable`というプロパティに、値を受け取り、その値でファイルローカルな値を設定されても大丈夫か？を
計算する関数を設定しておけば、この確認をスキップできる。

```elisp
(put 'yh/indent-before-save 'safe-local-variable (lambda (x) t))
```

たとえば、上のように問答無用で`t`を返すような関数を設定すると、どんな値がファイルローカルとして設定されていようとも、
確認はスキップされる。
