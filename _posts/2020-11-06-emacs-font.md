---
layout: post
title: emacsのfontを設定する
date: 2020-11-06 16:12:33 +0900
categories: emacs
---

emacs 27に上げたら、漢字の表示がおかしくなってしまったので、フォント設定について調べた。

[参考記事][qiita]

## フォント設定の場所
フォントの設定は、フレームに存在する。フレームのフォントは`set-frame-font`関数で設定できる。
もしくは、`default-frame-alist`に設定を書いても良い。

## 現状のフォントの確認

interactiveな関数はないぽいので、フォントを確認したい場所にカーソルを移動して`(font-at (point))`を実行する（`M-:`で実行する）。

自分の環境では、漢字には`#<font-object "-*-PingFang SC-normal-normal-normal-*-12-*-*-*-p-0-iso10646-1">`が
ひらがなには`#<font-object "-*-Hiragino Sans-normal-normal-normal-*-12-*-*-*-p-0-iso10646-1">`が使われているぽい。

## 試行錯誤
`.emacs.d`を消して実行すると、別のフォントが当たるので、`init.el`の何かが影響しているのは確か。しかし、目で見ても、明示的にフォントを設定している場所はない。
怪しそうなところを虱潰しにするしかないかも。

`dakrone-theme`と`yh/use-large-font`あたりを消しても変わらず。というか、`init.el`を全部コメントアウトしても変わらなかった。

ターミナルから`emacs`コマンドで起動するときと、Finderでアイコンをダブルクリックしたときでフォントが変わっていることが分かった。
これは奥が深そう・・。



[qiita]: https://qiita.com/j8takagi/items/01aecdd28f87cdd3cd2c
