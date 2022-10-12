---
layout: post
title: category theory for programmers 4
date: 2022-09-15 17:12:30 +0900
tags: category_theory
---

> As programmers, we don’t like infinities, but in category theory you learn to
> eat infinities for breakfast. Whether it’s a set of all strings or a collection
> of all possible states of the Universe, past, present, and future — we can deal with it!

## Functors as Containers

ファンクターてのは中に値が入ってて、何か文脈とか副作用とかをくっつけるコンテナみたいなもんだよ、というような説明を見ることがあって、それはそれで良いのだろうけど、もう少し詳細に見てみましょうという節。
必ずしも、値が入ってるわけではないんやで、という例として、Reader functorが上がっている。

### Reader Functor

型`r`から`a`への関数は`r -> a`という型になる。これは、`(->) r a`と書いても一緒。ところで、カリー化を考えると、`(->) r`とういのは、型構築子と思える。
つまり、何かの型`a`を渡してやれば、新しい型`(->) r a`が作れる。
で、じつは、こいつは、Functorたる資格を満たしている。
Functorたる資格とはなんだったかというと、要は関数の合成がうまくいくということ。

つまり、`M`を一般の型構築子として、それに付随する関数`fmap: (a -> b) -> M a -> M b`があって、`fmap (f . g) = fmap f . fmap g`が成り立つこと。

で、これがReader Functorの場合に成り立つことを確認したい。`fmap`が何になるかを考える。この場合の`fmap`の型は
`fmap: (a -> b) -> ((->) r a) -> ((->) r b)`となる。意味を変えないで書き換えると
`fmap: (a -> b) -> (r -> a) -> (r -> b)`となる。この型を見ると、自然に`fmap`として関数の合成を考えれば良さそう。つまり
`fmap f g = f . g`とすれば良さそう。良いつうことは、あとで確認しよう。

### Reader Functorの`fmap`の確認
`fmap p q = p . q`のときに、`fmap (f . g) = fmap f . fmap g`を示したい。

関数合成`.`の結合則より

```
fmap (p1 . p2) q = (p1 . p2) . q = p1 . (p2 . q)
```

`fmap`の定義より

```
p1 . (p2 . q) = fmap p1 (p2 . q) = fmap p1 (fmap p2 q)
```

で、最後の式は、`q`に`fmap p2`を適用した結果に`fmap p1`を適用している。
ということは、`q`に`fmap p1`と`fmap p2`の合成を適用するのと同じ。
つまり、

```
fmap p1 (fmap p2 q) = (fmap p1 . fmap p2) q
```

よって

```
fmap (p1 . p2) = fmap p1 . fmap p2
```

うーん、狐につままれたようだ・・

### 関数適用と関数の型の結合性について

関数適用は、左に結合して良い。つまり
```
a b c d = (a b c) d = ((a b) c) d
```
としてよい。こうして良いってか、カリー化という記法のルールとして、こう決めているということじゃろう。

関数の型構築子`->`は、右に結合して良い。つまり
```
a -> b -> c -> d = a -> b -> (c -> d) = a -> (b -> (c -> d))
```
としてよい。逆はダメである。例えば
```
a -> b -> c = a -> (b -> c) != (a -> b) -> c
```
具体的に、全部`Int`で考えてみる。

前者の`Int -> (Int -> Int)`は、`Int`の値を1個与えると、`Int -> Int`を返すような関数の型である。
これは、例えば、
```
plusx: Int -> (Int -> Int)
plusx x = (+) x
```
みたいなものが考えられる。

後者の`(Int -> Int) -> Int`は、`Int -> Int`の値を1個与えると、`Int`の値を返すような関数の型である。
これは、例えば、
```
sum123: (Int -> Int) -> Int
sum123 f = (f 1) + (f 2) + (f 3)
```
みたいなものが考えられる。

`->`の方のルールは、関数適用のカリー化のルールとして`a b c = (a b) c != a (b c)`と決めたところから論理的に決まってるんじゃろう。
