---
layout: post
title: Coursera NLP specialization Course 2
date: 2020-11-15 12:01:18 +0900
tags: coursera
---

## Week 1
## auto correct

元ネタは[これ](https://norvig.com/spell-correct.html)らしい。
Peter NorvigというGoogleの研究部門を率いた人の記事。

単語に分割するのに、`re.split(r"\s+", seltence)`を使うか、`re.findall(r"\w+", sentence)`を使うか。
結論から言うと、`findall, r"\w+"`を使った方が良い。`r"\s+"`でsplitすると、"print,"みたいな**単語**も含まれてしまう。



## minimum edit distance

文字列$$x$$を$$y$$に変更するのに必要な最小手順を求めたい。
ただし、加えられる変更と、その変更のコストは以下の通りとする

- 1文字削除 コスト1
- 1文字挿入 コスト1
- 1文字置換 コスト2

$$x,y$$の長さを$$m,n$$としたとき、

$$
D_{00} = 0 \\
D_{ij} = \mathrm{min}(D_{i-1,j} + 1, D_{i,j-1} + 1, D{i-1,j-1} + R_{ij}) \\
i = 0, 1, \ldots, m \\
j = 0, 1, \ldots, n
$$

という漸化式を計算すれば良い。ただし、$$R_{ij}$$は、$$x_i == y_j$$なら0、そうでないなら$$2$$である。

ここで、$$D_{ij}$$は、$$x[:i]$$を$$y[:j]$$に変更する最小コストを表している。

- $$D_{00}$$は空文字を空文字に変更するコストなので0
- $$x[:i]$$を$$y[:j]$$に変換するには、
  - $$x[:i]$$の末尾を削除して、$$x[:i-1]$$を$$y[:j]$$に変更する
  - $$x[:i]$$を$$y[:j-1]$$に変更して、$$y[j]$$を最後に挿入する
  - $$x[:i-1]$$を$$y[:j-1]$$に変更して、必要なら1文字入れ替える

  のどれかで得られる。

ということ
