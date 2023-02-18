---
layout: post
title: kintaiを書いてる時に考えていること
date: 2023-02-19 07:25:18 +0900
categories: blog
tags: react
---

## フロントエンドでのWorkHourの作成と編集

編集中のWorkHourオブジェクトは、一部の値が設定されてないかもしれない。
reactでは、この状態のオブジェクトを、useStateで、どっかに持っとかないといけない。
このuseStateの型パラメータに、WorkHourを指定すると型エラーになる。
なぜなら、編集中は、一部の値がまだ設定されてないこともあるから。
なので、元のWorkHourで必須になっているもの全てをoptionalにした型を別途作った。
ただ、当初は、dealsページからの追加しか想定してなく、その場合はdealIdは自動で決まるのでdealIdだけはrequiredのままだった。
で、これが以下の2点で設計ミスだったなと思う。

1. dealsページ以外から追加する場合に使いまわせない: 今回、weekページを作ったんだけど、そっからもworkhourを追加したくなった。この時、weekページではdeal idは自動では決まらないので、dealsページ用に作った編集用の型は使えなかった
2. 別の型を手で定義するのは効率的でない: TypeScriptには、型を変換する便利な奴らがいる[(link)][ichinari]。これを使って、編集用には全フィールドをoptionalにした型を利用する。型のレベルでの担保は、そのレベルにしておいて、それ以上のバリデーションは実行時に値に基づいて行なった方が良さそう

<!-- link -->
[ichinari]: https://ichinari.work/TypeScript_20220120/
