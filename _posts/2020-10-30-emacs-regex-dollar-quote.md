---
layout: post
title: emacsの正規表現の$と\'
date: 2020-10-30 08:35:53 +0900
tags: emacs
---

emacsでメジャーモードを判定するにはauto-mode-alistというリストに拡張子とメジャーモード関数を登録する。
例えばこんな感じの設定がイディオムであり、新しいパッケージを導入した際には脊髄反射的にinit.elに
書くことになる。

```lisp
(add-to-list 'auto-mode-alist
        '("\\.json\\'" . json-mode))
```

ここで、`"\\.json\\'"`の`"\\'"`は行末にマッチする意図だと思うのだが、普通、行末には`"$"`を使っている。
その違いは何やねん？と思って調べた。

#### 解答

- `"$"`は、改行の前の空文字にマッチする
- "\\'"は、文字列の末尾にマッチする

ということらしい。`auto-mode-alist`に登録するときに`"\\'"`を使うのは、改行文字が入ったケースを考慮して
いるそうな。

[参考1](https://qiita.com/katoken-0215/items/b2745964aa11b39dfe38)
[参考2](https://www.emacswiki.org/emacs/AutoModeAlist)
