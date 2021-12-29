---
layout: post
title: javascriptのimportとrequire
date: 2021-12-29 10:08:28 +0900
tags: javascript
---

JSのimportとかrequireは、いっつも分からなくなるのでメモ・・

[このQiita記事](https://qiita.com/minato-naka/items/39ecc285d1e37226a283)に分かりやすくまとまってたので、自分用にさらにまとめる。

- ESM = ECMAScript Modules方式と、CJS = CommonJS Modules方式の2種類ある
- ESMは`import`で、CJSは`require`
- ESMはブラウザ側JSの仕様で、CJSはサーバー側JSの仕様
- で、実行環境を気にせず動作できるようにするには、webpackを使って差異を吸収する

ということらしい。

## ESM式 `import` ブラウザ側

モジュール側

```javascript
export const helloWorld = function() {
    console.log('Hello World!!');
}
```

利用側

```javascript
import { helloWorld } from './module'

helloWorld();
```

## CJS式 `require` サーバー側

モジュール側

```javascript
module.exports = function() {
    console.log('Hello World!!');
}
```

```javascript
const helloWorldModule = require('./module.js');

helloWorldModule();
```

## その他

[この記事](https://qiita.com/kzee/items/dacbdd552bf8fe49f423)も分かりやすい

結局、[公式](https://typescriptbook.jp/reference/import-export-require)を読むのが一番安心感がある気もする
