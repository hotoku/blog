---
layout: post
title: graphql入門
date: 2022-11-12 09:11:43 +0900
tags: graphql
---

GraphQLを学びだしたのでメモ。

細かいことは、[公式][公式]を見れば良いので大まかな流れを書いておく。

## 概要

GraphQLのQLはQuery Language。つまり、Graph QLは「言語」である。Graph QLの中では「スキーマ言語」と
「クエリ言語」の2種類が定義されている。

スキーマ言語によって、

- どのようなクエリが許されるか
- その結果、どのようなオブジェクトが返ってくるか

が記述される。基本的に、返ってくるオブジェクトはJSONでシリアライズされることが想定されている。

あくまで「言語」の定義なので、それが具体的に何を使って、どうやって実装されているかは定義とは独立である。
実際、JS/TSを始めとしてPythonやGoなどの実装が公式では紹介されている。

## サンプル

たとえば下のようなスキーマを考えてみる。

```
type RandomDie {
  numSides: Int!
  rollOnce: Int!
  roll(numRolls: Int): [Int]
}

type Query {
  getDie(numSides: Int): RandomDie
}
```

まず最初に`RandomDie`という名前の型が定義されている。
クエリとしては`getDie`という名前のエンドポイントが用意されており、
こいつがRandomDieを返すことがわかる。

このスキーマを実装したサーバーには、たとえば以下のようなクエリを投げることができる。

```
{
  getDie(numSides: null) {
    roll(numRolls: 10)
    x: roll(numRolls: 10)
    y: roll(numRolls: 20)
  }
}
```

ポイントは以下のようなところである。

1. `getDie`に引数を渡している。ここに与えられた値から、サーバーはオブジェクトを生成する。例ではnullが渡されており、サーバー側でデフォルト値を埋めてくれることを期待している
1. `getDie`で生成された`RandomDie`オブジェクトの中から、参照したいプロパティ/メソッドを指定している
1. `roll`メソッドを複数回にわたって呼んでいる。さらに`x: roll`などによって別名を付けている

リクエストにパラメータを渡すのはRESTでもパラメータやフォームを使って可能だが、それ以上に複雑なことは基本的にはできない。
この辺に、Graph QLの嬉しさがある。

## TypeScriptでの例

上のスキーマを実装したexpressサーバーの例を貼っておく

```typescript
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import * as portfinder from "portfinder";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));

class RandomDie {
  numSides: number;
  constructor(numSides: number) {
    this.numSides = numSides;
  }
  rollOnce(): number {
    return 1 + Math.floor(Math.random() * this.numSides);
  }
  roll({ numRolls }: { numRolls: number }): number[] {
    const ret = [] as number[];
    for (let i = 0; i < numRolls; i++) {
      ret.push(this.rollOnce());
    }
    return ret;
  }
}

const schema = buildSchema(`
type RandomDie {
  numSides: Int!
  rollOnce: Int!
  roll(numRolls: Int): [Int]
}

type Query {
  getDie(numSides: Int): RandomDie
}`);

const root = {
  getDie: ({ numSides }: { numSides: number | undefined }) => {
    return new RandomDie(numSides || 6);
  },
};

(async () => {
  const port = await portfinder.getPortPromise({
    port: 3000,
  });
  console.log("port =", port);
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  );
  app.listen(port);
})();

```

<!-- link -->
[公式]: https://graphql.org/learn/queries/
