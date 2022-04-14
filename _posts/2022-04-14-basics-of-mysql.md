---
layout: post
title: mysqlの基本操作
date: 2022-04-14 21:25:17 +0900
tags: mysql
---

### パスワードのポリシーを設定する

```shell
$ mysql_secure_installation
```

### パスワードを使ってログイン

```shell
$ mysql -u <username> -p
```

### ユーザーを作る

```sql
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
```

mysqlは、ユーザーの名前とアクセス元のホストの情報でユーザーを識別するらしい。
ホスト名はワイルドカードにすることも可能。
テスト用に使う分には、全部localhostで良いかな。

### ユーザーに権限を与える

```sql
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
```
