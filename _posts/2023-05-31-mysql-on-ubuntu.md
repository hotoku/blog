---
layout: post
title: mysqlをubuntuでセットアップしたときのメモ
date: 2023-05-31 15:27:27 +0900
categories: blog
tags: mysql
---

## ユーザーの設定

- apt update
- dotレポジトリのclone
- zshのインストール
  - apt install zsh
- shellの変更
  - sudo chsh -s $(which zsh) $(whoami)
- ohmyzshのインストール

## やったこと

- aptでインストール
- rootユーザーのパスワード変更
  - https://linuxhint.com/change-mysql-root-password-ubuntu/
  - 本当にこんな面倒なことやる必要あるんか
  - sudo mysqlでrootでログインできるぽい
