---
layout: post
title: C++でメルセンヌ・ツイスター
date: 2020-11-05 23:11:55 +0900
categories: c++
---

```c++
#include <random>
#include <iostream>

using namespace std;

int main(){
  int seed1 = 0, seed2 = 0, seed3 = 1;
  mt19937 e1(seed1), e2(seed2), e3(seed3);
  uniform_real_distribution<double> generator(0, 1);

  for(int i = 0; i < 10; i++){
    cout << generator(e1) << ", "
         << generator(e2) << ", "
         << generator(e3) << endl;
  }
}
```

出力
```
0.592845, 0.592845, 0.997185
0.844266, 0.844266, 0.932557
0.857946, 0.857946, 0.128124
0.847252, 0.847252, 0.999041
0.623564, 0.623564, 0.236089
0.384382, 0.384382, 0.396581
0.297535, 0.297535, 0.387911
0.056713, 0.056713, 0.669746
0.272656, 0.272656, 0.935539
0.477665, 0.477665, 0.846311
```
