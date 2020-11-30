---
layout: post
title: bigquery partitioned table
date: 2020-11-30 10:44:36 +0900
tags: bigquery
---

## partitioned table
patitinoned tableは、`partition`に分割されている特殊なテーブル。

データが分割されていることで、クエリのパフォーマンスやスキャン量（=コスト）を調整できる。

partitionは、以下3種類のやりかたで作成できる。

- ingestion time: レコードのロード時刻
- date/timestamp/datetime型の列
- integer型の列

[ドキュメント](https://cloud.google.com/bigquery/docs/creating-column-partitions)

## clustered table
特定の列について、近い値が同じ場所に保存されるように調整されたテーブル。

partitionedの有無に関わらず使える。

clusterする列は、以下のいずれかの型である必要がある。

- date
- bool
- geography
- int64
- numeric
- string
- tiemstamp

[ドキュメント](https://cloud.google.com/bigquery/docs/clustered-tables)
