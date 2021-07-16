---
layout: post
title: pipでGitHubプライベートレポジトリからインストールする
date: 2021-06-22 12:13:50 +0900
tags: pip python
---

requirements.txtに、

```
git+ssh://git@github.com/<user>/<repo name>@<version>
```

を書く。

当たり前だけど、そのマシンの公開鍵がGitHubに登録されていて、そのユーザーが該当のレポジトリにアクセス権があることが必要。
