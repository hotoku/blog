---
layout: post
title: scrapyの使い方
date: 2022-01-28 09:56:56 +0900
tags: python scrapy
---

## 初期化

以下のコマンドで、空のプロジェクトが作成される。

```shell
$ scrapy startproject search
```

`search`は、プロジェクト名に合わせて変更する。

これによって、

```
.
├── poetry.lock
├── pyproject.toml
└── search
    ├── scrapy.cfg
    └── search
        ├── __init__.py
        ├── items.py
        ├── middlewares.py
        ├── pipelines.py
        ├── settings.py
        └── spiders
            └── __init__.py
```

こんなツリーができる。

## Spiderの作成と実行

### 空のSpiderの作成

Scrapyでは、Spiderクラスのオブジェクトにスクレイピングの処理を書く。
以下のコマンドで、空のSpiderクラスができる。
これは、scrapy.cfgファイルがあるところで実行する。

```shell
$ scrapy genspider name google.co.jp
```

- `name`は、Spiderの名前。適当な名前を使う
- `google.co.jp`は、クロールしたいHPのURL

これで、

```
.
├── scrapy.cfg
└── search
    ├── __init__.py
    ├── items.py
    ├── middlewares.py
    ├── pipelines.py
    ├── settings.py
    └── spiders
        ├── __init__.py
        └── entry.py
```

上のようなツリーになる。

また、以下のようなファイルが`search/spiders/entry.py`として作成される。

```python
import scrapy

class EntrySpider(scrapy.Spider):
    name = 'entry'
    allowed_domains = ['google.com']
    start_urls = ['http://google.com/']

    def parse(self, response):
        pass
```

### とりあえず実行

```shell
$ scrapy crawl entry
```

を実行すると、クローラーが走る。何かログが色々出る。

### Spiderの編集

`entry.py`の`parse`を次のように変更して`scrapy crawl entry`を実行すると、GoogleのHPのHTMLが得られる。

```python
    def parse(self, response):
        print(response.body)
```

### Spiderに引数を渡す

`entry.py`を以下のように変更

```python
import scrapy

class EntrySpider(scrapy.Spider):
    name = "entry"
    allowed_domains = ["google.com"]
    def __init__(self, query="", *args, **kwargs):
        super(EntrySpider, self).__init__(*args, **kwargs)
        self.start_urls = [f"http://google.com/search?q={query}"]
        print(f"{query=}")

    def parse(self, response):
        print(response.body)
```

引数は、`-a key=value`で渡す。
以下を実行すると、

```shell
$ scrapy crawl entry -a query=hoge
```

`query=hoge`がログに表示される。

## 小ネタ

### Robots.txt

`settings.py`に、`ROBOTSTXT_OBEY = True`という設定がある。これを`False`に変更すると、Scrapyが`robots.txt`を無視するようになる。
ご利用は自己責任で。

### interactiveに実行

```shell
$ scrapy shell https://google.com/search?q=hoge
```

などと実行すると、Scrapyの対話環境に入れる。

## リンクをたどる

### xpath

```python
    def parse(self, response):
        xpath = "//a/parent::div[contains(@class, 'kCrYT')]"
        nodes = response.xpath(xpath)
```

`response`の`xpath`メソッドで、ほしいノードを指定できる。

### response.follow

`response.follow`にurlを渡して`yield`すると、そのページを訪れる。
`follow`の第２引数には、そのurlを処理するコールバックを指定する。

```python
    def parse(self, response):
        xpath = "//a/parent::div[contains(@class, 'kCrYT')]"
        nodes = response.xpath(xpath)
        for node in nodes:
            url = node.xpath("a").attrib["href"]
            yield response.follow(url, self.print_response)

    def print_response(self, response):
        print(response)
```

## Itemを定義する

Scrapyでは、データをItemという型で認識するぽい。Itemは、`items.py`に定義された`scrapy.Item`クラスの子クラス。Itemは、namedtupleやdataclassのような、予め決められた名前と値のペアの集まり。型はない。古いライブラリだからな。

アイテムの定義は、そのアイテムが持つ属性を、クラス変数として定義し、値として`scrapy.Field()`を設定してやる。
例として、検索結果のリンクを表現するアイテムを定義してみる。

```python
class SearchItem(scrapy.Item):
    title = scrapy.Field()
    url = scrapy.Field()
```

- アイテムをparseメソッドからreturnして
- scrapyコマンドに-oで出力ファイルを渡してやると、

そのアイテムをファイルに吐き出してくれる。

```python
    def parse(self, response):
        xpath = "//a/parent::div[contains(@class, 'kCrYT')]"
        nodes = response.xpath(xpath)
        for node in nodes:
            url = node.xpath("a").attrib["href"]
            yield response.follow(url, self.print_response)

    def print_response(self, response: Response):
        if isinstance(response, HtmlResponse):
            url = response.url
            title = response.xpath("//title/text()").get()
            return SearchItem(url=url, title=title) # Itemをreturnしている
        return None
```

こんな感じに定義して

```shell
$ scrapy crawl entry -a query=hoge -o result.jl
```

を実行すると

```json
{"url": "https://e-words.jp/w/%E3%83%A1%E3%82%BF%E6%A7%8B%E6%96%87%E5%A4%89%E6%95%B0.html", "title": null}
{"url": "https://dic.nicovideo.jp/a/hoge", "title": "hogeとは (ホゲとは) [単語記事] - ニコニコ大百科"}
{"url": "http://kmaebashi.com/programmer/hoge.html", "title": "A page of HOGE"}
{"url": "https://ejje.weblio.jp/content/hoge", "title": "hogeの意味・使い方・読み方 | Weblio英和辞書"}
{"url": "https://nlab.itmedia.co.jp/nl/articles/1506/19/news043.html", "title": "悲報：プログラムサンプルの「hoge」が通じない時代が来た - ねとらぼ"}
{"url": "https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%BF%E6%A7%8B%E6%96%87%E5%A4%89%E6%95%B0", "title": "メタ構文変数 - Wikipedia"}
{"url": "https://d.hatena.ne.jp/keyword/hoge", "title": "hogeとは コンピュータの人気・最新記事を集めました - はてな"}
{"url": "https://code-ship-blog.wemotion.co.jp/class-diary/%E3%80%90q%EF%BC%86a%E3%80%91%E8%A7%A3%E8%AA%AC%E8%A8%98%E4%BA%8B%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%8F%E3%82%8B%E3%80%8Choge%E3%80%8D%E3%81%A8%E3%81%8B%E3%80%8Cfuga%E3%80%8D%E3%81%A3%E3%81%A6%E3%81%AA/", "title": "【Q＆A】解説記事に出てくる「hoge」とか「fuga」ってなに？ | CodeShip blog"}
{"url": "https://qiita.com/hanlio/items/0505c266c114127c6457", "title": "hoge とは何か - Qiita"}
```

というファイルが得られる。
これで、googleに検索ワードを投げて、結果のurlとタイトルを一覧するクローラができた。

## ItemPipeline
ItemPipelineを定義してやると、yieldされたItemに対して行う処理をカスタマイズできる。ItemPipelineは、`process_item`というメソッドを持つオブジェクト（duck typing!）。
ItemPipelineは、`pipelines.py`に定義する。クロールして得られたデータをDBに保存するなどの処理は、ここに書くぽい。

例として、sqliteにデータを保存する処理を書いてみる。

``` python
from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime

from sqlitedict import SqliteDict
import scrapy

from .items import SearchItem

@dataclass
class Key:
    keyword: str
    rank: int

    def to_str(self) -> str:
        return f"{self.rank}/{self.keyword}"

    @staticmethod
    def parse(s: str) -> Key:
        n = s.find("/")
        keyword = s[(n+1):]
        rank = int(s[:n])
        return Key(keyword, rank)

@dataclass
class Value:
    title: str
    url: str
    timestamp: datetime

class SaveToSqlitePipeline:
    def process_item(self, item: scrapy.Item, spider: scrapy.Spider):
        if not isinstance(item, SearchItem):
            return item
        with SqliteDict("db.sqlite", autocommit=True) as dic:
            key = Key(item["keyword"], item["rank"]).to_str()
            value = Value(item["title"], item["url"], item["timestamp"])
            if not key in dic:
                ret = []
            else:
                ret = dic[key]
            ret.append(value)
            dic[key] = ret
        return item
```

実装したItemPipelineは、`settings.py`の`ITEM_PIPELINES`変数に登録してやる必要がある。

``` python
ITEM_PIPELINES = {
    'search.pipelines.SaveToSqlitePipeline': 300,
}
```

この状態で、`scrapy crawl entry -a query=hoge`を実行すると`db.sqlite`ができる。
以下のようなコードで`db.sqlite`の中身を確認すると、

``` python
from .pipelines import Key
from sqlitedict import SqliteDict

with SqliteDict("db.sqlite") as dic:
    for k, v in dic.items():
        key = Key.parse(k)
        print(key, ":", v)
```

次のような出力が得られる。

``` python
Key(keyword='hoge', rank=7) : [Value(title='A page of HOGE', url='http://kmaebashi.com/programmer/hoge.html', timestamp=datetime.datetime(2022, 1, 28, 7, 37, 34))]
Key(keyword='hoge', rank=5) : [Value(title='hogeとは (ホゲとは) [単語記事] - ニコニコ大百科', url='https://dic.nicovideo.jp/a/hoge', timestamp=datetime.datetime(2022, 1, 28, 7, 37, 34))]
Key(keyword='hoge', rank=6) : [Value(title=None, url='https://e-words.jp/w/%E3%83%A1%E3%82%BF%E6%A7%8B%E6%96%87%E5%A4%89%E6%95%B0.html', timestamp=datetime.datetime(2022, 1, 28, 7, 37, 34))]
Key(keyword='hoge', rank=9) : [Value(title='hogeの意味・使い方・読み方 | Weblio英和辞書', url='https://ejje.weblio.jp/content/hoge', timestamp=datetime.datetime(2022, 1, 28, 7, 37, 34))]
Key(keyword='hoge', rank=1) : [Value(title='悲報：プログラムサンプルの「hoge」が通じない時代が来た - ねとらぼ', url='https://nlab.itmedia.co.jp/nl/articles/1506/19/news043.html', timestamp=datetime.datetime(2022, 1, 28, 7, 37, 34))]
Key(keyword='hoge', rank=3) : [Value(title='hoge とは何か - Qiita', url='https://qiita.com/hanlio/items/0505c266c114127c6457', timestamp=datetime.datetime(2022, 1, 28, 7, 37, 34))]
Key(keyword='hoge', rank=4) : [Value(title='メタ構文変数 - Wikipedia', url='https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%BF%E6%A7%8B%E6%96%87%E5%A4%89%E6%95%B0', timestamp=datetime.datetime(2022, 1, 28, 7, 37, 34))]
Key(keyword='hoge', rank=10) : [Value(title='hogeとは コンピュータの人気・最新記事を集めました - はてな', url='https://d.hatena.ne.jp/keyword/hoge', timestamp=datetime.datetime(2022, 1, 28, 7, 37, 34))]
Key(keyword='hoge', rank=8) : [Value(title='【Q＆A】解説記事に出てくる「hoge」とか「fuga」ってなに？ | CodeShip blog', url='https://code-ship-blog.wemotion.co.jp/class-diary/%E3%80%90q%EF%BC%86a%E3%80%91%E8%A7%A3%E8%AA%AC%E8%A8%98%E4%BA%8B%E3%81%AB%E5%87%BA%E3%81%A6%E3%81%8F%E3%82%8B%E3%80%8Choge%E3%80%8D%E3%81%A8%E3%81%8B%E3%80%8Cfuga%E3%80%8D%E3%81%A3%E3%81%A6%E3%81%AA/', timestamp=datetime.datetime(2022, 1, 28, 7, 37, 34))]
```
