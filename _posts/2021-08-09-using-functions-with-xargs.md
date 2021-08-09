---
layout: post
title: xargsで関数を呼び出す
date: 2021-08-09 18:15:05 +0900
tags: shell xargs
---

シェルスクリプトの中で、xargsを使う。xargsに関数を呼び出させたい。という場合は、

1. `export -f <関数名>`をする
2. `xargs -n1 -I@ bash -c '<関数名> @**`として使う

とすれば良い。

**例**
```
#!/bin/bash

func(){
    echo func $1
}

export -f func

seq 10 | xargs -n1 -I@ bash -c 'func @'
```
