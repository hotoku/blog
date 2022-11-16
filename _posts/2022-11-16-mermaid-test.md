---
layout: post
title: mermaidのテスト
date: 2022-11-16 08:20:39 +0900
tags: mermaid
---

meramidが描画されるようにした。

ページのロード後に、jsでmeramidのコードがあるノードを探して、それをmeramidによる描画結果のsvgに動的に置き換えている。
そのため、ページのロードの瞬間に、一瞬、mermaidのコードが見えてチラつく。

jekyllのビルドプロセスの中で変換して、静的に配信する方が王道な感じがするけど、jekyllのページにjsを入れるのを試したかったのと、
そのためにwebpackの使い方を探りたかったのだ。

## フローチャート

`G {{G. hexagon}}`がちゃんと表示されないな🤔markdownの制約か？

``` mermaid
flowchart LR
  classDef green fill:#1f1;
  classDef dotted stroke-dasharray: 5 5

  A:::green
  B[This is B]:::dotted
  C([This is C. rounded])
  D[[This is D. in the subroutine box]]
  E[(E. Database)]
  F((F. circle))
  G{{G. hexagon}}
  H[/H. trapezoid\]
  I(((I.double circle)))
  J[I can be clicked. \nGoto Github]

  A --> B --> C --> H
  A --> D --> F
  B --> E --> G --> C
  C --> I --> J

  subgraph sub
    a --> b((b))
    a --> c[[c]]
    b --> c
    c --> d(((d)))
  end

  G --> a

  click J href "https://github.com"

```

他のグラフも書こうかと思ったけどmermaidは種類が多すぎて大変だから辞めた
