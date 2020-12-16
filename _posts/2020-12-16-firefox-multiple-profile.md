---
layout: post
title: firefoxのプロファイルを複数使う
date: 2020-12-16 11:36:21 +0900
tags: firefox mac
---

## プロファイルの作成

- [プロファイル管理ページ](about:profile)を開く
- `/Applications/Firefox.app/Contents/MacOS/firefox-bin --profilemanager`を実行する

などで、新しいプロファイルを作れる

## 指定したプロファイルで開くアプリケーションを作る

1. script editor.appを開く
2. `do shell script "/Applications/Firefox.app/Contents/MacOS/firefox-bin -P profileName"`を記述
3. 「アプリケーション」として適当な場所に保存
4. 保存した場所をエディタで訪問、`Contents/info.plist`を開く

```
<key>LSRequiresCarbon</key>
<true/>
```
の下に
```
<key>LSUIElement</key>
<string>1</string>
```
を追加。

[参考](http://web.archive.org/web/20100717003457/http://spf13.com/feature/managing-firefox-profiles-os-x)
