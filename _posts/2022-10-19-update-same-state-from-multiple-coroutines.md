---
layout: post
title: Reactで一つのStateを複数のコルーチンから更新する
date: 2022-10-19 16:49:01 +0900
tags: react
---

ちょっと時間のかかる複数の処理をasync関数で並列に実行する。
これらのうち、終わったタスクの数をstateに持っておいて、進行状態を表示したい。
というときに、自然に書くのは

``` typescript
import { useState } from "react";

const task = (n: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, n * 1000));

const Example = (): JSX.Element => {
  const [num, setNum] = useState(0);

  const runTask = async (n: number): Promise<void> => {
    await task(n);
    console.log("done task", n, "num =", num);
    setNum(num + 1);
  };

  return (
    <div>
      <button
        onClick={async () => {
          const tasks = [] as Promise<void>[];
          for (let i = 1; i <= 3; i++) {
            tasks.push(runTask(i));
          }
          await Promise.all(tasks);
          console.log("done all task");
        }}
      >
        start
      </button>
      <p>num={num}</p>
    </div>
  );
};

export default Example;
```

こんな感じ。なんだけど、これだと、画面には`num=1`が表示される。
なんでかっていうと、

1. ボタンが押される
2. `runTask`プロミスが3つ作られる
3. このとき、この3つのプロミスの後続になるクロージャから見えている`num`の値は全て同一の0
4. なので、`await task(n)`のあとの`setNum(num + 1)`は全て`setNum(0 + 1)`という同じ呼び出しになってしまう

解決策は、

``` typescript
setNum((n) => n + 1)
```

と、stateの更新関数に関数を渡すこと。
