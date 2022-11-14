---
layout: post
title: graphql入門その2
date: 2022-11-15 07:03:05 +0900
tags: graphql
---

入門したは良いが、いざ自分のアプリを作ろうと思ったら「あれ？」となったので、もう少し噛み砕いたメモを残す。

## 問題例

たとえば、何かのチームとメンバーの管理をするようなAPIを考えてみる。ごくシンプルに

- チームが複数ある
- チームにはユーザーが複数所属する
- 各ユーザーは、ちょうど1つのチームに所属する

くらいの典型的な要件だけ考えておく。

## RESTでの例

とりあえず下のようなER図で表現されるテーブルたちが必要になる(todo: mermaidを描画する)

``` mermaid
erDiagram
  Team ||--o{ User : contains
  Team {
    int id pk
    string name
  }
  User {
    int id pk
    string name
    int teamId fk
  }
```

REST APIであれば、とりあえず`GET /user/:id`とか`GET /team/:id`とかがまず用意されるだろう。
その上で、「ユーザーが所属するチームを知りたい」とか「チームに所属するユーザーを知りたい」というアプリ側の要件に合わせてサーバー側のエンドポイントを設計していくことになる。
ここにRESTの典型的なペインがあって、基本的には、アプリ側の要件に合わせてサーバー側のエンドポイントを増やす必要が出てきてしまう。
あるいは、シンプルなAPIだけ用意しておいてアプリ側で必要なだけ問い合わせを組み合わせることもできるが、知りたい情報の種類に合わせてロジックの実装が増加していくという点で本質的には同じことである。

## GraphQLでは

GraphQLでは、以下のようなスキーマを登録しておくだけで、アプリ側で欲しい情報を組み合わせたクエリを自由に構築し問い合わせることが可能になる。

```graphql
type User {
  id: Int
  name: String
  team: Team
}
type Team {
  id: Int
  name: String
  users: [User]
}
type Query {
  getUser(id: Int!): User
  getTeam(id: Int!): Team
}
```

### クエリの例
**id 1のユーザーの名前が知りたい**
``` graphql
query {
  getUser(id: 1) {
    name
  }
}
```

**id 1のユーザーの名前と所属するチーム名が知りたい**

``` graphql
query {
  getUser(id: 1) {
    name
    team {
      name
    }
  }
}
```

**id 1のユーザーの名前と所属するチーム名と、そのチームに所属するユーザーの名前が知りたい**

``` graphql
query {
  getUser(id: 1) {
    name
    team {
      name
      users {
        name
      }
    }
  }
}
```

上のように、必要な情報粒度に合わせて、アプリ側で任意にオブジェクトの階層をたどることができる。
その際に、API側で新たなロジックを実装する必要はない。リクエストに応じて必要な情報をたどる部分は、QraphQLがよしなにやってくれるからだ。
便利。

## 仕組み

GraphQLのクエリは、任意の深さにネストさせることができる(原理的には。当然パフォーマンスや資源の問題はある)。
このように、潜在的に無限に続く可能性がある(事前にどこまで展開すれば良いんかを決めておくことができない)データ構造を扱うには遅延評価をすれば良い。
そして、遅延評価はクロージャがあれば簡単に実装できる ([参考][sicp])。GraphQLでは、この遅延評価のためのクロージャのことをResolverと呼んでいる。
上の例では、以下のような`UserResolver, TeamResolver`型と、それらを返す`getUser, getTeam`関数を実装する。

``` typescript
type TeamResolver = {
  id: number;
  name: string;
  users: () => Promise<UserResolver[]>;
};

type UserResolver = {
  id: number;
  name: string;
  team: () => Promise<TeamResolver>;
};

export async function getUser(args: { id: number }): Promise<UserResolver> {
  const user = await userLoader.load(args.id);
  return {
    id: args.id,
    name: user.name,
    team: async () => getTeam({ id: user.teamId }),
  };
}

export async function getTeam(args: { id: number }): Promise<TeamResolver> {
  const team = await teamLoader.load(args.id);
  return {
    id: args.id,
    name: team.name,
    users: async () => Promise.all(team.userIds.map((id) => getUser({ id }))),
  };
}
```

ここで、`TeamResolver.users`や`UserResolver.team`の型が、値ではなく関数になっているのがポイントである。
GraphQLインタプリタは、クエリから要求されているオブジェクトを作成するが、その際に要求されているプロパティのリゾルバだけを実行する。
これによって、任意の深さにネストしたクエリへの対応を実現することができる。

<!-- link -->
[sicp]: https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/full-text/book/book-Z-H-24.html#%_sec_3.5
