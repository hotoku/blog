---
layout: post
title: nginxとreactとflaskのアプリを公開する
date: 2023-07-01 10:08:20 +0900
categories: blog
tags: react nginx flask
---

手順だけメモ

- [x] nginxのインストール: sudo apt install -y nginx
- [x] ufwの設定 sudo su - でrootになってからやる
  - ufw disable # sshが切れちゃうかもなので、一時的に無効化
  - ufw default deny incoming # 内向きの接続を、まずは全部不許可
  - ufw default allow outgoing # 外向きは、全部許可
  - ufw allow ssh # sshを許可
  - ufw allow 'Nginx Full' # http, httpsを許可. これは、nginxのインストール後に実行する必要(たぶん)
  - ufw enable
- [x] DNSの設定
- [x] ブラウザで、http://example.hotoku.info にアクセス → nginxのwelcomeが見える
- [x] アプリのレポジトリをclone
- [x] clientのビルド: npm i && npm run build
- [x] /var/www/example作成 → パミ変更 sudo mkdir -p /var/www/example; sudo chmod o+w /var/www/example
- [x] clientの生成物をデプロイ build以下を/var/www/exampleにコピーする
- [x] /etc/nginx/sites-available/example.hotoku.info作成 → sites-enabledにリンクを張る, rootを/var/www/exampleに設定
- [x] configのチェック sudo nginx -t
- [x] nginx再起動 sudo systemctl restart nginx.service
- [x] ブラウザで、http://kintai.hotoku.info にアクセス → アプリの空の画面が見える
- [x] certbotインストール sudo apt install python3-certbot-nginx
- [x] SSL証明書をインストール: certbotにお任せ sudo certbot --nginx -d example.hotoku.info
- [x] ブラウザで、https://kintai.hotoku.info にアクセス → アプリの空の画面が見える
- [x] basic認証を入れる
  - sudo apt-get install apache2-utils # pluginを入れる
  - sudo htpasswd -c /etc/nginx/.htpasswd heyjude
- [x] example.hotoku.info にbasic認証設定を追加
- [x] sudo nginx -t
- [x] sudo systemctl restart nginx.service
- [x] ブラウザで、https://kintai.hotoku.info にアクセス → 認証を求められる
- [x] アプリサーバーstart python -m example_server server
- [x] /etc/nginx/sites-available/kintai.hotoku.info編集 → location /api, /graphqlを追加. basic認証も追加
- [x] sudo nginx -t
- [x] sudo systemctl restart nginx.service
- [x] ブラウザで、https://kintai.hotoku.info にアクセス → データが見える

```
# -*- mode: nginx -*-

server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/example;
        index index.html index.htm index.nginx-debian.html;

        server_name example.hotoku.info;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

```
    location / {
        auth_basic "Restricted";                   # 認証時に表示されるメッセージ
        auth_basic_user_file /etc/nginx/.htpasswd; # .htpasswdファイルのパス
    }

```

```
    location /api {
        auth_basic "Restricted";                   # 認証時に表示されるメッセージ
        auth_basic_user_file /etc/nginx/.htpasswd; # .htpasswdファイルのパス
        proxy_pass http://localhost:20090;
    }
```
