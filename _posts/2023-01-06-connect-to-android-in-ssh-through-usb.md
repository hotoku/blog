---
layout: post
title: androidスマホにUSB経由でssh接続
date: 2023-01-06 15:25:19 +0900
categories: blog
tags: android
---

androidスマホの中からたくさんのデータをMacに転送したい。
ちょっとした量ならば、android file transferで十分なんだけど、長時間繋ぎっぱなしにしてたら、何らかの原因で途中で失敗したりしていた。
で、リカバリが面倒なので、ssh経由でrsyncを使いたいと思ったのでやり方を調べた。

1. adbをインストールする
   2. android studioをインストール
   3. adbの場所を調べる
      4. Preferences→Android SDK→Android SDK Locationに書いてある
      5. /Users/hotoku/Library/Android/sdk/adb だった
6. androidでUSBデバッグを有効にする
   7. 設定の中から「ビルド番号」を探して、何回も連続でタップする
   8. 開発者向けオプションからUSBデバッグを有効化する
1. デバイスの接続を調べる
   2. `adb devices`: `list of devices attaced`の下に何か表示されてればOK
1. androidでsshサーバーを立てる
   2. SimpleSSHDをインストール→起動
   3. 2222ポートでsshdが待ち受ける
1. ポートフォワードを設定する
   2. `adb forward tcp:10022 tcp:2222`: Macの10022が、androidの2222につながるようになる
1. ファイルを転送する
   2. `rsync -av -e 'ssh -p 10022' 127.0.0.1:/転送元のパス /転送先のパス`
   3. これを実行すると、パスワードを聞かれる。スマホのSimpleSSHDの画面にパスワードが表示されているので、入力する
