---
layout: post
title:  "github pagesについて"
date:   2020-09-28 17:40:36 +0900
categories: jekyll update
---

## 概要
参考: [公式HELP](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/about-github-pages)

- github pagesは、ユーザー・組織・プロジェクトのいずれかに紐づく
- ユーザー・組織のページを作るには、`<name>.github.io`という名前のレポジトリを作る
- ユーザー・組織のURLは、`<name>.github.io`
- プロジェクトのURLは、`<owner>.github.io/<repository>`
- ユーザー・組織ページのソースは、レポジトリ内のデフォルトブランチのルート`/`。
ただし、以下に設定変更可能。ブランチは任意のものを指定可能。ルートディレクトリは、`/`か`/docs`を選択可能
- プロジェクトページのソースは、`gh-pages`のルート`/`


## Jekyllについて
参考: [公式](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/about-github-pages-and-jekyll)

### 以下の設定は変更できない(github pages上では)

```
lsi: false
safe: true
source: [your repo's top level directory]
incremental: false
highlighter: rouge
gist:
  noscript: false
kramdown:
  math_engine: mathjax
  syntax_highlighter: rouge
```

### Jekyllはデフォルトでは以下を無視する

- `/node_modules`, `/vendor`
- `_`, `.`, `#`で始まるファイル/フォルダ
- `~`で終わるファイル/フォルダ
- 設定で`excluded`されているもの

逆に、これらを対象にしたい場合には`include`を設定する。
