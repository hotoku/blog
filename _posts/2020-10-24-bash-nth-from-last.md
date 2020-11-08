---
layout: post
title: bashでn個前のコマンドとその引数
date: 2020-10-24 15:22:09 +0900
tags: bash
---
bashでは、`$_`で「直前のコマンドの引数」を参照できる。
例えば、

```bash
$ mkdir -p hoge/fuga/piyo/foo/bar/baz
$ cd $_
```

などとすると長いパスを何度も打たなくて便利である。

例えば、

```bash
$ mkdir -p hoge/fuga/piyo/foo/bar/baz
$ ce $_ # cdを打ち間違えてエラーになってしまった
```

みたいなことがあって「2つ前」のコマンドの引数を使いたいんじゃ！
というような場合にはどうしたら良いんじゃ？と思ったので調べた。

### 解答
`!-2$`で行ける。

bashでは、`!<n>`で、historyの中のn番目のコマンドを参照できる。
これの応用で、`!-<n>`で、n個前のコマンドを参照できる。
これに`$`を付けることで、n個前のコマンドの最後の引数、という意味になるらしい。

さらに、`:<m>`で、m番目の引数を指定できる。

例

```bash
$ echo a b c
> a b c
$ echo d e f
> d e f
$ echo g h i
g h i
$ echo !-3$
> c
$ echo !-4:2
> b
```

### ちなみに
先のタイポの例のような状況では、実は`$_`を使えば問題ないということに、この記事を書いていて気づいた。

```bash
$ mkdir -p hoge/fuga/piyo/foo/bar/baz
$ ce $_ # エラーにはなるが、引数としてhoge/fuga/piyo/foo/bar/bazを指定しているのには代わりない
$ cd $_ # 直前のコマンドの引数は、やはりhoge/fuga/piyo/foo/bar/baz
```
