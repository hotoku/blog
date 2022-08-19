---
layout: post
title: 以外な理由で起こる不具合
date: 2022-08-18 17:57:55 +0900
tags: life
---

ネットで、たまに「意外な理由で起こるエラー」というタイプのネタを見かけることがある。
この手のものが好きなので、ここにまとめておこう。

## 500マイル以上離れた場所にメールが送れない

**ネタ元**

[本の虫: 500マイル以上離れた場所にメールが送れないのだが](https://cpplover.blogspot.com/2015/04/500.html)

**現象**

ある大学のシステム管理者が、教授から「500マイル以上離れた場所にメールが送れない」と相談される。んなわけないやろと思いつつ管理者が試すと、現象が再現する。
つまり、500マイル以内の相手にはメールが送れるが、それより遠い相手には送信が失敗する。

**理由**

メールサーバーとの通信をタイムアウトにするまでの時間が、意図せぬ要因で0秒に設定されてしまった（実際には3ms程度で接続が切れてしまうようになった）。
3msで光が進める距離が大体500マイルなので、それより遠いサーバーとは通信ができなくなってしまった。

## バニラアイスを買ったときだけエンジンがかからない

**ネタ元**

[Gigazine: バニラのアイスを買ったときだけ車のエンジンがかからなくなる不思議な現象、その原因は？](https://gigazine.net/news/20200511-vanilla-ice-allergic-car/)

**現象**

ゼネラルモーターズ(GM)に、「お店でバニラアイスを買ったときだけエンジンがかからない」という苦情が寄せられる。
んなわけないやろと思いつつエンジニアが実際に店舗に行って試すと、現象が再現する。
つまり、バニラアイスを買ってから車に戻るとエンジンがかからず、他のストロベリーやチョコレートのフレーバーの場合は問題なくエンジンがかかる。

**理由**

この店舗では、アイスは店の裏のケースに保管されていたが、バニラアイスだけは人気のため、店頭で保管されており、その結果バニラアイスだけは他と比べて素早く提供されていた。
つまり、運転手が店の駐車場についてエンジンを切ってからアイスの買い物を終えて再度エンジンをかけるまでの時間が、バニラアイスの場合だけ短くなった。
その結果、エンジンを再点火する際のガソリン温度がフレーバーによって異なっていた（バニラはすぐ受け取れるので温度が高く、他の場合は受け取りを待つ間に十分に温度が下がる）ため、バニラを購入したときだけエンジンがかからなかった。

## Aさんがお茶を淹れるときだけ会社のネットがつながらない

**ネタ元**

[togetter: 「中国人のAさんがお茶を淹れると会社のネットが繋がらなくなる」そんな訳ないと思いながら調べたら…まさかの日常ミステリー](https://togetter.com/li/1618067)

**現象**

あるオフィスで、Aさんが出社してお茶を淹れると、しばらくネットにつながらなくなるというトラブルが発生する。
んなわけないやろと思いつつエンジニアが観察すると、現象が再現する。
つまり、Aさんがお茶を淹れるとオフィスでネットにつながらなくなる端末が現れる。
しかも、

- 誰かが紅茶を淹れて皆でシェアしたときは大丈夫
- Aさんが自分用にお茶を淹れるとつながらなくなる

という挙動だった。

**理由**

Aさんの机の裏にネットワークのハブが設置されており、その真上にあたる机の端がいつも温かかった。
Aさんは、自分用にお茶を淹れた時、プラスチックの水筒に熱いお茶を淹れ、温かくなっている机の端に置いていた。
その結果、お茶の熱がハブに伝わり熱暴走を引き起こし接続障害となった。

## ジャネット・ジャクソンの曲を流すとPCがクラッシュ

**ネタ元**

[The Old New Thing: Janet Jackson had the power to crash laptop computers](https://devblogs.microsoft.com/oldnewthing/20220816-00/?p=106994)
via [このツイート](https://twitter.com/mootastic/status/1560073106622140416)

**現象**

あるコンピュータメーカーが、ジャネット・ジャクソンのRhythm Nationという曲を流すと特定のモデルのノートPCがクラッシュすることを発見する。
んなわけないやろと思いつつマイクロソフトのエンジニアが調査すると、現象が再現する。
しかも、

- クラッシュするのはそのモデルに限られず、別のモデルでもクラッシュするやつがいる
- 曲を流しているPCだけでなく、その側に置いてある別のマシンがクラッシュすることもある

という現象。

**理由**

その曲の中に、特定のHDDにとっての固有振動数の音が含まれており、共鳴を起こしていた。HDDは振動に弱いので読み込みエラーが起こりクラッシュが発生した。