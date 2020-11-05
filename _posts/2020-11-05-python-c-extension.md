---
layout: post
title: PythonのC/C++拡張を書くための基礎知識
date: 2020-11-05 20:14:26 +0900
categories: python
---

仕事でPythonの関数をC++で書き換えることがあったので、調べたことをまとめておく。

基本的には[公式][公式]を読めば良いのだが、簡単な関数を作るだけなら不要な詳細も多いので、
最低限必要なものだけ抜き出して記録しておく。

## 用意するもの

### ライブラリ名
何でも良いが、ここでは`hoge`としておｋ．

### ソースファイル
ファイル名は、`<modulename>module.cpp`とするのが慣習らしい。
もしくは`<modulename>.cpp`でも良い。
今の場合は、`hogemodule.cpp` or `hoge.cpp`である。

#### ヘッダの読み込み
ファイルの先頭2行は

```c++
#define PY_SSIZE_T_CLEAN
#include <Python.h>
```

とする。

#### (emacs用)linter用の設定
`<Python.h>`はinclude pathを設定しないと見つからない。ファイルの最後に

```c++
// Local Variables:
// flycheck-gcc-include-path: ("/path/to/Python.h")
// flycheck-clang-include-path: ("/path/to/Python.h")
// End:
```

を書いておけばflycheckが見つけてくれる。`/path/to/Python.h`は、`locate Python.h`をターミナルで実行する。

#### 関数の実装

サンプルとして、2つのdoubleを受け取り1-ノルム, 2-ノルムを返す関数を実装する。

```c++
struct norms {
  double one;
  double two;
};

norms func(const double& x, const double& y){
  return {
    abs(x) + abs(y),
    sqrt(x*x + y*y)
  };
}
```


#### Pythonとのインターフェイス

Pythonのインタプリタの中では、全てのもの(数値やbooleanでも)は`PyObject`というオブジェクトである。
この`PyObject`型の値を通常のdoubleやbooleanに変換する作業が必要である。

```c++
static PyObject* hoge_func(PyObject *self, PyObject *args){
  double x, y;

  if (!PyArg_ParseTuple(args, "dd", &x, &y))
    return NULL;

  norms vals = func(x, y);

  PyObject* ret = PyList_New(0);
  PyObject* p;
  p = PyFloat_FromDouble(vals.one);
  PyList_Append(ret, p);
  p = PyFloat_FromDouble(vals.two);
  PyList_Append(ret, p);

  return ret;
}
```

位置引数だけを取る関数を定義する場合は、上のように2つの`PyObject*`引数を受け取れるようにしておく。
上の例で`self`は、ここでは使わないので無視（実際には、モジュールあるいはオブジェクトへのポインタが渡ってくるらしい）。
2つ目の`args`に、実際の引数が渡されてくる。

`PyObject*`を通常の型に翻訳するには`PyArg_ParseTuple`を使う。`PyArg_ParseTuple`は2つの引数に加えて、
任意個の引数を取る。1つ目は引数に渡ってきた`PyObject*`を渡す。

2つ目は、期待している引数の型を書式文字列として渡す。書式は、intなら"i"、doubleなら"d"である。その他が
使いたい場合は[公式][書式]を見る。今の場合はdoubleが2つなので"dd"を渡している。

3つ目以降に、翻訳してくれた値を格納する場所を指すポインタを渡す。

何らかの問題があった場合、`!PyArg_ParseTuple(...)`が`false`に評価され`NULL`が返却される。
これは、[Pythonの例外ハンドリングのお作法][例外]に則った仕草。

最後に返り値を準備する。Pythonの世界では全てが`PyObject`なので、返り値は`PyObject*`に変換しなければならない。
`int`や`float`など基本的な型への変換には、`PyXxx_FromYyy`関数を使う（`Xxx`にはPythonの型名、`Yyy`にはc++での型名が入る）。

さらに今回は、2つの値を返したいので、これらをリストに詰めて返却することにする。
リストは`PyList_New`で作成し、`PyList_Append`で要素を追加する。

#### パッケージ化
パッケージ情報を、お作法に則ってまとめる。これは、サンプルをコピペして必要な部分を編集すれば良い。

```c++
static PyMethodDef HogeMethods[] = {
  {
    "func",    // Pythonから見える名前
    hoge_func, // 関数の実体
    METH_VARARGS,
    "calculate norms" // 説明
  },
  {NULL, NULL, 0, NULL} // 番兵
};

static struct PyModuleDef hogemodule = {
  PyModuleDef_HEAD_INIT,
  "hoge",          // モジュール名
  "sample module", // ドキュメント
  -1,              // -1で固定(詳細な意味は調べてない)
  HogeMethods      // 上で定義したPyMethodDefの配列
}

PyMODINIT_FUNC
PyInit_hoge(void){
  return PyModule_Create(&hogemodule);
}
```

`PyMethodDef`の3つ目の要素は、引数のタイプを表すフラグである。
引数のタイプは、今回のように位置引数だけの場合は`METH_VARARGS`を指定する。
キーワード引数を指定したい場合は[ドキュメント][公式]を参照する。

`PyMODINIT_FUNC`をつけた`PyInit_<パッケージ名>`という関数を最後に用意する。
Pythonは`import <パッケージ名>`すると、この規約に則った関数名を共有ライブラリの中から探してくるっぽい。
なので、この関数の名前は規約どおりに`PyInit_<パッケージ名>`としなければならない。
また、この関数の前には`PyMODINIT_FUNC`マクロを置く必要がある。
まぁ詳細は気にせずコピペする・・

### setup.py

これも目をつぶってコピペする・・

```
from distutils.core import setup, Extension

module1 = Extension('hoge',
                    sources=['hoge.cpp'])

setup(name='hoge',
      version='1.0',
      description='This is a demo package',
      ext_modules=[module1])
```


## ビルド

`hoge.cpp`と`setup.py`を同じフォルダに置いて

```bash
$ python setup.py build
```

を実行する。これで、`build/`以下に`.so`ファイルができる。`.so`ファイルのある
フォルダを`sys.path`に追加すれば、`import hoge`が使えるようになる。

## デバッグ
c++から普通に標準出力に出力すれば、Pythonプロセスの標準出力に出てくるのでprintデバッグはできる。

または、`#ifdef`を使って、単体実行用のソースとパイソンのパッケージ化の部分を分けると、実行バイナリを
作る事もできる。


## ソースファイル全体

```c++
#define PY_SSIZE_T_CLEAN
#include <Python.h>

#include <cmath>

using namespace std;

struct norms {
  double one;
  double two;
};

norms func(const double& x, const double& y){
  return {
    abs(x) + abs(y),
    sqrt(x*x + y*y)
  };
}

static PyObject* hoge_func(PyObject *self, PyObject *args){
  double x, y;

  if (!PyArg_ParseTuple(args, "dd", &x, &y))
    return NULL;
  norms vals = func(x, y);
  PyObject* ret = PyList_New(0);
  PyObject* p;
  p = PyFloat_FromDouble(vals.one);
  PyList_Append(ret, p);
  p = PyFloat_FromDouble(vals.two);
  PyList_Append(ret, p);
  return ret;
}

static PyMethodDef HogeMethods[] = {
  {
    "func",
    hoge_func,
    METH_VARARGS,
    "calculate norms"
  },
  {NULL, NULL, 0, NULL} /* Sentinel */
};

static struct PyModuleDef hogemodule = {
  PyModuleDef_HEAD_INIT,
  "hoge",          /* name of module */
  "sample module", /* module documentation, may be NULL */
  -1,              /* size of per-interpreter state of the module,
                      or -1 if the module keeps state in global variables. */
  HogeMethods
};


PyMODINIT_FUNC
PyInit_hoge(void)
{
  return PyModule_Create(&hogemodule);
}



// Local Variables:
// flycheck-gcc-include-path: ("/usr/local/anaconda3/include/python3.8")
// flycheck-clang-include-path: ("/usr/local/anaconda3/include/python3.8")
// End:
```





[公式]: https://docs.python.org/3/extending/extending.html
[書式]: https://docs.python.org/3/c-api/arg.html#strings-and-buffers
[例外]: https://docs.python.org/3/extending/extending.html#intermezzo-errors-and-exceptions
