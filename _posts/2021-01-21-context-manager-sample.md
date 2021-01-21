---
layout: post
title: 全内容が無事に作成できたときだけファイルを書き込みたい
date: 2021-01-21 13:20:48 +0900
tags: python
---

全内容が無事に作成できたときだけファイルを書き込みたい、という場面があった。

どういうことかと言うと、例えば

```python
with open("hoge.csv", "w") as f:
    for l in some_iterator:
        f.write(some_process(l) + "\n")
```

という処理を書いたとする。
この場合、`some_iterator`や`some_process`がループの途中で例外を起こすと、`hoge.csv`は例外発生箇所までの内容が書き込まれた中途半端な状態でファイルシステム上に残ることになる。

LuigiでLocalTargetを使っているときに、この挙動で困ったことになった。
ある実行では例外を投げて処理が失敗したのに、内容が中途半端なファイルが残るため、再実行時には当該のタスクが成功済みと認識されてしまったのである。

そこで、次のようなコンテキストマネージャーを作った。

```python
class ErrorHandler:

    def __init__(self, fpath):
        self.fpath = fpath
        self.fd = None

    def __enter__(self):
        self.fd = NamedTemporaryFile(mode="w")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            return
        self.fd.flush()
        shutil.copy(self.fd.name, self.fpath)

    def write(self, l):
        self.fd.write(l)

    def writelines(self, ls):
        self.fd.writelines(ls)
```


```python
with ErrorHandler("temp.csv") as f:
    f.write("a,b,c\n")
    f.writelines([
        "1,2,3\n",
        "4,5,6\n"
    ])
```

上のようにして使う。

`enter`で一時ファイルを作成し、書き込みは全てそちらのファイルに行う。`exit`する際に、例外が発生してなければ一時ファイルを本来の目的ファイルへとコピーする、ということをやっている。
