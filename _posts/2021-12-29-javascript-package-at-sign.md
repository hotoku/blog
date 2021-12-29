---
layout: post
title: JavaScriptパッケージの@の意味
date: 2021-12-29 09:55:34 +0900
tags: javascript
---

JSで `require("@hoge/fuga")`みたいにパッケージ名に`@`が入っているときがあるが、あれ、何じゃろと思ったので調べた。

例によって[StackOverflow](https://stackoverflow.com/questions/36293481/use-of-symbol-in-node-module-names?utm_source=pocket_mylist)から、回答を見つけて[公式](https://docs.npmjs.com/misc/scope)の該当場所を読むと、

> Scopes are a way of grouping related packages together, and also affect a few things about the way npm treats the package. Each npm user/organization has their own scope, and only you can add packages in your scope. This means you don’t have to worry about someone taking your package name ahead of you. Thus it is also a good way to signal official packages for organizations.

とのこと。パッケージオーナーごとに名前空間を分けておくという用途らしい。
