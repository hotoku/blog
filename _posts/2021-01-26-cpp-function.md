---
layout: post
title: function型の変数
date: 2021-01-26 12:18:42 +0900
tags: c++
---


```
#include <functional>
#include <iostream>

using namespace std;

int f(int x, int y){
  return x + y;
}

int main(){
  function<int(int, int)> f2;
  f2 = f;
  cout << f2(1, 2) << endl;
}
```
