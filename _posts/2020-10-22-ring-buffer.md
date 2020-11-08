---
layout: post
title: ring buffer （言語実装パターン 2）
date: 2020-10-22 08:46:33 +0900
tags: 言語実装パターン
---
LL(k)パーサーを作るのに、`k`個の先読みトークンを保存しておく。
このためにring bufferを実装したい。つまり、

- 最大で`k`個のオブジェクトを保存したい
- 新しく追加すると、古い物から消えていく
- 古い方から`i`番目の要素に`get(i)`でアクセスできる

ような物を作りたい。シンプルに

```java
Lexer lexer; // nextToken()で次のトークンを得る
int k;
Token[] buffer = new Token[k]

for(int i = 0; i < k; i++){
    buffer[i] = lexer.nextToken();
}

int p = 0; // 最古のポジション

void push(){
    p += 1;
    if(p==k){
        p = 0;
    }
    buffer[k] = lexer.nextToken();
}

void get(int i){ // 0 <= i < k
    return buffer[(p+i) % k];
}
```

こんな感じのものを実装していた。本の方では、

```java
Lexer lexer; // nextToken()で次のトークンを得る
int k;
Token[] buffer = new Token[k]

for(int i = 0; i < k; i++){
    buffer[i] = lexer.nextToken();
}

int p = 0; // 最古のポジション

void push(){
    p += 1;
    if(p==k){
        p = 0;
    }
    buffer[k] = lexer.nextToken();
}

void get(int i){ // 1 <= i <= k
    return buffer[(p+i-1) % k];
}
```

としていて、インデックスの使い方がちょっと違って面白いなと思ったので記録。
