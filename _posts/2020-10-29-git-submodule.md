---
layout: post
title: git submoduleの使い方
date: 2020-10-29 14:35:16 +0900
tags: git
---

[マニュアル][manual]

## 新しく登録するとき

```
git submodule add https://github.com/<submoduleのurl> [レポジトリ内のパス]
```

これで、該当のパスにサブモジュールのレポジトリがcloneされる。

## サブモジュールを含んだレポジトリをクローンしたとき

2つのコマンドを実行する。

```
git submodule init
git submodule update
```

その他の使い方は、必要になったら調べる。


[manual]: https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%81%95%E3%81%BE%E3%81%96%E3%81%BE%E3%81%AA%E3%83%84%E3%83%BC%E3%83%AB-%E3%82%B5%E3%83%96%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB
