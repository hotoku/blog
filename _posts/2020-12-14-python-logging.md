---
layout: post
title: logging
date: 2020-12-14 14:17:08 +0900
tags: python
---

Pythonのloggingのマニュアルを読んだメモ

## Advanced Logging Tutorial

- Loggers: applicationが使うインターフェイス
- Handlers: loggerの作ったlogを適切な場所に運ぶやつ
- Filters: どのログを出力すべきかを決める
- Formatters: 最終的なログの見た目調整

という4種類のオブジェクトがある。

ログ情報は、LogRecordのインスタンスとして、これらオブジェクトの間を運ばれていく。

ログは、Loggerインスタンスのメソッドを呼ばれることで実行される。
各Loggerインスタンスには名前がある。Loggerの間には親子関係があり、名前の中で`.`で区切られて表示される。

`logger = logging.getLogger(__file__)`というのがイディオム。

`logging.info`などを呼ぶと、ルートのLoggerの同名のメソッドが呼ばれる。

ログの出力先は、handlerが決める。

{% include figure.html url="/assets/img/logging_flow.png" description="Logging Flow, https://docs.python.org/3/howto/logging.html#logging-from-multiple-modules より引用" %}

親へのpropagate設定がある。


### Loggers

- APIをアプリケーションに公開
- ログレベルで、出力するかどうかを判断する
- 適切なhandlerにログを渡す

主なメソッド
- `Logger.setLevel()`
- `Logger.addHandler()`
- `Logger.addFilter()`


Loggerの中に、Effective levelが設定されている。自身の中に設定されていない場合は、親方向に探しにいく。

Loggerはデフォルトで、親方向にログを転送する（しないように設定することも可能）。
これのおかげで、全てのLoggerにHandlerを設定しなくても、ルートLoggerからログが出力されていく。

### Handlers

適切な場所にLogRecordをdispatchする。Loggerは複数のHandlerを持つことができる。
Handlerの中にもEffective levelが設定できることに注意。

例えば、

- すべてのログをファイルに
- エラー以上をstdoutに
- criticalをEmailに

出力する、ということをする場合には、それぞれのログレベルと宛先が設定された3種類のHandlerを作成し、
それら全てをLoggerに設定すれば良い。

アプリ開発者が気にする必要があるメソッドは

- setLevel
- setFormatter
- addFilter

くらい。

### config

- logger, handler, formatterのインスタンスを作り、パラメータを適宜設定する
- logging.config.fileConfigを呼び出す
- logging.config.dictConfigを呼び出す


## どうやって使うか

主に、lightなCLIを作る用途で考える

- INFO以上を特定のファイルに吐き出すhandler
- WARN以上をstderrに吐き出すhandler
- LoggerのデフォルトのlevelはINFOで、`-d`フラグを付けるとDEBUGに変わる

というような感じが使いやすいか。


## サンプルコード

通常時
- 標準エラーにwarn以上
- ファイルにinfo以上

デーバッグモード(`-d`を付けて起動)
- debug以上を標準エラー・ファイル両方に

出力するようなclickを使ったスクリプトのサンプル。

```python
#!/usr/bin/env python

import logging
import sys
import re
import click

LOGGER = logging.getLogger(__file__)


def setup_logger(debug):
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    to_stderr = logging.StreamHandler(sys.stderr)
    to_file = logging.FileHandler(re.sub(r".py$", r".log", __file__))
    to_stderr.setFormatter(formatter)
    to_file.setFormatter(formatter)
    LOGGER.addHandler(to_stderr)
    LOGGER.addHandler(to_file)
    if debug:
        LOGGER.setLevel(logging.DEBUG)
        to_stderr.setLevel(logging.DEBUG)
        to_file.setLevel(logging.DEBUG)
    else:
        LOGGER.setLevel(logging.INFO)
        to_stderr.setLevel(logging.WARN)
        to_file.setLevel(logging.INFO)


@click.command()
@click.option("--debug/--no-debug", "-d", default=False)
def main(debug):
    setup_logger(debug)
    LOGGER.debug("debug")
    LOGGER.info("info")
    LOGGER.warning("warn")
    LOGGER.error("error")

if __name__ == "__main__":
    main()
```
