---
layout: post
title: 計算グラフと自動微分
date: 2020-12-01 09:09:40 +0900
tags: math
---

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
\frac{\partial l}{\partial a_1} \frac{\partial a_1}{\partial z_1} \frac{\partial a_1}{\partial W_1} =
\ldots
$$

という感じに、**上流**の偏微分が計算できれば良い。
