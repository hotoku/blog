---
layout: post
title: html5 css3 写経
date: 2024-07-09 15:40:51 +0900
categories: blog
tags: html css
---

[この本](https://www.amazon.co.jp/dp/B0176GNY26)の写経をした際のメモ。

- vscodeに[live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)という拡張がある。名前のとおり、live reloadしてくれるサーバーをサクッと建てられる。
- 要素を横並びにするには`float: left`, `float: right`を指定
  - `float`を指定した要素の親に高さを伝えるためにclearfixというテクニックがある
- `box-sizing: border-box`: 要素の`width`や`height`が、どこまでを指すか。デフォルトではcontentのみ。paddingとborderを含めた方が直感的
- 文書の構造を、キチンとhtmlに反映させる
  - 見た目・デザイン上、セクションが必要ない場合も、h2, h3要素はhtmlに入れておく。見せたくない場合はcssで不可視にする
  - 要素の順番にも気を配る。ex. 日付情報は見た目では上にあるけど意味的には本文の下に来るべき、など
    - 親要素が`position: relative`で子要素が`position: absolute`なら、親要素からの座標を絶対値で指定できる。これを使って、兄要素をpaddingで少し間隔を開けたところに描画すれば、上に表示したい要素の位置を調整できる
- `background: url("...")`で、背景に画像を指定できる`repeat-x`で横方向に繰り返し
- `letter-spacing: 1px`で、文字の間に1px挿入される
- `max-height: ...; overflow-y: auto`とすると、最大の高さまでは縦に伸び、それ以上の場合はスクロールするようになる
