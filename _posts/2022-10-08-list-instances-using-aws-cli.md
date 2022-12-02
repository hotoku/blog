---
layout: post
title: aws cliでインスタンスIDを一覧する
date: 2022-10-08 12:02:14 +0900
tags: aws
---

これでIDを一覧にできる

``` shellsession
aws ec2 describe-instances --region us-east-2 --profile sciseed | jq -r ".Reservations[].Instances[0].InstanceId"
```

名前を一覧するなら

``` shellsession
aws ec2 describe-instances --region us-east-2 --profile sciseed | jq -r '.Reservations[].Instances[0].Tags[] | select(.Key == Name).Value'
```

`jq`の使い方はナカナカおぼわらんなぁ、けど、そんなに使うことないからいっか・・とか思ってたけど、こういうときは便利だから少しずつ覚えよう

多分ポイントは

- `配列[]`で、配列の要素全部を取ってこれる
- `select`つうフィルターの使い方

あたりかな
