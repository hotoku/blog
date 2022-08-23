---
layout: post
title: category theory for programmers
date: 2022-08-23 08:56:09 +0900
tags: category
---

Zennで[プログラマのための圏論](https://zenn.dev/taketo1024/books/850b20937af93b)という翻訳プロジェクトを見つけた。
翻訳の方は執筆中というステータスだが、原本はPDFが公開されているとのことなので、チマチマと読んでいたら、これが分かりやすかったのでメモ。

- 数学の細かいところは飛ばすよ、と言いつつ、どういう細かいところを飛ばしているのかが明示されているのが嬉しい
- Haskellだけでなく、C++のコードも一緒に書いてある。C++では、Haskellが隠蔽して内部でやっている部分も陽に書かないといけないので、逆に明示化されてわかりやすい

という辺りが自分にとってありがたいポイント。

## 圏とモノイド

- 圏 = 点(object)と矢印(morphism)の集まり
- モノイド = 結合則を満たし単位元を持つような演算の定義された集合

という道具があれば関数の合成ができるよ、ということが例を使って4章くらいまでに書いてある。

例としては、ログ用の文字列を積み重ねるような機能を追加するWriterという仕組みをC++で作っている。

プログラムの各ステップの処理に対してログ出力を付け加えるようなことを泥臭く書いてみると

```c++
pair<bool, string> isEven(int n) {
  return make_pair(n % 2 == 0, "isEven ");
}

pair<bool, string> negate(bool b) {
  return make_pair(!b, "Not so! ");
}

pair<bool, string> isOdd(int n) {
  pair<bool, string> p1 = isEven(n);
  pair<bool, string> p2 = negate(p1.first);

 return make_pair(p2.first, p1.second + p2.second);
}
```

こんな感じになるだろうけれども。`isOdd`が明らかにおかしなことになっている。
この、「ログ文字列を足す」という関数本来の興味ではない部分を、抽象化して分離するには・・

```c++
template<class A, class B, class C> function<Writer<C>(A)> compose(function<Writer<B>(A)> m1, function<Writer<C>(B)> m2) {
  return [m1, m2](A x) {
    auto p1 = m1(x);
    auto p2 = m2(p1.first);
    return make_pair(p2.first, p1.second + p2.second);
  };
}
```

こんな合成用の関数を書いてあげれば良いだろう。

ここで、この合成作業が上手くいくのは、

```c++
    return make_pair(p2.first, p1.second + p2.second);
```

この`p1.second + p2.second`の文字列の結合処理がモノイド性を持つからだよね、ということ。

「モノイドである」というのが、どこで大事になるのか分かってなかったんだけど、このファンクターとかの入れ物で修飾するときの「修飾する側（=ログようの文字列とか）」がモノイドであるのが大事だったんだね、ということが分かったのが収穫。
これまで、「型とその間の関数が圏になる」ということで、この型の間の演算ばかりを見ていたんだけど、むしろ、そこの部分は「関数が合成できる」ということを保証しているだけで、モノイドのような代数的な制約は、修飾する側に課せられていたということを理解していなかった。
