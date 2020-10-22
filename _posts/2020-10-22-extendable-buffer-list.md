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
  Lexer lexer;
  ArrayList<Token> buf;
  int p;

  Buffer(lexer){
    buf = new ArrayList<Token>();
    p = 0;
    push.add(lexer.nextToken());
  }

  consume(){
    /* 1つ消費する */
    p++;
    if(p == buf.size()){
      /* 最後尾に来たらpを先頭に戻して再利用 */
      p = 0;
      buf.clear();
    }
    push.add(lexer.nextToken());
  }

  push(Token t){
    buf.add(t);
  }

  get(int i){
    /* 現在の先頭からi番目の値を返す */
    if(p+i >= buf.size()){
      int n = p+i - (buf.size()-1); // 足らない要素の数
      for(int i = 0; i < n; i++){
        push(lexer.nextToken());
      }
    }
  }
}
```
