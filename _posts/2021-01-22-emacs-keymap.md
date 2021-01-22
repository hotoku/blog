---
layout: post
title: Keymap
date: 2021-01-22 11:28:01 +0900
tags: emacs
---

[Emacsマニュアルのキーマップの部分](https://www.gnu.org/software/emacs/manual/html_node/elisp/Keymaps.html)を読んだのでメモ


## Keymaps

- keymapは、「event type」を別のkeymapかcommandに割り当てる（associate or bind）
  - 別のkeymapが割り当てられたら、そのmapの中に再帰的に探しにいくようになる

### Keys Sequences
- key sequence: 入力イベントの列。character, function keys, mouse actions , system events external to Emacs
- elispから見た実態は、string or vector. 基本的に、key sequenceを受け取る関数は、どちらの表現でも扱える
- 文字列で表現する場合
  - "a", "b"など文字自身
  - "\C-" or "\M-"でctrlとmetaの同時押し
  - "\t", "\r", "\e", "d"でTAB, RET, ESC, DEL
  - 複数のイベントの連続は、文字列を連結。ex: "\C-xl"は、`C-x l`


### Keymap Basics
1つのkeymapは、直接には、1つのイベントを扱う。key sequenceが1つのイベントからなるときには、keymapの対応する値が対応するコマンドになる。
複数の入力イベントからなるkey sequencの場合には、itereativeにコマンドが決まる。まず、最初の入力イベントに対応する値がkeymapの中から探される。
このとき、得られる値は、keymapであると期待されており、そのmapに対して2つ目以降の入力イベントに対応する値が同様に探索される。

keymapの中で、keymapが割り当てられている入力イベントをPrefix Keyと呼ぶ。そうでない場合はcomplete keyと呼ばれる。

常に、いくつかのprimary keymapが"active"で、キーバインディングを探すために使われる。

- `global map`: 全てのバッファで共有されている。
- `local keymap`: 通常、特定のメジャーモードに付属する
- `minor mode keymap`: 現状のマイナーモードに付属するkeymap（マイナーモードにはkeymapがない場合もある）

local keymapは、global mapを隠す。minor mode keymapは、global mapを隠す。

keymapは、他のkeymapから継承することができる。子のkeymapは親のkeymapの要素を変更したり追加したりできる。
親のkeymapの値は、常に（dymanicに）子からも見える。




キーマップの値は、それ自身キーマップになり、それを利用して"C-x C-f"のような複数の入力からなるキーバインドを実現している模様。
とりあえず、これが知りたいことだった。


### Format of Keymaps
pkeymapは、先頭が`keymap`というシンボルであるようなリスト。2つ目以降の要素は、いくつかの形が想定されている。

また、function cellの値がkeymapであるようなシンボルも、keymapと見なされる。


### Prefix Keys
[このページ](https://www.gnu.org/software/emacs/manual/html_node/elisp/Prefix-Keys.html#Prefix-Keys)に、主要なglobal keymapが一覧されている。

`mode-specific-map`という名前の（名前に反して）globalなkeymapがあり、これは`C-c`に割り当てられている。

"prefix key"は、keymapでのbindingが、またkeymapであるようなinput event sequence。複数のprefix keyが、有効なkeymapの中にある場合、各マップの中が探される。
