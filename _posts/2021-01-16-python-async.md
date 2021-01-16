---
layout: post
title: Asyncのまとめ
date: 2021-01-16 10:35:13 +0900
tags: python async
---

Pythonのasyncioを使いたくて、ドキュメントを読んだので大事そうなところをメモ。

## [Coroutines](https://docs.python.org/3/library/asyncio-task.html#coroutines)

coroutine。普通は、`async def`を使って定義される。coroutineを実行するには、3つの方法がある。

- `asyncio.run`: トップレベルのcoroutineを呼び出す。プログラムのエントリポイントとして1回だけ呼ばれるのが普通の使い方
- `await`する
- `asyncio.create_task`: coroutineが`Task`として実行される

ドキュメントでは、coroutineを

- `async def`で定義される関数
- `async def`で定義される関数の返り値

のどちらの意味でも使うと書いてある。区別するに、前者はcoroutine function, 後者はcoroutine objectと呼ばれる。


## [Aawaitables](https://docs.python.org/3/library/asyncio-task.html#awaitables)

`await`することができるオブジェクト。

- coroutine
- Task
- Future

の3種類がある。Futureは、コールバック方式のasync,awaitと共存するために必要なんだそうな・・


## [Creating Tasks](https://docs.python.org/3/library/asyncio-task.html#creating-tasks)

Taskを作るには`asyncio.create_task`にcoroutineを渡す。`await`するのと違い、この呼び出しで実行はブロックされることはなく、即座に次の行の処理に移行することに注意。

## [Running Tasks Concurrently](https://docs.python.org/3/library/asyncio-task.html#id6)

複数のawaitableを同時に実行するには、`asyncio.gather`に、awaitableを渡す。

```python
asyncio.gather([a1, a2, a3])
```

ではなくて

```python
asyncio.gather(a1, a2, a3)
```

なので注意。


## [Running in Threads](https://docs.python.org/3/library/asyncio-task.html#running-in-threads)

普通の関数をawaitするには、`asyncio.to_thread`に関数を渡す。


## [Queues](https://docs.python.org/3/library/asyncio-queue.html)

async/awaitと合わせて使うためのqueueが用意されている。

例えば、

- `hoge.com/users/X/follower`にアクセスして、ユーザー`X`のフォロワー一覧を取得する。
- 各フォロワー`Y`に対して`hoge.com/users/Y/favorites`にアクセスして、お気に入り一覧を取得する。

という処理を、複数の`X`に対して実行したい場合、

```python
async def get_followers(x):
    response = await ... # get url of follwers for x
    followers = parse_response(response)
    return follwers

async def get_favorites(y):
    response = await ... # get url of favorites for y
    favorites = parse_response(response)
    return favorites

async def main(xs)
    yss = await asyncio.gather(*[
        get_followers(x) for x in xs
    ]) # (A)
    fss = await asyncio.gather(*[
        get_favorites(y) for ys in yss for y in ys
    ])
```

のように書くと、全ての`x`に対するリクエストが終わるまで`(A)`の部分で処理がブロックされる。
本当なら、1つの`x`に対するリクエストが終わる度に次のリクエストを投げたい。
こういうときに、queueを上手く使うと思った処理が実現できる。
ドキュメントの例を引用しておく。

以下の囲みは[ドキュメント](https://docs.python.org/3/library/asyncio-queue.html)からの引用
```python
import asyncio
import random
import time


async def worker(name, queue):
    while True:
        # Get a "work item" out of the queue.
        sleep_for = await queue.get()

        # Sleep for the "sleep_for" seconds.
        await asyncio.sleep(sleep_for)

        # Notify the queue that the "work item" has been processed.
        queue.task_done()

        print(f'{name} has slept for {sleep_for:.2f} seconds')


async def main():
    # Create a queue that we will use to store our "workload".
    queue = asyncio.Queue()

    # Generate random timings and put them into the queue.
    total_sleep_time = 0
    for _ in range(20):
        sleep_for = random.uniform(0.05, 1.0)
        total_sleep_time += sleep_for
        queue.put_nowait(sleep_for)

    # Create three worker tasks to process the queue concurrently.
    tasks = []
    for i in range(3):
        task = asyncio.create_task(worker(f'worker-{i}', queue))
        tasks.append(task)

    # Wait until the queue is fully processed.
    started_at = time.monotonic()
    await queue.join()
    total_slept_for = time.monotonic() - started_at

    # Cancel our worker tasks.
    for task in tasks:
        task.cancel()
    # Wait until all worker tasks are cancelled.
    await asyncio.gather(*tasks, return_exceptions=True)

    print('====')
    print(f'3 workers slept in parallel for {total_slept_for:.2f} seconds')
    print(f'total expected sleep time: {total_sleep_time:.2f} seconds')


asyncio.run(main())
```

上の`worker`では、`queue.get()`してから、`queue.task_done()`するまでの間に例外が起こると、queueの中身が減らないために`queue.join()`が永遠に解決されない。

なので、次のようにした方が良い。

```python
async def worker(name, queue):
    while True:
        # Get a "work item" out of the queue.
        try:
            sleep_for = await queue.get()

            # Sleep for the "sleep_for" seconds.
            await asyncio.sleep(sleep_for)

            print(f'{name} has slept for {sleep_for:.2f} seconds')
        except Exception as e:
            # 例外を処理する
        finally:
            queue.task_done()
```
