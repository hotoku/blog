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

以下は、

- https://zenn.dev/kumanorihjkl/articles/451194636eb0eb#wireguard%E8%A8%AD%E5%AE%9A
- https://qiita.com/kniwase/items/52d45d618edccbb914ca#%E8%A8%AD%E5%AE%9A%E3%81%AE%E7%94%9F%E6%88%90

を参考に進める。

[2023-10-23 18:27:28]

サーバー側の設定を生成して、サーバー側でデーモンが起動するところまでは確認済み。

クライアント側の設定が訳分からんちなりそうなので、サーバーを落として、OSクリーンインストールするところから再実行しても良さげ。17:13頃に作業始めたので、ここまで、1時間強。

## mac appについて [2023-10-23] 現在

- 公式の案内は、app storeから
  - `it is currently undergoing rapid development`らしい
- Homebrew
  - `wireguard-go`
  - `wireguard-tools`というformulaeがある↑のcaskはない

👉 AppStoreから手でインストールするのが良さす
