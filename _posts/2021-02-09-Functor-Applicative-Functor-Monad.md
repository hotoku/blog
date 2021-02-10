---
layout: post
title: Functor, Applicative Functor
date: 2021-02-09 19:17:51 +0900
tags: haskell
---

Functor, Applicative Functorについて勉強したのでメモ。

Learn You A Haskell Great Goodの内容。

## Functor

Functorは、

```haskell
class Functor f where
  fmap :: (a -> b) -> f a -> f b
```

という唯一のメソッドを持つ型クラス。

Type constructor がfunctorになるには、`* -> *`というkindを持つ必要がある。

### IOの例

```haskell
instance Functor IO where
  fmap f action = do
    result <- action
    return (f result)
```

 `fmap`は、元のIOが外界から取ってきた値に関数を適用するIOを作る。
 
 
### (->) r の例

`(->) r`は、もう一つ（返り値となる）型を取れば具体的な型とみなせる（つまり`* -> *`というkindを持つ）ので、functorになる資格がある。
ここで、`(->) r`は`r -> *`、つまり、`r`型を引数にとり、何かを返す関数である。

```haskell
instance Functor ((->) r) where
  fmap f g x = ...
```

ここで、上の`fmap`の具体的な定義を考える。まず型はどうなるかというと

```
fmap :: (a -> b) -> ((->) r a) -> ((->) r b)
```

見やすく書き換えると

```
fmap :: (a -> b) -> (r -> a) -> (r -> b)
```

となる。型を見れば

```haskell
instance Functor ((->) r) where
  fmap f g = f . g
  -- あるいは fmap = (.)
```

とすれば良いことが分かる。

これが何に使えるかというと・・別に特に便利なわけではないが、Functor = 箱、というアナロジーだけでは捉えにくいような例の1つという意図らしい。

### Fmapの型

fmapは、

```haskell
(a -> b) -> f a -> f b
```

という型を持つが、`->`は右に結合するので、

```haskell
(a -> b) -> (f a -> f b)
```

と書いても良い。つまり、fmapは、関数を受け取って、それをfunctorの中の値に適用する別の関数を作ると思っても良い。 
このfmapの動作を「リフトする」と言ったりする。

## Applicative

Functorを扱うときには1引数の関数だけを考えていたが、2引数の関数を扱いたくなる、こともあるでしょう。
fmapに2引数の関数を渡してみると、どうなるか。

```haskell
fmap :: (a -> b) -> f a - > f b -- bに(c -> d)を代入する
fmap :: (a -> (c -> d)) -> f a -> f (c -> d) -- -> は右に結合するので
fmap :: (a -> c -> d) -> f a -> f (c -> d)
```

と書き換えてみると、fmapは、2引数の関数 `a -> c -> d`を取って、`f a -> f (c -> d)`を返すような関数と見ることもできる。
この辺は、haskellがカリー化されている恩恵を受けている。[^1]


```haskell
fmap :: (a -> c -> d) -> f a -> f (c -> d)
```

という型を見ると、fmapに2引数の関数とfunctorを渡すと、functorの中に入った関数が得られることが分かる。
この、**functorの中に入った関数**を**functorの中に入った値**に適用するときに使うのがApplicative Functor。

```haskell
class (Functor f) => Applicative f where
  pure :: a -> f a
  (<*>) :: f (a -> b) -> f a -> f b
```

ここで、`b` に`b' -> c`という型を代入してみると

```haskell
<*> :: f (a -> (b' -> c)) -> f a -> f (b' -> c)
```


となる。これは、`<*>`が好きな数だけ連鎖できることを意味している。
そのことによって、`<*>`は **Functorの中での関数適用**のような振る舞いができる。

例えば、

```haskell
-- Listの例
pure (+) <*> [1,2] <*> [10, 100]
-- => [11, 101, 12, 102]  
```

```haskell
-- Maybeの例
pure (+) <*> Just 1 <*> Just 2
-- => Just 3
```

```haskell
-- IOの例
main = pure (++) <*> getLine <*> getLine
```

など。pure fと書くのが面倒なので、

```haskell
<$> :: Functor f => (a -> b) -> f a -> f b
f <$> x = fmap f x
```

という演算子が用意されている。これで、先の例は

```haskell
(+) <$> [1,2] <*> [10, 100]
-- => [11, 101, 12, 102]  
```

と書ける。つまり、

- `<$>`は、関数をfunctorの中に入れ込む
- `<*>`は、functorの中で関数適用する

と覚えられる。

### (->) r をApplicativeに

(->) rはfunctorだったが、Applicativeとしても振る舞える。

```haskell
instance Applicative ((->) r) where
  pure x = \_ -> x
  f <*> g = \x -> f x (g x)
```

これは分かりづらい・・。
まず、

- fの型は (->) r (a -> b) = r -> a -> b
- gの型は (->) r a = r -> a

である。

- pure 型は、a -> (->) r a = a -> r -> a
- f <*> gの型は、(->) r b = r -> b

でなければならないが、上の定義は実際にそうなっている。（pureの式ではxの型はa、`<*>`の式ではxの型はr）

### ZipList
普通のリストをApplicativeとして扱うと、リストの中の要素の全組み合わせを使った計算を行う。
リストを計算に用いる意味として、他に、1番目の要素同士、2番目の要素同士、、、という計算も考えられる。
それを実装しているのがZipList。

```
instance Applicative ZipList where
  pure x = ZipList (repeat x) 
  ZipList [] <*> xs = []
  ZipList fs <*> ZipList xs = ZipList (zipWith (\f x -> fs) fs xs)
```

こんな感じで使う。

```haskell
(+) <$> ZipList [0,1,2] <*> ZipList [3,4]
-- => ZipList {getZipList = [3,5]}
```


[^1]: 例えば、Pythonでは`f1 = lambda a: (lambda c: d)`（a -> (c -> d)）と`f2 = lambda a, c: d`（a -> c -> d）は別物である。`f1(a, c)`と呼び出すことはできないし、`f2(a)`と呼び出すこともできない。
