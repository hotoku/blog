---
layout: post
title: gcpでpytorchのinstance
date: 2022-12-02 11:30:56 +0900
tags: gcp
---

GCPでサクッとpytorchが入ったGPUインスタンスを立てる。

https://cloud.google.com/deep-learning-vm/docs/pytorch_start_instance?hl=ja#without_gpus

これが楽。jupyterも認証付きで立ててくれる（ようにするオプションがある。GUIでポチポチするときにチェックすればOK）。

Jupyterに接続するには、

https://console.cloud.google.com/dm/deployments

から該当のインスタンスをクリックすると、その先に接続方法が書いてある。
