---
layout: post
title: monadic parser
date: 2021-02-04 08:48:28 +0900
tags: haskell parser
---

[パーサーをモナドで書くという論文](https://www.cs.nott.ac.uk/~pszgmh/monparsing.pdf)を読んだので、途中までの写経にコメントを付けたメモ。

```haskell
-- ParserはMonadだが、List aやMaybe aのような「値」ではなく「関数」であることに注意。
-- パース対象の「文字列」を受け取り、(パース結果, 残り)の文字列のリストを返す。
-- 複数の導出経路がある場合を表現するために、「リスト」になる。
-- モナドとしてのリストが、結果が複数あり得る場合を表現するのと同じ。
type Parser a = String -> [(a, String)]

-- プリミティブ達
zero :: Parser a
zero _ = [] -- 何も受け付けない

result :: a -> Parser a
result c = \inp -> [(c, inp)] -- 何も消費せず、1文字を生成する

item :: Parser Char
item = \inp -> case inp of -- 最初の1文字を受け付ける
  [] -> []
  x:xs -> [(x, xs)]

-- パーサーの合成。
-- モナドなので、「パーサー」p と「値を受け取りパーサーを返す関数」f から、新しい「パーサー」を作る。
-- fの入力は「前のパーサーの結果」で、
-- fの出力は「前のパーサーが未消化の文字列を受け取り、前の導出結果と今回の結果の合成結果を返す」パーサーである。
-- 「前の結果と後ろの結果をどう組み合わせるか」は`bind`はケアせず、fの中に実装されることになる。
-- `bind`の役割は、
-- - 前のパーサーを適用する
-- - 前の結果（リストの中のタプルに内包されている）と後ろのパーサーの結果を組み合わせる
-- ようなパーサーを作ること。
--
-- さらに、前のパーサーは複数の結果を返すので、それぞれから得られるパーサーをすべて適用して得られる結果をすべて結合する。
-- この辺は、リストと同じ。
bind :: Parser a -> (a -> Parser b) -> Parser b
p `bind` f = \inp -> concat [(f v inp') | (v, inp') <- p inp]

-- 1. 最初に、何も考えずに1文字受け付ける
-- 2. 受け付けた値が条件を満たすなら、それ以上は消費せずに1文字を改めて生成する
--    そうでないなら、全体として失敗を返す
sat :: (Char -> Bool) -> Parser Char
sat p = item `bind` \x ->
  if p x then result x else zero

-- satは次のように書いても同じだが、パターンマッチやif then elseが繰り返し現れることになるので、
-- モナドで再利用をした方が便利。
sat2 :: (Char -> Bool) -> Parser Char
sat2 p = \inp -> case inp of
  [] -> []
  x:xs -> if p x then [(x, xs)] else []

char :: Char -> Parser Char
char x = sat (\y -> x == y) -- 特定の文字を受け付ける

digit :: Parser Char
digit = sat (\x -> '0' <= x && x <= '9')

lower :: Parser Char
lower = sat (\x -> 'a' <= x && x <= 'z')

upper :: Parser Char
upper = sat (\x -> 'A' <= x && x <= 'Z')

twolowers = lower `bind` \x ->
  lower `bind` \y ->
  result [x, y]

plus :: Parser a -> Parser a -> Parser a
p `plus` q = \inp -> (p inp ++ q inp)

letter :: Parser Char
letter = lower `plus` upper

alphanum :: Parser Char
alphanum = digit `plus` letter

-- wordは、letterの0回以上の繰り返し。
-- ループを表現するために、再帰が必要になる。
-- neWordの定義は、
-- - 1文字読むパーサー
-- - 前の文字を受け取り、wordの結果と連結した結果を返すパーサー
-- を`bind`したものになっている
word :: Parser String
word = neWord `plus` result ""
  where
    neWord = letter `bind` \x ->
      word `bind` \xs ->
      result (x:xs)

-- 最後のresultを省けないのか、と思って下のところまで書くと
-- word2の定義との整合性が取れない（word2自体には、前の結果との合成の機能はない）
-- ということになる。
-- これを使うと、文字は消費されるが常に空文字を生成するパーサーとなる。
word2 :: Parser String
word2 = neWord `plus` result ""
  where
    neWord = letter `bind` \x ->
      word2

main :: IO ()
main = do
  putStrLn $ show $ twolowers "abcde"
  putStrLn $ show $ word "abc def"
  putStrLn $ show $ word2 "abc def"
```
