---
layout: post
title: cloudrunでIAPを使う
date: 2022-04-20 10:34:30 +0900
tags: gcp
---

Google Cloud Runで、サービスへのアクセスを制限したい・・とする。
Googleの他のサービス（PubSubとか）からリクエストする場合には、それらサービスのサービスアカウントに適切なIAMパーミッションを付与すれば良い。
一方で、HTTPSでアクセスする場合には、何らかの手段でユーザーを認証する必要がある。
で、この場合にも、リクエスト元が内部ユーザーの場合には、IAPという仕組みで行けるらしい。
というような話が、以下のドキュメントに書いてある。
これは、後者のドキュメントを読んだときのメモ。

- [Authenticating users (cloud runのドキュメントの一節)](https://cloud.google.com/run/docs/authenticating/end-users)
- [Enabling IAP for cloud run](https://cloud.google.com/iap/docs/enabling-cloud-run)

## IAPとは

Identity Aware Proxy。誰がアクセスしているのかを気にするプロキシ・・てイメージかな。

[link](https://cloud.google.com/iap)を読んで見る。

- ユーザーを識別できます、しかもそのアクセス権を中央集権的に管理できます
- 信頼のないネットワークからでもVPNを使わずにリモートワークできます
- zero-trustアクセスモデルを実装できます

と書いてある。典型的な利用例は、zero-trustネットワークとかリモートワークとかなんかね。
要はCloud Runへのアクセスを守りたいというニーズと同じっちゃ同じなんだな。

## IAP Overview

[link](https://cloud.google.com/iap/docs/concepts-overview)

- [signed header](https://cloud.google.com/iap/docs/signed-headers-howto)つうもので認証するらしい
- IAPで守られたアプリには、適切なIAM roleを持ったプリンシパル（≒ユーザー）だけがプロキシを通してアクセスできる

### 認証
- IAPで守られたリソースにApp EngineやCloud Load Balancing経由でアクセスすると、アクセス先のリソースの情報などがIAPに送られる
- IAPは、ヘッダやCookieの認証情報を見ようとする。なければ、OAuth2.0のサインインフローにリダイレクトする
- IAPは、得られた認証情報を使って、IAMを参照し、ユーザーがアクセス権を持っているかどうかを確認する

こういう抜け道があるらしい。
- 自動で割り当てられたURL（最初に`gcloud run deploy`したときに設定されるやつ）にアクセスできる場合は、IAPをbypassできちゃう
  - ingress controlで、load balancerを使うように制限できるが、適切に設定が必要

### 認可

- IAPは、ユーザーが適切な権限を持っているかを、IAMポリシーを適用してチェックする
  - `IAP-secured Web App User `というロールを持っていれば良い

## Enabling IAP for cloud run

[link](https://cloud.google.com/iap/docs/enabling-cloud-run#gcloud)

ここみると、

> Configure the Cloud Run service and set ingress to Internal and Cloud Load Balancing. See Restricting ingress for Cloud Run for details.

と書いてある。つまり、内部からのアクセスはOKと思えるなら、Cloud Run側で`Restricting ingress`だけやっとけば良さそう。

## Restricting ingress for Cloud Run

ingress settingsの種類として

- All
- Internal
- Internal and Cloud Load Balancing

の3種類があるぽい。で、インターネットに公開するわけではなければInternalで良いのでは。
