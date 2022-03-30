---
layout: post
title: curious course on coroutines and concurrency 2
date: 2022-03-30 09:02:20 +0900
tags: python
---

[前の投稿](/2022/03/23/curious-course-on-coroutines-and-concurrency.html)で、`yield`によって値を受け渡したり、ジェネレーターの呼び出し元とジェネレーターの中を行き来したりすることができるようになったのを見た。

ただ、ここには一つ制約があって、ジェネレーターが別のジェネレーターを呼び出すときに問題が生じる・・らしい
（todo: が、その問題が何なのか、まだよく分かってないので、分かったら書き直す）。
これを回避するために、トランポリンというテクニックを使う。

```python
def foo(val):
    yield f"foo: {val}"

def bar():
    ret = yield foo("bar")
    print(ret)
    yield

def baz():
    b = bar()
    f = b.send(None)
    ret = f.send(None)
    b.send(ret)

baz()
```

これは、次のように動作する：

1. `baz()`呼び出しによって、`baz`の中身がスタート。ジェネレーター`b`が生成される
2. `b.send(None)`によって、`bar`の中身がスタート。`yield foo("bar")`によって、ジェネレーターが生成される。これが`yield`によって`baz`に返され、`f`に代入される。また、制御が`baz`の方に戻る
3. `f.send(None)`によって、`foo`の中身がスタート。`yield f"foo: {val}"`によって、値`"foo: bar"`が生成される。これが`yield`によって`baz`に返され、`ret`に代入される
4. `b.send(ret)`によって、`bar`の中身に制御が戻り、（`bar`の中の）`ret`に値が代入される。これが`print(ret)`によって表示され、次の`yield`で`baz`に制御が戻る

ポイントは何かというと・・ジェネレーターと呼び出し元との行き来は、全て、一番根っこの呼び出し元とジェネレーターとの間で行われる、ということ（つまり、上の例で言うと、`foo`と`baz`、`bar`と`baz`の間で`yield`による行き来は起こるが、ジェネレーターである`bar`と`baz`の間では起こらないということ）。

なので、根っこの呼び出し元の`baz`が、全てのジェネレーターを保持し、全ての返り値を受け取り、それを適切なジェネレーターに`send`するという役割を一手に引き受けている。
