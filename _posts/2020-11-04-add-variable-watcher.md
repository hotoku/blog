---
layout: post
title: 変数の更新をフックする
date: 2020-11-04 18:00:27 +0900
tags: emacs
---

elispのデバッグに有用そうな関数を知ったのでメモ

> add-variable-watcher is a built-in function in ‘C source code’.
>
> (add-variable-watcher SYMBOL WATCH-FUNCTION)
>
>   Probably introduced at or before Emacs version 26.1.
>
> Cause WATCH-FUNCTION to be called when SYMBOL is about to be set.
>
> It will be called with 4 arguments: (SYMBOL NEWVAL OPERATION WHERE).
> SYMBOL is the variable being changed.
> NEWVAL is the value it will be changed to.  (The variable still has
> the old value when WATCH-FUNCTION is called.)
> OPERATION is a symbol representing the kind of change, one of: ‘set’,
> ‘let’, ‘unlet’, ‘makunbound’, and ‘defvaralias’.
> WHERE is a buffer if the buffer-local value of the variable is being
> changed, nil otherwise.
>
> All writes to aliases of SYMBOL will call WATCH-FUNCTION too.
