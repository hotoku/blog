---
layout: post
title: emacs local variable
date: 2020-10-01 21:41:39 +0900
categories: emacs
---




Emacsでは、ファイルの先頭や末尾に特別な書式で値を記入することで、変数の値をそのバッファ限定で変更することができる。

## 先頭に書く

```
# -*- variable-name: value -*-
```

というように、`-*-`で挟む。ここで大事なのは、

- `-*-`で挟むこと
- 変数名の後ろに`:`を付けること
- 複数の値を書くときには`;`で区切ること

これが満たされていれば、前後の文字は無視してくれるので、プログラム言語に合わせてコメント用のprefixを付けることができる。

## 末尾に書く

```
# Local Variables:
# variable-name: value
# End:
```

末尾に上のように書いても同じ意味になる。`変数名: 値`の行は複数書くことができる。ここで大事なのは、

- `Local Variables:`で始まり
- 最後が`End:`で終わる

こと。末尾の`:`が忘れがちなので注意。行頭にコメントを入れられるのは上と一緒。

[参考](https://www.gnu.org/software/emacs/manual/html_node/emacs/Specifying-File-Variables.html#Specifying-File-Variables)
