---
layout: post
title: -historyで終わる変数一覧
date: 2021-03-10 11:39:48 +0900
tags: emacs
---


```elisp
(ppp-list
 (async-get
  (async-start
   (lambda ()
     (let (res)
       (mapatoms (lambda (elm)
                   (when (and
                          (symbolp elm)
                          (string-suffix-p "-history" (symbol-name elm)))
                     (push elm res))))
       (sort res (lambda (a b) (string< (symbol-name a) (symbol-name b)))))))))
```

Slackの[emacs-jp](https://emacs-jp.slack.com/archives/C6T2T9H4G/p1615304948012900)で、@conao3さんに教えていただいた
