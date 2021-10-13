---
layout: post
title: PythonのABCとmixinについて
date: 2021-10-13 18:06:41 +0900
tags: python
---


Pythonには、[`abc`](https://docs.python.org/3.9/library/abc.html#abc.ABCMeta)というモジュールがある。
`abc`は、`Abstract Base Class`の略である。


ざっくりとドキュメントを読んで理解したことをメモしておく。


## Mixin
[Stackoverflow](https://stackoverflow.com/questions/533631/what-is-a-mixin-and-why-are-they-useful)


独立した複数の種類の機能を持ったクラスを作りたい。
それぞれの機能の具体的な実装は、柔軟に選べるようにしたい、というような場合に使う多重継承を利用したテクニック。


```python
class JapaneseSinger:
    def sing(self):
        print("私は歌う", end=" ")


class EnglishSinger:
    def sing(self):
        print("I sing", end=" ")


class JazzDancer:
    def dance(self):
        print("jazz jazz")


class LockDancer:
    def dance(self):
        print("lock lock")


class DanceUnit:
    def play(self):
        self.sing()
        self.dance()


class JpJazzUnit(DanceUnit, JapaneseSinger, JazzDancer):
    pass


class JpLocUnit(DanceUnit, JapaneseSinger, LockDancer):
    pass


class EnJazzUnit(DanceUnit, EnglishSinger, JazzDancer):
    pass


class EnLocUnit(DanceUnit, EnglishSinger, LockDancer):
    pass


jj = JpJazzUnit()
jl = JpLocUnit()
ej = EnJazzUnit()
el = EnLocUnit()


jj.play()
jl.play()
ej.play()
el.play()
```


例えばこんな感じ


## ABCクラス
上のようなMixinを動的型付け言語でやると、必要なメソッドをちゃんと定義しているのか分からなくなりそうで怖い。というかなるだろう。
そこで、必要なメソッドをちゃんと定義しているのかをチェックできる仕組みとして`Abstract Base Class`が導入された
（多分。こういう時、ちゃんと背景を理解するためにPEPとかを読んだ方が良いんだろうなぁ・・[PEP 3119](https://www.python.org/dev/peps/pep-3119/)で提案されたらしい）。


```
from abc import ABC, abstractmethod


class Singer(ABC):
    @abstractmethod
    def sing(self):
        return NotImplemented


class Dancer(ABC):
    @abstractmethod
    def dance(self):
        return NotImplemented


class DanceUnit(Singer, Dancer):
    def play(self):
        self.sing()
        self.dance()


class BadSinger(Singer):
    pass


class GoodSinger(Singer):
    def sing(self):
        print("I can sing", end=" ")


class JazzDancer(Dancer):
    def dance(self):
        print("jazz jazz")


class BadUnit(DanceUnit, BadSinger, JazzDancer):
    pass


class GoodUnit(DanceUnit, GoodSinger, JazzDancer):
    pass


good_unit = GoodUnit()
good_unit.play()


bad_unit = BadUnit()
# > Traceback (most recent call last):
# >   File "abc_dance_unit.py", line 47, in <module>
# >       bad_unit = BadUnit()
# >       TypeError: Can't instantiate abstract class BadUnit with abstract methods sing
```


こんな感じのコードを書くと、`GoodUnit`はインスタンス化できるが、必要な`sing`メソッドを定義していない`BadUnit`はインスタンス化できずにエラーになる。
実行時のエラーだけではなく、型検査でも、エラーを検出してくれる。
