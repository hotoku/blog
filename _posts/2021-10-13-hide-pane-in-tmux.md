---
layout: post
title: tmuxでpaneを隠す
date: 2021-10-13 18:42:53 +0900
tags: tmux
---


[Stackoverflow](https://unix.stackexchange.com/questions/145857/how-do-you-hide-a-tmux-pane)


`<prefix> :`でコマンド入力する


**隠すとき**


```
break-pane -dP
```


- paneが隠れる
- 復元させる時の情報が、他のpaneに出る(`0:2.0`とか。`session:window.pane`を表す識別子らし)。これを覚えておいて、`q`を押す


- `-d` : 隠す
- `-P` : 情報を表示する、という意味ぽい


**復元するとき**


先ほど情報が出たpaneに移動して


```
join-pane -vs さっきの情報(0:2.0みたいなやつ)
```


- `-v` : 垂直に割る
- `-s` : ソース


まだ暗号ですな
