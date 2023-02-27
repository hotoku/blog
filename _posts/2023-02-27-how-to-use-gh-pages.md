---
layout: post
title: gh-pagesの使い方
date: 2023-02-27 11:40:07 +0900
categories: blog
tags:
---

GitHub pages、というものを使うと、静的なサイトをサーバー管理の手間を取らずに配信できる。
このブログも、github pagesを使っている。

reactで構築したサイトをgithub pagesで公開するために便利なgh-pagesというnodeパッケージがあるので、使い方をメモ。

## package.jsonの編集。
`predeploy`, `deploy`, `build` をscriptsに用意する(create-react-appで作ってる場合は、`build`は定義されているはず)。
```json
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "build": "react-scripts build",
  }
```
また、`homepage`をトップに追加する。
```json
  "homepage": "https://www.hotoku.info/typing",
```

これで、`npm run deploy`を実行すれば、サイトが公開される。便利だ。

## URLについて

GitHub pagesでは、https://github.com/hotoku/hotoku.github.io のような`ユーザー名.github.io`という名前のレポジトリを作ると、その中身が自動で https://hotoku.github.io というURLで公開される(自動で・・・というか、何か追加で設定が必要だったかもしれない)。上のサイトが公開されている状態で、https://github.com/hotoku/typing のようなレポジトリでGitHub pagesの設定をする(レポジトリのSettings→pagesとたどると設定ページがある)と、https://hotoku.github.io/typing というURLで個別レポジトリのページが公開される。

さらに、hotoku.github.io で設定を行うと(具体的にどうやるかは忘れた)、`hotoku.github.io`ではなく独自ドメイン`www.hotoku.info`を利用することができ、その設定があると、個別ページのURLも`www.hotoku.info/typing`などの独自ドメインが使える。
