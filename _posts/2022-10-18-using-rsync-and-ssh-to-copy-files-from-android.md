---
layout: post
title: rsyncとsshでandroidからファイルをコピー
date: 2022-10-18 08:11:15 +0900
tags: unix
---

Androidの中に入っているファイルをMacにコピーしたい。が、MacにSDカードのスロットがないので、ネットワーク越しにやりたい。
というときの手段を調べたのでメモ。

### AndroidでSSHDを立ち上げる
[SimpleSSHD][simplesshd]というアプリがあるので、それを起動する。
デフォルトでは、2222番ポートでsshdがlistenする。

#### 試しにsshで接続してみる
アンドロイド端末のipが画面に表示されるので、macから`ssh -p 2222 <ip address>`で接続する。
すると、パスワードを尋ねられる。SimpleSSHDの画面に一時的なパスワードが表示されるので、それをmac側で入力。
これで接続できるはず。ほしいファイルのパスがどこかなどを探る。
ブラウザでダウンロードしたファイルの場所は、`/sdcard/Download`にあった

### rsyncでコピーする。

``` shellsession
rsync -av -e 'ssh -p 2222' <ip address> <remote path> <local path>
```

これを入力するとパスワードを聞かれるので、SimpleSSHDの画面でパスワードを確認して入力する。
これで、同期が始まるはず。

<!-- link -->
[SimpleSSHD]: http://www.galexander.org/software/simplesshd/
