---
layout: post
title: クラウドのリソースを使って機械学習実験をやるときに学んだノウハウ
date: 2022-10-12 16:46:32 +0900
tags: aws gcp
---

最近、EC2上で音声認識モデルを学習・評価する仕事を行っている。
AWSは初めてで、音声認識モデルの事前学習のような大規模データを扱うのも初めて、という状態からスタートしたので、色々と細かい学びが多かった。
それを、ここに書き留めておく。書いたあとに見直すと、とくにAWSに限った話ではないな・・

## 作業者用のアカウントを作る

適当にEC2のインスタンスを建てると、デフォルトの`ubuntu`とかのユーザーで全員が作業するような構成にしちゃいがちなんだけど、そんなに面倒でもないので、利用者ごとにユーザーを分けといた方が何だかんだ良い。
やることは、

1. ユーザー用の鍵ペアを作成
2. ユーザーのパスワードを登録
3. ユーザーをsudo,dockerグループに追加
4. ユーザーの鍵ファイルを.ssh以下に配置
5. ユーザーのログインシェルを変更

という感じ。このポストの最後に、当時の作業記録(をところどころマスクしたもの)を貼っとくので次回作業時の参考になるかもしれない。そのままコピペして使ってはいけない。

## 大量データは専用のボリュームに置く

今回の事前学習では、ファイルが200万個弱、総容量で1TB超の音声データを扱った。
こういう巨大なデータは、コピーや移動するだけで、非常に時間がかかる。
S3-インスタンス間でコピーするだけで数日とか、べつのボリュームにコピーするだけで10時間とか、ザラにあった。

一方で、機械学習の実験プロジェクトなので、インスタンスをたくさん立てて並列に異なる条件の実験を進めたい。
こういうときに、必要データを入れたEC2のVolumeのスナップショットを作成し、インスタンスの起動時に、そのSnapshotからvolumeを作成→インスタンスにアタッチとすると、
データにアクセス可能な環境をスムーズに構築できた。起動中のボリューム→スナップショットの作成、や、スナップショットからボリュームの作成は、容量が大きくてもすぐに終わる。

ボリュームを扱うときに使ったコマンドのメモ

```shellsession
lsblk # アタッチされているデバイス一覧が見える
df # マウントされているデバイスが見える
mount /dev/<デバイスの名前> <マウント先のパス> # デバイスをマウント
umount <マウント先のパス> # デバイスをアンマウント
du # 各フォルダが、どれくらいの容量を消費しているかを表示 -d<n>でn階層だけ表示。-hで人間に読みやすい出力
```

## ユーザーの作成手順

#### 参考リンク
- [ユーザー追加][linux-user-add]
- [sudoに追加][sudo-add]
- [sshログイン設定][ssh-add]
- [ログインシェル変更][change-shell]
- [docker-add][docker-add]

鍵ファイルを作って公開鍵をサーバーにコピー

``` shellsession
ssh-keygen -t rsa -b 4096 -C <SSHの公開鍵ファイルに残すコメントを何か書く>
scp -i ~/.ssh/sciseed-jdsc-ohio.pem -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no my_user_name.pub ubuntu@<IPADDRESS>:/tmp
```

rootで作業

``` shellsession
sudo su -
useradd -m my_user_name # -m: ホームディレクトリを作成
passwd my_user_name # パスワードを作成

# グループに追加
usermod -G sudo,docker my_user_name
cat /etc/group | grep my_user_name # my_user_nameがsudo,dockerに入ってるかをチェック
```

`my_user_name`で作業

``` shellsession
su - my_user_name

# 鍵ファイルを配置
mkdir -p /home/my_user_name/.ssh
cp /tmp/my_user_name.pub /home/my_user_name/.ssh

# 権限を変更
chmod 700 /home/my_user_name/.ssh
chmod 600 /home/my_user_name/.ssh/*

# ログインシェルを変更
chsh -s /bin/bssh
```

<!-- link -->
[linux-user-add]: https://eng-entrance.com/linux-user-add
[ssh-add]: https://qiita.com/tattn/items/a03cbf7c185d7efa6769
[sudo-add]: https://webkaru.net/linux/sudo-user-add/
[change-shell]: https://qiita.com/tk1024/items/a1046ea540bb34644d31
[docker-add]: https://qiita.com/tifa2chan/items/9dc28a56efcfb50c7fbe
