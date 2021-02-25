---
layout: post
title: deployment manager walk through
date: 2021-02-04 17:51:29 +0900
tags: gcp gcloud
---

[Deployment Manager Walkthrough](https://cloud.google.com/deployment-manager/docs/step-by-step-guide)を読んだときのメモ。

できるようになること

- 設定を作る
- リソースをデプロイする
- テンプレートを作る
- ヘルパースクリプトを作る



## configファイルの基本的な構成

```yaml
resources:
- name: xxx
  type: xxx
  properties:
    xxx: aaa
    yyy: bbb
```

`resources.type`は、リソースのタイプ。GCEインスタンスとかCloud SQLインスタンスとか。
GCEなら`compute.v1.instance`が入る。
`properties`には、APIで指定するのと同じ項目を指定する。


## リソースの作成と確認、削除

- 作成: `gcloud deployment-manager deployments create deployment-with-2-vms --config two-vms.yaml`
- リスト: `gcloud deployment-manager resources list --deployment deployment-with-2-vms`
- 詳細: `gcloud deployment-manager deployments describe deployment-with-2-vms`
- 削除: `gcloud deployment-manager deployments delete deployment-with-2-vms`

## reference

1つのdeploymentの中に複数のリソースが含まれており、その設定値が相互を参照するような場合、リファレンスを使う。

```yaml
resources:
- name: the-first-vm
  type: compute.v1.instance
  properties:
  # 中略
    networkInterfaces:
    - network: $(ref.a-new-network.selfLink)
      accessConfigs:
      - name: External NAT
        type: ONE_TO_ONE_NAT
# 中略
- name: a-new-network
  type: compute.v1.network
  properties:
    routingConfig:
      routingMode: REGIONAL
    autoCreateSubnetworks: true
```

上の`$(ref.a-new-network.selfLink)`のように、同じデプロイメントの中で作られる他のリソースを参照できる。

## template

1つのyamlファイルから、他の設定ファイルをインポートすることができる。
インポートされるファイルはテンプレートと呼ばれる。
テンプレートはpython or jinja2で書けるが、pythonが推奨。

### Python
globalに、`GenerateConfig` または `generate_config`という名前の関数を定義しておく（両方ある場合は`generate_config`が優先される）。

この関数には、`context`という引数が渡される。`context`には、プロジェクト名などのデータが含まれている。

## 多段階のimport
こんな感じで、テンプレートからの組み立て自体も、pythonのテンプレートにしてしまって、yamlからは1つのファイルだけを読み込むというテクニックが紹介されているが、ご利益はイマイチ理解していない。

これがyamlファイル
```yaml
imports:
- path: vm-template.py
- path: vm-template-2.py
- path: network-template.py
- path: firewall-template.py
- path: compute-engine-template.py

resources:
- name: compute-engine-setup
  type: compute-engine-template.py
```

これが`compute-engine-template.py`
```python
def GenerateConfig(context):
  """Creates the Compute Engine with network and firewall."""

  resources = [{
      'name': 'vm-1',
      'type': 'vm-template.py'
  }, {
      'name': 'vm-2',
      'type': 'vm-template-2.py'
  }, {
      'name': 'network-1',
      'type': 'network-template.py'
  }, {
      'name': 'firewall-1',
      'type': 'firewall-template.py'
  }]
  return {'resources': resources}
```


## プロパティと環境変数

テンプレートのプロパティには、任意の値を入れられる。
テンプレートからは、

```python
context.properties["name"]
```

という形でプロパティを参照できる。

プロパティの他にデプロイメントに固有の情報が事前に設定されている環境変数にもアクセスできる。

```python
context.env["name"]
```

環境変数の中には、

- プロジェクト名
- リソース名
- コンフィグレーションのタイプ←これは何か不明

などが含まれている。

プロパティの設定は、テンプレートを呼び出す際に

```python
def GenerateConfig(unused_context):
  resources = [{
      'name': 'the-first-vm',
      'type': 'vm-template.py',
      'properties': {
          'machineType': 'f1-micro',
          'zone': 'us-central1-f',
          'network': NETWORK_NAME
      }
  }]
  return {'resources': resources}
```

のように行うことができる。

## helper scripts

pythonのテンプレートの中では、他のモジュールをimportすることができる。
このとき、テンプレートの中で

```python
import common
```

をするのと同時に、yamlの中でも

```python
imports:
- path: common.py
```

をする必要がある。

## デプロイの更新

リソースを操作するAPIに、`patch`か`update`のメソッドがあれば、そのリソースを更新することができる。

更新するには、

1. yamlファイルを更新
2. `gcloud deployment-manager deployments update --config <new config yaml> `を実行
3. `gcloud deployment-manager deployments update`を実行

とする。

※ GCEのvmを更新した場合、

```bash
$ gcloud compute instances reset <インスタンス名>
```

で再起動できる。
