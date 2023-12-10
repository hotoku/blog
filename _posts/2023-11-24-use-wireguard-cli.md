---
layout: post
title: WireGuardをCLIで使う
date: 2023-11-24 10:36:16 +0900
categories: blog
tags: network, mac
---

外出先から自宅のマシンにつなげるために、さくらVPSにWireGuardのサーバーを入れて使っている。
クライアントたる自宅のMacからは、App StoreからWireGuardのGUIアプリをインストールして利用していたのだが、こいつの具合が悪く、勝手に接続が切れてしまうという現象が頻発している。
調査できてないので原因は不明だが、Mac上で動くクライアントとして`wireguard-go`というCLIツールがhomebrewでインストールできるので、こいつを試してみた・・ときの設定手順をメモ。

参考リンク: https://blog.scottlowe.org/2021/06/22/making-wireguard-from-homebrew-work-on-an-m1-mac/

上の記事によると、当時は不具合があって一部のスクリプトのパスを書き換える必要があったようだが、現在は修正されているようであった。

- `brew install wireguard-go wiregurad-tools` インストール
- `cd /opt/homebrew/etc/wireguard` 設定を保存するディレクトリに移動
- `umask 077` ファイル作成時のデフォルトのパーミッションを変更
- `wg genkey | tee privatekey | wg pubkey > publickey` 秘密鍵・公開鍵を作って保存

以下のような設定ファイルを作り、`/opt/homebrew/etc/wireguard/wg0.conf`で保存。

```
[Interface]
PrivateKey = <秘密鍵>
Address = <このマシンのVPN内でのIPアドレス>

[Peer]
PublicKey = <サーバーの公開鍵>
Endpoint = <サーバーのWANでのIPアドレス>:<ポート>
AllowedIPs = <サーバーのVPN内のIPアドレス>
PersistentKeepalive = 25
```

- ポートは51820
- サーバーにログインして、`wg set wg0 peer <クライアントの公開鍵> allowed-ips <クライアントのVPN内でのIPアドレス>`を実行
- `wg-quick down wg0`, `wg-quick up wg0`でネットワークインターフェイスを再起動

このあと、クライアント側でも、`wg-quick up wg0`を実行→これで、つながるようになった。
