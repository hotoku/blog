---
layout: post
title: ある条件の成り立つ最大の区間
date: 2021-01-24 09:22:10 +0900
tags: c++ atcoder
---

ある配列の中で、何かしらの条件`f(x)`を満たす区間の最大の長さを求めるプログラムの例。
下では、「値が`a`以上」という条件を満たす区間の最大の長さを計算している。
`while`が入れ子になっているが、よく考えると実行時間はO(N)。

```cpp
#include<iostream>
#include<vector>
#include<string>
#include<cstdio>
#include<algorithm>
#include<iomanip>
#include<map>

using namespace std;
typedef long long ll;
typedef unsigned long long ull;

const ll LLMAX = (1llu<<(sizeof(ll)*8-1)) - 1;
const int IMAX = (1llu<<(sizeof(int)*8-1)) - 1;


const int Nmax = 100000;
int N;
int A[Nmax];
map<int, int> memo;

int max_len(int a){
  /* A[i] >= a が連続する区間の最大の長さを計算する */
  if(memo.find(a) != memo.end()){
    return memo.find(a)->second;
  }
  int ret = 0;
  int s = 0;
  while(true){
    while(s < N && A[s] < a){
      s += 1;
    }
    if(s == N) break;
    int e = s+1;
    while(e < N && A[e] >= a){
      e += 1;
    }
    ret = max(e-s, ret);
    s = e;
  }
  memo[a] = ret;
  return ret;
}


int main(){
  cin >> N;
  for(int i = 0; i < N; i++){
    cin >> A[i];
  }
  int ret = 0;
  for(int i = 0; i < N; i++){
    ret = max(max_len(A[i]) * A[i], ret);
  }
  cout << ret << endl;
  return 0;
}

```
