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

#### [2021-12-17 12:09:56]

とりあえず、こんな感じのサンプルコードをでっち上げる。

```lisp
;;; zetasql-formatter-mode.el ---  -*- lexical-binding: t -*-

;; Copyright (C) 2021 Yasunori Horikoshi

;; Author: Yasunori Horikoshi <horikoshi.et.al@gmail.com>
;; Keywords: lisp
;; Version: 0.0.1

;;; Commentary:

;;; Code:

(define-minor-mode zetasql-formatter-mode
  "Format query by zetasql-formatter before saving the buffer.")

;;;###autoload
(defun zsfm-format ()
  "Format sql in the buffer."
  (message "hoge"))

;;;###autoload
(add-hook 'sql-mode-hook
          '(lambda ()
             (add-hook 'before-save-hook 'zsfm-format nil t)))

(provide 'zetasql-formatter-mode)
;;; zetasql-formatter-mode.el ends here
```

`~/projects/zetasql-formatter-mode/zetasql-formatter-mode.el`として保存。

#### [2021-12-17 12:06:52]

パッケージ管理ツールに適切に自動生成してもらうには・・`M-x package-install-file`で、上のファイルを指定してみる。
すると・・

1. `~/.emacs.d/elpa/zetasql-formatter-mode-0.0.1`というディレクトリができる
2. 中を見てみると・・`zetasql-formatter-mode{.el,.elc,-pkg.el,-autloads.el}`ができてる

`zetasql-formatter-mode-autoloads.el`の中を見てみると・・

```lisp
(autoload 'zsfm-format "zetasql-formatter-mode" "\
Format sql in the buffer." nil nil)

(add-hook 'sql-mode-hook '(lambda nil (add-hook 'before-save-hook 'zsfm-format nil t)))
```

こんなコードが書いてある。ふむふむ

1. `zsfm-format`が`auto-load`に渡されている
2. `add-hook`の内容は、そのまま書いてある

起動時には、このautoloadsファイルが読まれる。するとどうなるかというと、

2. `zsfm-format`が初めて呼ばれたときに、`zetasql-format-mode.elc`が読まれるように登録される
3. `add-hook`は、そのまま書いてあるので、`*.sql`を開いたときに、`before-save-hook`に`zsfm-format`が登録される

つまり、初めて`*.sql`ファイルを開いて、保存したときに、`zetasql-format-mode.elc`が読まれるようになるんじゃね
