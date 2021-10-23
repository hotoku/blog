---
layout: post
title: React Hooksのメモ
date: 2021-10-17 07:49:02 +0900
tags:  react
---

- Hooksは、関数コンポーネントで使われる
- クラスコンポーネントは、`render`の実行が終わったあとも、コンポーネントオブジェクトがメモリに生存し続ける。結果、メンバ変数などの値も生存し続ける。
- 関数コンポーネントは、実行されるたびに、ローカル変数は失われる。このときに失われてほしくないデータ・情報をHooksを使って残す

## useState

- １つの変数の値を、残しておける

```typescript
const [value, setValue] = useState(initialValue);
```

## useEffect

- 副作用を起こす処理を記述する

```typescript
useEffect(() => {
    doSomething();
    return () => clearSomething();
})
```

上のように書くと

- doSomethingを実行する
- アンマウント時に、clearSomethingが起動されるように登録する

ことができる。

```typescript
useEffect(() => {
    doSomething();
    return () => clearSomething();
}, [value])
```

上のように、第２引数に「依存配列」を渡すことができる。

- 依存配列の値が変化したときだけ実行される
- 省略時は、レンダリングごとに一回実行される
- `[]`を渡すと、初回レンダリング時のみ実行される

## useMemo

メモ化する

```typescript
const val = useMemo(() => {
    // 何かやる
}, deps)
```

`deps`は配列。上のように書くと、`deps`の要素のいずれかが変化した場合に再計算される。

## useCallback

関数定義をメモ化する

```typescript
useCallback(fn, deps)
```

は、

```typescript
useMemo(() => fn, deps)
```

と同値らしい。[link](https://reactjs.org/docs/hooks-reference.html#usecallback)

## useContext

特定の変数を、コンポーネント間で共有する。Providerコンポーネントの子孫のコンポーネント間で変数を共有できる。

使い方は、また今度
