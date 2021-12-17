---
layout: post
title: Emacsのminor modeを作る
date: 2021-12-17 09:32:46 +0900
tags: emacs
---

Emacsのマイナーモードを作る際に調べたことメモ

#### [2021-12-17 09:32:51]

とりあえず検索：emacs minor mode tutorial

#### [2021-12-17 09:33:41]

[これ](https://nullprogram.com/blog/2013/02/06/)を読もう。

> Creating a new minor mode is really easy, it’s just a matter of understanding Emacs’ conventions.

だそうな。

#### [2021-12-17 09:34:23]

- 名前は`-mode`で終わること
- モードを有効/無効にする関数は、↑と同じ名前
- キーマップは、`-mode-map`という名前
- フックは、`-mode-hook`という名前

が、convention。そうやね

#### [2021-12-17 09:37:21]

```lisp
(define-minor-mode foo-mode
  "Get your foos in the right places.")
```

というマクロがあるらしい。

#### [2021-12-17 10:48:58]

`define-minor-mode`にはキーワード引数を渡せる

- `:lighter` modelineに表示される文字列。他のモードに **直接**くっつくので、デリミタとして先頭にスペースを1文字入れるのがconvention
- `:keymap` このマイナーモード用のキーマップ。`(make-keymap)`か`(make-sparse-keymap)`で作る
- `:global` マイナーモードがグローバルになる

`define-minor-mode`の残りには、任意のlispコードを書ける。これは、`-mode`関数を読んだとき（つまり、マイナーモードを有効/無効にするとき）に毎回実行される。

とりあえず、マイナーモード作るには、こんくらい分かってれば良いぽい

#### [2021-12-17 10:55:40]

autoloadを理解しないとな・・

https://qiita.com/tadsan/items/431899f76f3765892abd#4--autoloadsel

`xxx-mode-autloads.el`というスクリプトで、`xxx-model.el`のロードを必要なときまで遅延してくれる。
で、この`xxx-mode-autloads.el`は、

> 関数定義や変数定義の上の行に;;;###autoloadと書いてやるだけで、パッケージ管理ツールが適切に自動生成してくれます

らしい。
