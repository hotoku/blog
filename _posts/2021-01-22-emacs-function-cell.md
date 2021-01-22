---
layout: post
title: function cell
date: 2021-01-22 15:19:02 +0900
tags: emacs
---

Emacsのシンボルは、通常の値を保持する場所とは別に、`function cell`という場所を持っている。
そして、リストを評価する際に、「先頭がシンボルならfunction cellを確認し、中身を関数として実行する」という動作をする。

`function-cell`に値を入れるには`fset`を使う。
値を取得するには、`symbol-function`を使う。

```lisp
(fset 'hotoku '(lambda () (message "hotoku")))
;; => (lambda nil (message "hotoku"))
(hotoku)
;; => "hotoku"
(symbol-function 'hotoku)
;; => (lambda nil (message "hotoku"))
```

`fset`は、値が関数かどうかは確認しないので、どんな値でも入れようと思えば入れられる。
