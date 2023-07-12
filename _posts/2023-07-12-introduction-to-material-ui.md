---
layout: post
title: Material UI入門メモ
date: 2023-07-12 19:35:03 +0900
categories: blog
tags: material_ui
---

[これ][mui system overview]を読んでみる。

- [sx props][sx]
  - Material UIのコンポーネントでは、`sx`というpropsで、スタイルを指定できる
  - 普通の`style`と同じだけど、MUI用のいくつかのユーティリティがある。テーマにアクセスできたりとか
  - `margin`を`m`と書けたり、`margin-left,right`をあわせて`mx`と書けたり、細かい便利もある
  - 汎用的ではない、一時的なコンポーネントの調整に便利
- [styled][styled]というユーティリティもある
  - スタイルを付けたコンポーネントを簡単につくれる
  - これはコンポーネントを作るので、同じスタイルを使い回すのに使える
- marginの設定などは[spacing][spacing]を見ればよさそう
- [theme][theme]: テーマの設定は、ここを見る

<!-- link -->
[mui system overview]: https://mui.com/system/getting-started/
[sx]: https://mui.com/system/getting-started/the-sx-prop/#typography
[styled]: https://mui.com/system/styled/
[spacing]: https://mui.com/system/spacing/
[theme]: https://mui.com/material-ui/customization/theming/
