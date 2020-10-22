---
layout: post
title: 伸び縮みするバッファ
date: 2020-10-22 20:36:29 +0900
categories: 言語実装パターン
---
Backtrackパーサーを実装するときに、任意長のバッファが必要になる。

ここで必要な任意長のバッファとは、抽象的に言うと次のようなものである。

- ストリームから値を1つずつ取り出し、先頭から順に消費していく
- ただし、いくつかの要素はしばらくの間バッファしておく必要がある
- バッファのサイズが最大でどれだけ必要になるかは分からない

これを、JavaのArrayListで実装する。

```java
class Buffer{
  ArrayList<Token> buf;
  int p;

  consume(){
    /* 1つ消費する */
    p++;
    if(p == buf.size()){
      /* 最後尾に来たらpを先頭に戻して再利用 */
      p = 0;
      buf.clear();
    }
  }

  push(Token t){
    buf.add(t);
  }
}
```
