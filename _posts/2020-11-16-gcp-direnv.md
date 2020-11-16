---
layout: post
title: GCPを使う時のdirenvの設定
date: 2020-11-16 14:37:19 +0900
tags: gcp
---


``` shell
export GOOGLE_APPLICATION_CREDENTIALS=~/.config/gcloud/legacy_credentials/<user name>/adc.json
export GCLOUD_PROJECT=<project name>
gcloud config set project ${GCLOUD_PROJECT}
```


configのパスは、思いっきり`legacy`て書いてあるので、より良い方法があるのかもしれない
