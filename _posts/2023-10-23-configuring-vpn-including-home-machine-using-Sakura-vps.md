---
layout: post
title: さくらVPSで自宅マシンを含んだVPNを構成する
date: 2023-10-23 17:20:32 +0900
categories: blog
tags: unix
---

自宅のマシンに、VPN経由で外部から接続したくなった。さくらVPSにWireGuardを入れると安くできそうということで試してみた。

- さくらVPS契約。一番安い、メモリ512MBのVPSを購入
- ほとんど空の設定で起動
  - OSはubuntu 20.04 amd64
  - スタートアップスクリプト→なし
  - パケットフィルター設定→なし
  - 公開鍵は、手元のマシンのid\_rsa.pubをインストール
  - rootのパスワードでのログインは禁止
- 起動
- `ssh ユーザー名@<ipアドレス>`で接続確認

※ 以下、適宜、rootになるかsudoする必要あり

- sshのポートを変更する
  - 設定ファイル編集: `/etc/ssh/sshd_config`の中で`Port 10022`を指定
  - デーモン再起動: `sudo systemctl restart sshd`
  - 一旦ログアウト
  - ローカルから、22番でsshして失敗することを確認
  - ローカルから、10022番でsshして成功することを確認
- ファイアウォールの設定
  - `ufw status` → inactiveのはず
  - `ufw allow 10022/tcp` → これで、10022へのsshが許可される
  - `ufw enable && ufw status` → activeに変わり、10022/tcpが許可されているはず
  - 一旦ログアウト
  - ローカルから、10022番でsshして成功することを確認

ここまでで、一般の話はできた。

以下、wireguardの設定を行う。[参考link](https://serversideup.net/how-to-set-up-wireguard-vpn-server-on-ubuntu-20-04/)

## サーバー側の設定をする

※ 以下、適宜、rootになるかsudoする。

- インストール
  - `apt update, apt upgrade`
  - `cat /var/run/reboot-required` → 必要ならreboot
  - `apt install wireguard`
- 鍵生成
  - `mkdir -p /etc/wireguard/keys; wg genkey | tee /etc/wireguard/keys/server.key | wg pubkey | tee /etc/wireguard/keys/server.key.pub`
  - `/etc/wireguard/keys/server.key` が秘密鍵
  - `/etc/wireguard/keys/server.key.pub` が公開鍵
- デフォルトのネットワークインターフェースを探す
  - `ip -o -4 route show to default | awk '{print $5}'`: ここで出てきた名前を、後で使う
- 設定ファイルの構成
  - `/etc/wireguard/wg0.conf`に、以下の内容を書く

```
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = YOUR_SERVER_PRIVATE_KEY
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
SaveConfig = true
```

- `PrivateKey`は、さっき生成した秘密鍵を指定する
- `PostUp`, `PostDown`のインターフェース名(eth0)を、さっき調べたインターフェース名に置換
- パーミッションを設定
  - `chmod 600 /etc/wireguard/wg0.conf /etc/wireguard/keys/server.key`
- `wg-quick up wg0`: これで、wg0が有効化する
- `systemctl enable wg-quick@wg0`: リブート時に、自動でVPNサーバーが起動する
- フォワーディングを有効化する
  - `/etc/sysctl.conf`ファイルで、`net.ipv4.ip_forward=1`となっている行のコメントを外す
- `sysctl -p`: 上の編集を有効にする
- wireguard向けの通信を許可する: `ufw allow 51820/udp`
- 一応、FWを停止→起動: `ufw disable` → `ufw enable`

## クライアント側の設定をする

- AppStoreからwire guardのアプリをインストール
- 「空のトンネル」を作成
  - 鍵ペアが自動で作られる
  - 以下のような設定を記入して保存する

```
[Interface]
PrivateKey = abcdefghijklmnopqrstuvwxyz1234567890=+
Address = 10.0.0.3/24
DNS = 1.1.1.1, 1.0.0.1

[Peer]
PublicKey = YOUR_SERVER_PUBLIC_KEY
AllowedIPs = 0.0.0.0/0
Endpoint = YOUR_SERVER_WAN_IP:51820
```

- `Interface.Address`には、任意のアドレスを入れる。VPN内で一意になるように管理する
- `Peer.PublicKey`には、サーバーの公開鍵を入れる
- `Peer.Endpoint`には、サーバーのWAN側のIPアドレスを入れる
- サーバーにログインして、クライアントを登録する
  - `wg set wg0 peer クライアントの公開鍵 allowed-ips 上の設定に書いたクライアントのIPアドレス`

これで、VPN経由でインターネットにアクセスできるはず

## tips

- ネットワークインターフェースの停止: `sudo wg-quick down wg0`
- ネットワークインターフェースの開始: `sudo wg-quick up wg0`
