---
layout: post
title: dotファイルの管理
date: 2023-08-10 05:43:35 +0900
categories: blog
tags: life unix
---

`.zshrc`とか`.gitconfig`とか`.tmux.conf`とか、ホームディレクトリに置かれる様々な設定ファイル、いわゆる（？）ドットファイルの管理方法が定まらないので、ここで少し一人ブレストをしてみる。

達成したいこと

新しい環境を作った時に、`git clone`してホームディレクトリにシンボリックリンクを置いたら、普段の使い慣れた環境が再現されてほしい。

何が問題なのか

osの違い mac or linux, versionによって使えるツールや挙動に違いがある。そもそも、インストールされているツールに違いがあったりする。ツール類のインストールまでdotfiles管理と合わせるのはtoo muchな気がする。

結局、環境構築時か、毎回の起動時に環境を調べて、その環境でのbest effortを実現するようにプログラムするしかないんだな

古き良き./configure, make, make installと同じなんだな、つまりは

環境の差異とは何かを考える必要がある。環境ごとに必要なカスタマイズを受け入れられるようにする必要がある

とりあえず.zshrcを考えると、環境の差異ってのはコマンドの存在で、カスタマイズは環境変数の設定て感じかなぁ
