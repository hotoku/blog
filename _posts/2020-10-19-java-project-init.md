---
layout: post
title: Javaの基本的なこと調査メモ
date: 2020-10-19 09:40:38 +0900
categories:
---

[言語実装パターン][lip]を写経するのでjavaの環境を用意したい。
そのために調べた基本的なことをメモ。


## 空のプロジェクトを手で作る
EclipseなどのIDEを使えば自動で作ってくれると思うのだが、Emacsで書きたいので調べた。

### [参考1][1], [参考2][2]

以下のコマンドを叩けば良い。
```
mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-simple -DarchetypeVersion=1.4
```

group id/artifacto idなどを聞かれる

### [参考3][3]

```
mvn archetype:generate \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false \
  -DgroupId={group-id} \
  -DartifactId={project-name}
  ```

こっちは引数で指定するパターン。

まぁどっちでも良さそう

## groupId, artifactIdについて

[公式][公式]を読むと・・

- group idは、そのプロジェクトを世界中で一意に識別できるもの。よくjavaで見る、ドメインをヒックリ返した文字列
- artifact idは、version名を除いたjarファイルの名前

## pacakgeについて

[参考4][4]

ソースの先頭に`package`を書くとそのクラスの所属するパッケージが定義される

```java
package info.hotoku;

public class App{
    static void main(String[] args){
    }
}
```

このクラスを実行する場合には、

```
$ java info.hotoku.App
```

というコマンドを実行する。

パッケージ名とクラスパスの関係に注意が必要である。例えば、上のように作ったプロジェクトで
`mvn compile`をした時には、`target/classes/info/hotoku/App.class`というパスにクラスファイルが作成されるが、起動するときには

```
$ java -cp target/classes info.hotoku.App
```

を実行する。つまり、`java`の引数に渡すクラス名には、パッケージ名のドメイン部分も含める。そして、class pathには、そのドメイン部分は含まない。


## その他

- `mvn compile`: jarを作る
- `mvn test`: testを実行する




[1]: https://maven.apache.org/archetypes/maven-archetype-simple/
[2]: https://www.reddit.com/r/emacs/comments/eh2elr/how_do_i_create_a_java_project_with_lspjava/
[3]: https://qiita.com/hide/items/6593f3f02c3f28e57f2d
[4]: https://www.w3schools.com/java/java_packages.asp
[公式]: http://maven.apache.org/guides/mini/guide-naming-conventions.html
[lip]: https://www.amazon.co.jp/gp/product/4873115329/ref=as_li_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=4873115329&linkCode=as2&tag=hotoku0a-22&linkId=121898126d302a6c76e8adefe1474efd
