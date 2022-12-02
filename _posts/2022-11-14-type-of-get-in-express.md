---
layout: post
title: expressのgetの型パラメータ
date: 2022-11-14 08:51:44 +0900
tags: teypscript
---

[参考][mark abeto]

``` typescript
app.get<Params,ResBody,ReqBody,ReqQuery,Locals>('/path',
(req,res) => {

})
```

expressでrouteを設定するときには、上のようなコードを書く。

- `Params`: urlの動的に変わる部分
- `ResBody`: レスポンスの本体
- `ReqBody`: リクエストの本体
- `ReqQuery`: リクエストのurlパラメータ

多分

<!-- link -->
[mark abeto]: https://dev.to/macmacky/get-better-with-typescript-using-express-3ik6?utm_source=pocket_saves
