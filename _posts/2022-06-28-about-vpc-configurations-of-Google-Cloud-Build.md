---
layout: post
title: Google Cloud BuildのVPC設定
date: 2022-06-28 09:07:52 +0900
tags: gcp
---

Google Cloud BuildでVPCを使う設定について調べたのでメモ。
参照したドキュメントは[これ](https://cloud.google.com/build/docs/private-pools/use-in-private-network)

まず、Private Poolの概要として[これ](https://cloud.google.com/build/docs/private-pools/private-pools-overview)を見る。

とりあえず、Private Poolは、Cloud Buildの１機能っぽい（ドキュメントがCloud Buildの配下にあるので）。
Poolとは、ビルドで使うworkerの集まり（ほげほげをプールする、というプール。適当な日本語が分からん）。
適当にビルドを実行するとDefault Poolの中でビルドされる。
マシンタイプなどなど、ビルドに使うリソースのカスタマイズは、default poolの範囲では制約があるぽい。

{% include figure.html url="/assets/img/gcb_diff_pool.png" description="default poolとprivate poolの違い" %}

private poolは、GCPプロジェクトの中に作成されるフルマネージドのリソース。
IAMを使って、プロジェクト外からビルドを起動したり、ビルド中に他のプロジェクトを参照したりもできる。

private poolは、Googleが保有するservice producer netowrk（これは、VPC）の中でホストされる。
ビルド中にプライベートなリソースにアクセスするには、VPCを作成し、このVPCと上記のservice producer netowrkの間をつなぐ。

{% include figure.html url="/assets/img/ex_gcb_private_pool_network.png" description="Private poolからプライベートなリソースにアクセスする例" %}
