---
layout: post
title: curious course on coroutines and concurrency
date: 2022-03-24 07:58:54 +0900
tags: python
---

[curious course on coroutines and concurrency](http://www.dabeaz.com/coroutines/)のメモ。

これは、asyncioがなかった時代に、`yield`構文を使って、非同期プログラミングを解説した講座。Pyconの講演だったらしい。

## yieldとcoroutine

普通、yieldはiteratorを定義するために使われる。こんな感じ

```python
def rep(n):
  x = 0
  while x < n:
    yield x
    x += 1

for i in rep(3):
  print(i)
```

このgeneratorには、実は、「外から値を渡す」ことができる。こんな感じ

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

値の送受信の両方を書くこともできる。こんな感じ

```python
def rands():
  r = yield s
  print(r)

rs = rands()
s = next(rs)
print(s)
rs.send("r")
```
