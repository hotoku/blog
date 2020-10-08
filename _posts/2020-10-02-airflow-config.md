---
layout: post
title: Airflowの設定項目
date: 2020-10-02 16:25:48 +0900
categories: airflow
---

デフォルト設定のまま使っていたAirflowのBackfillに時間がかかって困ったので、並列度を上げるパラメータを調べた。

`~/airflow/airflow.cfg`に設定ファイルがあるので、それを眺めると・・次あたりが関係ありそうか。


## parallelism
> The amount of parallelism as a setting to the executor. This defines
> the max number of task instances that should run simultaneously
> on this airflow installation

## dag_concurrency
> The number of task instances allowed to run concurrently by the scheduler


## max_active_runs_per_dag
> The maximum number of active DAG runs per DAG
