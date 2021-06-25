---
layout: post
title: DockerでLSPのサーバーを動かしてEmacsで使いたい
date: 2021-06-25 14:54:40 +0900
tags: emacs
---

EmacsでC++のプログラムを開発したい。LSPはDockerの中で動かしたい。と思って設定したときの記録。


[2021-06-25 11:11]
https://github.com/emacs-lsp/lsp-docker
これ一発で行けそうな気配。便利な時代だ


[2021-06-25 11:19]
まず、Emacs + LSPを理解しよう・・

[2021-06-25 11:41]
```
(use-package lsp-mode
  :init
  ;; set prefix for lsp-command-keymap (few alternatives - "C-l", "C-c l")
  (setq lsp-keymap-prefix "C-c l")
  :hook ((js-mode . lsp)
         (c++-mode . lsp)
         (lsp-mode . lsp-enable-which-key-integration))
  :commands (lsp lsp-defferred))
```
で、cppファイルを開くと、clangdがない、と言われる。
インストールは、[これ](https://emacs-lsp.github.io/lsp-mode/page/languages/)を見ろと言われる。で、見ると、`brew install llvm`しろと言われる。で、すると、

```
To use the bundled libc++ please add the following LDFLAGS:
  LDFLAGS="-L/opt/homebrew/opt/llvm/lib -Wl,-rpath,/opt/homebrew/opt/llvm/lib"

llvm is keg-only, which means it was not symlinked into /opt/homebrew,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have llvm first in your PATH, run:
  echo export PATH=/opt/homebrew/opt/llvm/bin:/opt/homebrew/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/bin:/Users/hotoku/bin:/opt/homebrew/bin:/usr/local/bin:/Users/hotoku/.pyenv/shims:/Users/hotoku/.pyenv/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/MacGPG2/bin:/Library/Apple/usr/bin:/opt/homebrew/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/bin:/Users/hotoku/bin:/opt/homebrew/bin:/Users/hotoku/.pyenv/bin:/opt/homebrew/opt/fzf/bin >> ~/.zshrc

For compilers to find llvm you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/llvm/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/llvm/include"
```

と言われる。

`ls /opt/homebrew/opt/llvm/bin`すると、clangdはいるので、大丈夫ぽい。

[2021-06-25 13:34]
emacsの設定変更する→終了して起動する→文字列の大きさを変える→というループがうざくて、最後に利用してた

文字列の表示サイズを保存するelispを書いていた。・・yak shavingに2h使ったことになるね


[2021-06-25 13:42]
path通したら、clangdがちゃんと起動したぽい



[2021-06-25 13:57]
https://github.com/emacs-lsp/lsp-docker にしたがって・・
```
(use-package lsp-docker
  :config
  (message "hoge")
  (defvar lsp-docker-client-packages
    '(lsp-clangd))

  (defvar lsp-docker-client-configs
    '((:server-id 'clangd :docker-server-id 'clangd-docker :server-command "clangd")))

  (lsp-docker-init-clients
   :path-mappings '(("/Users/hotoku/projects/hotoku/lineage" . "/projects"))
   :client-packages lsp-docker-client-packages
   :client-configs lsp-docker-client-configs))
```
を設定するも、起動時に
```
Error (use-package): lsp-docker/:config: No such client 'clangd
```
で怒られる・・

とりあえずuse-packageの外に出してみる

[2021-06-25 13:59]
外に出すと、起動時にエラー。--debug-initでinit.el読み込み時のバックトレースを嫁、と言われて--debug-initしても挙動変わらず。カムチャッカ

怪しいのは、最後の (lsp-docker-init-clients)なので、これを削除して実行


[2021-06-25 14:37]
起動時のエラーは、(lsp-docker-init-clients)で決まり。
エラーメッセージは、`No such client 'clangd`。

ドキュメントが [これ](https://github.com/emacs-lsp/lsp-docker#how-it-works)だけで、いまいち頼りにならず。

仕方ないのでソースを読みに行く。


[2021-06-25 14:41]
ソースを`no such error`で検索すると
`lsp-docker.el l.129 (user-error "No such client %s" server-id)`
にたどり着く。user-errorて何じゃいと思ってヘルプを見ると、ユーザーが間違った操作をした場合に起こすエラー、とのこと。
つまり、私は何か間違ったことをしているぽい。
debug-on-errorでデバッガを起動しない、とある。どうりで・・。しかし、debug-ignored-errorsで上書き可能とのこと。
このリストの中に `user-error`がいるので、こいつを削除すれば良さそう。

[2021-06-25 14:49]
めでたくデバッガが起動。バックトレースは
```
Debugger entered--Lisp error: (user-error "No such client 'clangd")
  signal(user-error ("No such client 'clangd"))
  user-error("No such client %s" 'clangd)
  lsp-docker-register-client(:server-id 'clangd :priority 10 :docker-server-id 'clangd-docker :docker-image-id "emacslsp/lsp-docker-langservers" :docker-container-name "lsp-container" :server-command "clangd" :path-mappings (("/Users/hotoku/projects/hotoku/lineage" . "/projects")) :launch-server-cmd-fn lsp-docker-launch-new-container)
  #f(compiled-function (input0) #<bytecode 0x4c8adce7>)((:server-id 'clangd :docker-server-id 'clangd-docker :server-command "clangd"))
  mapc(#f(compiled-function (input0) #<bytecode 0x4c8adce7>) ((:server-id 'clangd :docker-server-id 'clangd-docker :server-command "clangd")))
  seq-do(#f(compiled-function (input0) #<bytecode 0x4c8adce7>) ((:server-id 'clangd :docker-server-id 'clangd-docker :server-command "clangd")))
  lsp-docker-init-clients(:path-mappings (("/Users/hotoku/projects/hotoku/lineage" . "/projects")) :client-packages (lsp-clangd) :client-configs ((:server-id 'clangd :docker-server-id 'clangd-docker :server-command "clangd")))
  (progn (lsp-docker-init-clients :path-mappings '(("/Users/hotoku/projects/hotoku/lineage" . "/projects")) :client-packages lsp-docker-client-packages :client-configs lsp-docker-client-configs))
  eval((progn (lsp-docker-init-clients :path-mappings '(("/Users/hotoku/projects/hotoku/lineage" . "/projects")) :client-packages lsp-docker-client-packages :client-configs lsp-docker-client-configs)) t)
  elisp--eval-last-sexp(nil)
  eval-last-sexp(nil)
  funcall-interactively(eval-last-sexp nil)
  call-interactively(eval-last-sexp nil nil)
  command-execute(eval-last-sexp)
```



`lsp-docker-register-client(:server-id 'clangd`というのが見えるが、これが間違いの元な気がする。



[2021-06-25 15:36:34]
`lsp-docker-init-clients`のヘルプを読むと、

```
:server-id is the ID of the language server, as defined in the
library ‘lsp-clients’.
```

とある。で、`lsp-clients`のヘルプを読むと、ハッシュテーブルらしい。
この中に`clangd`が入ってない、というのが原因？

[2021-06-25 15:37:58]
emacsのハッシュテーブルの扱い方を見てみる・・

[2021-06-25 15:45:27]
ielmで`(maphash '(lambda (k b) (message "%s" k)) lsp-clients)`を実行してみると、`mspyls`だけしか出てこない。
で、mspylsは、これまでも使っていた。これは、最初に使ったときに、自動でインストールされた。
一方で、clangdは、「手動でインストールしろ」と言われたので、ターミナルで`brew install llvm`としたのだった。
なので、Emacsは、まだclangdがこのマシンに入っていることを認識できてないということかも。

[2021-06-25 15:52:14]
`.cpp`ファイルを開いて、`(lsp)`を実行してからielmで👆のmaphashを実行すると、lspc-lientsの中身が増えており、その中にclangdもいた。
で、その状態で、`lsp-docker-init-clients`を実行したが、同じようなエラーに・・まじめにコードを読む

[2021-06-25 15:57:06]
`lsp-docker-register-client`は、
`(if-let ((client (copy-lsp--client (gethash server-id lsp-clients))))`から始まっている。
で、ユーザーエラーは、その関数呼び出しの最後にいる。で、if-letて何じゃい・・

> Bind variables according to SPEC and evaluate THEN or ELSE.
> Evaluate each binding in turn, as in ‘let*’, stopping if a
> binding value is nil.  If all are non-nil return the value of
> THEN, otherwise the last form in ELSE.

とのこと。ということは、SPECのどっかでnilになっているやつがいる。

[2021-06-25 16:19:05]
よく見ると、SPECの中身は`(client (copy-lsp--client (gethash server-id lsp-clients)))`しかない。
ということは、やはり`lsp-clients`に正しく`clangd`が入らない、というのが問題。ぐぬぬ



[2021-06-25 17:02:56]
前進:

公式の設定例で以下のようなスニペットが紹介されているが。

```
(setq lsp-docker-client-configs
    '((:server-id 'bash-ls :docker-server-id 'bashls-docker :server-command "bash-language-server start")
      (:server-id 'clangd :docker-server-id 'clangd-docker :server-command "clangd")
      (:server-id 'css-ls :docker-server-id 'cssls-docker :server-command "css-languageserver --stdio")
      (:server-id 'dockerfile-ls :docker-server-id 'dockerfilels-docker :server-command "docker-langserver --stdio")
      (:server-id 'gopls :docker-server-id 'gopls-docker :server-command "gopls")
      (:server-id 'html-ls :docker-server-id 'htmls-docker :server-command "html-languageserver --stdio")
      (:server-id 'pyls :docker-server-id 'pyls-docker :server-command "pyls")
      (:server-id 'ts-ls :docker-server-id 'tsls-docker :server-command "typescript-language-server --stdio")))
```

クオート `'`が重なってしまっている。
このため、`server-id`の値が`clangd`というシンボルであるべきところ、`'clangd`になってしまっている。

この設定を`(:server-id clangd :docker-server-id 'clangd-docker :server-command "clangd")`に変更して動かしたら、clangd-dockerサーバーが動くところまでは動いたが、dockerの中でエラーが出て止まった。カムチャッカ

エラーメッセージ
```
Server clangd-docker:17509/starting exited with status exit(check corresponding stderr buffer for details). Do you want to restart it? (y or n)
```

lspのログを見ると・・
```
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
docker: Error response from daemon: OCI runtime create failed: container_linux.go:380: starting container process caused: exec: "clangd": executable file not found in $PATH: unknown.
```
とのこと。


```
docker run -it --rm emacslsp/lsp-docker-languageserver /bin/bash
```

でコンテナを立ち上げて

```
$ find . -type f -name "clangd"
```

とすると、`./ccls/clang+llvm-8.0.0-x86_64-linux-gnu-ubuntu-18.04/bin/clangd`が見つかる。

なので、`lsp-docker-client-configs`の定義を
```
(defvar lsp-docker-client-configs
  '((:server-id clangd :docker-server-id clangd-docker :server-command "/ccls/clang+llvm-8.0.0-x86_64-linux-gnu-ubuntu-18.04/bin/clangd")))
```
に変えて実行したら、めでたくdockerでサーバー立ち上がった。


[2021-06-25 18:11:58]
結局、一日かかったな・・
