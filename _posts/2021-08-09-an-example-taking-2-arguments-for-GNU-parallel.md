---
layout: post
title: GNU parallelで2つの引数を取る例
date: 2021-08-09 18:48:15 +0900
tags: parallel unix shell
---

GNU paralleに、2つ以上の引数を渡す例

コマンド

```
$ cat <<EOF | parallel --colsep ' ' echo 1={1} 2={2}
a b
c d
e f
EOF
```

出力

```
1=a 2=b
1=c 2=d
1=e 2=f 
```
