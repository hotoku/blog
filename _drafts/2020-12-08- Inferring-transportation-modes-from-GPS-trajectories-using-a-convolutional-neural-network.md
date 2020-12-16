---
layout: post
title: Inferring transportation modes from GPS trajectories using a convolutional neural network
date: 2020-12-08 16:52:18 +0900
tags: geo thesis
---

[Inferring transportation modes from GPS trajectories using a convolutional neural network](https://arxiv.org/pdf/1804.02386.pdf)
これを読む。

## intro

- CNNを使う
- 前処理もする
- position, velocity, acceralation, jerk, bearing rate
  - jerk = 加加速度
  - bearing rate = 回転角

## literature review

- GPSデータ + 何か（加速度計とか）でやるやつが多いぽい
- 基本的に、この論文ではGPSデータだけに基づくやつ
- A comprehensive and systematic review of existing techniques of travel mode recognition based on GPS data is available in the reference (Wu et al., 2016).
  The paper provides an excellent comparison of various approaches in three categories including GPS data preprocessing,
  trip/segmentation identification, and travel mode detection.
- Zheng + (2008). change-point-based segmentation + 各セグメントの特徴量生成→分類
- Zheng + (2008). ↑のあとにgraph baseの後処理：などなど・・ hand crafted
- Endo + (2016): hand crafted + DNN. raw GPSを2-D imageにする。pixelの値は、その場所の滞在時間（地図をgridに切っている・・のかな？）
- Hao + (2017):point-level featurew（PF）をsparse auto-encoderで特徴量を作る。PF=スピード、head change, time interval, distance. time speed とdistanceはco-linear

## Methodology

### Preparing the input samples and applying data processing

#### 特徴量計算
1. trajectoryを、tripに分割する: 2つのレコードの時間間隔が一定以上で区切る
2. transportation modeの変化するところで、tripを分割し、segmentを作る
3. 全部のsegmentが同じ長さになるように、さらに分割されるか、0でpaddingする（CNNは全て同じ長さの入力を期待しているので。1次元のCNNを考えている・・のかな？）
4. motion characteristicsを、各連続する点ごとに計算する
   1. 距離は、(Vincenty, 1975)に従って計算。
   2. 速度、加速度、jerkを特徴量として追加
   3. bearing rate（どれくら回転してるか）も追加する

#### 外れ値除外
- 次のレコードよりも新しいレコードは除外（レコード順序をタイムスタンプより信頼）
- スピード・加速度が大きすぎるのは除外
- 短すぎるsegmentは女倍

同時に、smoothing kernelによってランダムエラーを除去。Savitzky-Golay filterというのを使ったらしい。事前にカーネルの形を決めなくて良い、らしい。(Schafer, 2011)

### CNN architecture
各点に対して4つ（速度、加速度、jerk, bearing rate）のデータ。これを全部つなげてCNNへの入力とする。Simonyan and Zisserman(2014), Krizhevsky+ (2012)が元になってるらしい。
というか、普通に時系列に対するCNNなだけだな・・

最適化はAdam. lr=0.001, beta1=0.9, beta2=0.999, eps=1e-8. Batch sizeは64.


## References
- [Wu, L., Yang, B., Jing, P., 2016. Travel mode detection based on GPS raw data collected by smartphones:
  a systematic review of the existing methodologies. Information 7, 67.](https://www.mdpi.com/2078-2489/7/4/67)
