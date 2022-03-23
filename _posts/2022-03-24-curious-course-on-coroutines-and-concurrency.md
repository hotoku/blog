---
layout: post
title: curious course on coroutines and concurrency
date: 2022-03-24 07:58:54 +0900
tags: python
---

[curious course on coroutines and concurrency](http://www.dabeaz.com/coroutines/)のメモ。

これは、asyncioがなかった時代に、`yield`構文を使って、非同期プログラミングを解説した講座。Pyconの講演だったらしい。

## yieldとcoroutine

普通、yieldはiteratorを定義するために使われる。こんな感じ：

```python
def rep(n):
  x = 0
  while x < n:
    yield x
    x += 1

for i in rep(3):
  print(i)

```

```shell
0
1
2
```

このジェネレーターには、実は、「外から値を渡す」ことができる。こんな感じ：

```python
def receive():
  while True:
    x = yield
    print(x)

r = receive()
next(r)
for i in range(3):
  r.send(i)
```

```shell
0
1
2
```

値の送受信を両方とも書くこともできる。こんな感じ：

```python
def rands():
  r = yield "S"
  print(r)

rs = rands()
s = rs.send(None)
print(s)
rs.send("R")

```

```shell
S
R
Traceback (most recent call last):
  File "/Users/hotoku/junk/2022/03/24-080501.py", line 9, in <module>
    rs.send("R")
StopIteration
```

このプログラムは、次のように動作する。

1. `rs = rands()`でジェネレーター`rs`が作られる（ここでは、`rands`の中のコードは実行されない）
2. `s = rs.send(None)`で、次のようなことが起こる
  1. `rands`がスタートし、`yield "S"`まで進む
  2. この`yield`された値`"S"`が、`next`の返り値となる
  3. グローバルの変数`s`に上の返り値が代入される
3. `print(s)`で`"S"`が表示される
4. `rs.send("R")`で、次のようなことが起こる
   1. `send`の引数`"R"`が、`yield "S"`の返り値となり、`rands`のロケール変数`r`に代入される
   2. `print(r)`で`"R"`が表示される
   3. ジェネレーターの最後に到達したので、`StopIteration`が送出される
5. 誰も`StopIteration`を受け取っていないので、プログラムが例外終了する

つまり、

1. `<generator>.send(v)`で、グローバル→ジェネレーターに制御が移り、
2. `yield <value>`で、ジェネレーター→グローバルに制御が戻る

ということが繰り返されることが分かる。

また、ジェネレーターから、グローバルに処理の終了を知らせるには`StopIteration`が使われていることが分かる。
逆に、グローバルからジェネレーターに終了を知らせるには、`<generator>.close()`を呼び出す。すると、待機している`yield`の行で`GeneratorExit`例外が発生する。こんな感じ：

```python
def loop():
    try:
        while True:
            v = yield
            print(v)
    except GeneratorExit:
        print("finished")

l = loop()
l.send(None)
l.send(1)
l.send(2)
l.send(3)
l.close()
```

```shell
1
2
3
finished
```
