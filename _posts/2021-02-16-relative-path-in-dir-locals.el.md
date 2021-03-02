---
layout: post
title: dir-locals.elで相対パス
date: 2021-02-16 21:54:22 +0900
tags: emacs
---


cf: [StackExchange](https://emacs.stackexchange.com/questions/26093/how-can-i-set-directory-local-variable-in-relative-to-dir-locals-el-file-locati)

```elisp
((nil . ((eval . (set (make-local-variable 'my-project-path)
                      (file-name-directory
                       (let ((d (dir-locals-find-file ".")))
                         (if (stringp d) d (car d))))))
         (cmake-ide-project-dir . my-project-path)
         (eval . (setq cmake-ide-build-dir (concat my-project-path "build")))
         )))
```

上のように書くと、`my-project-path`に、`.dir-locals.el`のあるディレクトリのパスが入る。

- make-local-variableで、シンボルをローカル変数にできる
- evalで、cdrを評価できる

という感じなのかね。
