---
layout: post
title: tmuxでpaneをマージする
date: 2020-11-09 12:31:58 +0900
tags: tmux
---

`join-pane`というコマンドがあって、

```
: join-pane -s :<window番号>
```

とすると、今いるpaneに番号のwindowが入ってくる。

```
: join-pane -t :<window番号>
```

とすると、今いるpaneが番号のwindowに入っていく。

どちらも、番号の前に`:`を入れる必要があることに注意。

ちなみに、tmuxでコマンドを入力するには`<prefix> :`を入力する。

[参考ページ](https://kozo2.hatenadiary.org/entry/20111202/1322827858)
