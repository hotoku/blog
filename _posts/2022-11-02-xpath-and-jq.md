---
layout: post
title: xpathとjq
date: 2022-11-02 22:32:05 +0900
tags: xpath jq
---

scrapyで`node.xpath(クエリ)`で返ってくるオブジェクトの配列に、さらに`.xpath`を呼ぶと、それぞれのオブジェクトに対してクエリが発行される。

というのは、

jqで`array[]`をパイプに送ると、その先で各要素に対して処理が適用される。

というのと似ているなと思った。
