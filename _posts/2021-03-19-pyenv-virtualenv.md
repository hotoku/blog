---
layout: post
title: pyenv virtualenv
date: 2021-03-19 18:12:29 +0900
tags: python
---

## pyenvとvirtualenv
- pyenv: 1つのシステムに、複数verのPythonを入れる
- virtualenv: プロジェクトごとに異なる環境を用意する

## pyenvの基本的な使い方

- `pyenv versions`: インストール済みのバージョンを表示
- `pyenv install <version>`: 特定のバージョンをインストール
- `pyenv global <version>`: グローバルにバージョンを変更
- `pyenv local <version>`: localにバージョンを変更

## virtualenvをpyenvと一緒に使う

1. インストール: `brew install pyenv-virtualenv`
2. 設定: `eval "$(pyenv init -)"`. ~/.bash_profileなどに書いておく
3. 新しい環境を作る: `pyenv virtualenv <version> <name>`. `<name>`という名前のversionができる
4. 環境を切り替える: `pyenv local <name>`
