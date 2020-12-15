---
layout: post
title: Bigquery Client
date: 2020-12-15 15:10:13 +0900
tags: python bigquery
---


クエリ実行

```python
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="~/.config/gcloud/legacy_credentials/ユーザー名/adc.json"

from google.cloud import bigquery

client = bigquery.Client(
    project=プロジェクト名,
    location=ロケーション
)

job = client.query("select 1")
```

データフレームで結果を取得
```python
job.to_dataframe()
```

処理量の確認
```python
job.total_bytes_processed
job.total_bytes_billed
```

dry run
```python
sql = "..."
job1 = client.query(
    sql,
    job_config=bigquery.QueryJobConfig(dry_run=True)
)
job1.total_bytes_processed
```
