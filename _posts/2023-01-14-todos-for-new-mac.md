---
layout: post
title: 新しいMacを買ったときにやったこと
date: 2023-01-14 09:46:35 +0900
categories: blog
tags: life
---

次に新しいましんを買った時のためにメモしておく。途中からメモを撮り忘れているところもあると思うので完璧ではない。

- トラックパッドの設定
  - タップでクリックに
  - ３本指でドラッグ: なんでこの設定がアクセシビリティにあるのか・・
- Terminalの設定
  - 起動コマンド
  - 外観: srceryから、mac terminalなくなった・・？
- homebrewのインストール
  - homebrewにpathを通す: インストール後に、メッセージで方法が表示される
  - 古いマシンでbrew listを実行して、それらを全部インストール
- キーボードショートカット
  - ⌘ + ^ + SpaceでSpotlight
  - better snap tool:
- ssh鍵の登録
- mypsの鍵ファイルをコピー
- データをrsync: `rsync -e ssh hotoku@ホスト フォルダ/ フォルダ` こんな感じ
  - firefoxのprofile: ~/Library/Application Support/Firefox 辺りにあった
  - ~/projects
