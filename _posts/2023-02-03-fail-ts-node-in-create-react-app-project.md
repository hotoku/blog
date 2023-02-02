---
layout: post
title: create-react-appのプロジェクト内でts-nodeが立ち上がらない
date: 2023-02-03 06:52:54 +0900
categories: blog
tags: react
---

掲題の通り。

```shell
<repl>.ts:1:1 - error TS1208: '<repl>.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.
```

というエラーが出てた。書いてある通りなので、このオプションを無効にする。起動引数で`tsconfig.json`を上書きするには、`-O`オプションを渡す

```shell
npx ts-node -O '{"isolatedModules: false"}'
```

追記

↑これで起動するかと思ったら、結局エラーが出てダメだったよ。
