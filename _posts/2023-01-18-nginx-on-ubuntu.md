---
layout: post
title: ubuntuにnginxサーバーを立てる
date: 2023-01-18 13:48:13 +0900
categories: blog
tags: linux
---

参考

- [nginxのインストール](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04)
- [証明書のインストール](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04)
- [basic認証](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/)

## nginxのインストール

aptでインストールすればOK

```
sudo apt update
sudo apt install nginx
```

## ファイアウォールの設定

- ufwコマンドを使う
- Nginx HTTP or Nginx HTTPSをallowする
- OpenSSHもallowしとかないと、あとでsshできなくなるので注意

```
sudo ufw app list # Nginxのエントリがあることを確認
sudo ufw allow "Nginx HTTP"
sudo ufw allow "OpenSSH"
sudo ufw enable
sudo ufw status # 対象のエントリが活きていることを確認
```

## nginxの設定ファイルの調整

`inctore`は、適宜、ドメイン名に置き換える

- ファイル置き場の作成 `/var/www/inctore/html`
- ファイルの作成 `/var/www/inctore/html/index.html`
- 設定ファイルを作成 `/etc/nginx/sites-available/inctore`ファイルを作り、`server`ディレクティブを書く
- 設定ファイルをリンク `/etc/nginx/sites-enabled/inctore`に、上のファイルのシンボリックリンクを置く
- `/etc/nginx/nginx.conf` の`server_names_hash_bucket_size 64;`を有効にする
- `nginx -t`で設定ファイルの文法チェック
- `systemctl restart nginx` でnginx再起動

ここまでで、httpでアクセスできるはず

## 証明書のインストール

- snapでcertbotをインストールする
  - `sudo snap install core; sudo snap refresh core`
  - `sudo apt remove certbot`
  - `sudo snap install --classic certbot`
  - `sudo ln -s /snap/bin/certbot /usr/bin/certbot`
- ファイアウォールの調整
  - `sudo ufw delete allow 'Nginx HTTP'`
  - `sudo ufw allow 'Nginx Full'`
- certbotで証明書をインストール
  - `sudo certbot --nginx -d viewer.inctore.com`
