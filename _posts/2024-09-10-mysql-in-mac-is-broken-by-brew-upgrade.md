---
layout: post
title: macのmysqlがbrew upgradeで壊れた
date: 2024-09-10 11:10:26 +0900
categories: blog
tags: mac
---

ローカルで動かしている自分用のアプリにアクセスしたらデータが全く取得できなくなっていた。
原因を調べたら、とりあえずmysqlが動いてないことが分かり、そりゃデータは取れない。
結局、mysqlが動かなくなったのは適当に実行した`brew upgrade`によってmysqlのバージョンが8.x.xから9.x.xに変わったことだったのだが、それにたどり着くまでに何をしたかのメモを残す。

がんばって`/opt/homebrew`以下を探して、`/opt/homebrew/var/mysql/hotoku-macmini-2020.lan.err`にログファイルを見つける。
このファイルの内容から、ver up関連であることが分かった。
エラーメッセージで検索すると [link](https://github.com/Homebrew/homebrew-core/issues/180063)にたどり着いた。
それによるとuninstall後にmysql@8.4をインストールすると動く、という情報があったのでtry・・するのだが、念の為データ本体をバックアップした。
データ本体は、``/opt/homebrew/var/mysql`の下にDB名のフォルダがあり、その中に`テーブル名.ibd`というファイルとして保存されている。
必要なDBのデータを別のフォルダにコピーしてから、以下を実行。

- brew uninstall mysql
- brew install mysql@8.4
- brew sevices start mysql@8.4

これによってmysqlが復活し、結果として、データ本体もユーザー情報（パスワードとか）のメタデータも壊れていないようだった。

[link](https://qiita.com/utamakura/items/12004d0d09f6749ae44b)によると、`.ibd`ファイルとテーブル定義情報（あるいは`.frm`ファイル）があれば復元可能とのことだが、今回は幸いにも必要なかったので試していない。
