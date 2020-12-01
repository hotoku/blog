---
layout: post
title: 計算グラフと自動微分
date: 2020-12-01 09:09:40 +0900
tags: math
---

## 基本

NNの典型的なフィードフォワード計算は、

$$
z_1 = W_1 x_1 + b_1 \\
a_1 = \sigma(z_1) \\
z_2 = W_2 a_1 + b_2 \\
a_2 = \sigma(z_2) \\
\hat{y} = f(a_2) \\
l = l(y, \hat{y})
$$

こんな感じ。この$$l$$を$$W_i$$や$$b_i$$で微分したい。
例えば$$W_1$$で微分することを考えると

$$
\frac{\partial l}{\partial W_1} =
\frac{\partial l}{\partial z_1} \frac{\partial z_1}{\partial W_1} =
\frac{\partial l}{\partial a_1} \frac{\partial a_1}{\partial z_1} \frac{\partial z_1}{\partial W_1} =
\ldots
$$

という感じに、**上流**の偏微分が計算できれば良い。

## 単純化

もう少し単純化して

$$
z = ax + b \\
y = g(z)
$$

で、$$\partial_a y, \partial_b y$$を計算したいとする。

単純に計算すれば

$$
\frac{\partial y}{\partial a} =\frac{\partial y}{\partial z}\frac{\partial z}{\partial a} =
\frac{\partial g}{\partial z}x
$$

ここで、数式の上で$$\frac{\partial g}{\partial z}$$と書かれているこの値に注目する。
これは、数値としては、$$\frac{\partial g}{\partial z}$$という数式に、今考えている$$z$$という特定の値を
入れて得られる値である。それは、$$z=ax+b$$というフィードフォワードの計算で計算されている値である。

というわけで、backpropagationをする際には、各ノードの上流の微分（上から落ちてくる）に加えて、
そのノードでの計算対象の評価値（下から積み上げて計算する）も必要になる。
