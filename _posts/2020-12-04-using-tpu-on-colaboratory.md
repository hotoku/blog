---
layout: post
title: colaboratoryでTPUを使う
date: 2020-12-04 16:43:37 +0900
tags: colaboratory
---


```python
%tensorflow_version 2.x
import tensorflow as tf
print("Tensorflow version " + tf.__version__)

try:
  tpu = tf.distribute.cluster_resolver.TPUClusterResolver()  # TPU detection
  print('Running on TPU ', tpu.cluster_spec().as_dict()['worker'])
except ValueError:
  raise BaseException('ERROR: Not connected to a TPU runtime; please see the previous cell in this notebook for instructions!')

tf.config.experimental_connect_to_cluster(tpu)
tf.tpu.experimental.initialize_tpu_system(tpu)
tpu_strategy = tf.distribute.experimental.TPUStrategy(tpu)
```

これはおまじない

```python
n_lstm = 300

import tensorflow as tf

with tpu_strategy.scope():
    model = tf.keras.Sequential()
    model.add(tf.keras.layers.LSTM(n_lstm, input_shape=X.shape[1:]))
    model.add(tf.keras.layers.Dense(2))
    model.summary()
```

`with tpu_strategy.scope()`がポイント。内部の動作は分かってないけど。

```python
!mkdir -p logs

model.compile(
    loss= tf.keras.losses.mean_squared_error,
    optimizer="adam",
    metrics=["mean_squared_error"]
)

logdir = os.path.join("gs://dtws-hotoku-misc/hoge", datetime.datetime.now().strftime("%Y%m%d-%H%M%S"))
tensorboard_callback = tf.keras.callbacks.TensorBoard(logdir, histogram_freq=1)

model.fit(
    X_train, y_train, validation_data=(X_val, y_val), batch_size=32, epochs=3,
    callbacks=[tensorboard_callback]
)
```

tensorboardを使うときは、GCS上にログを吐き出すようにする。

```python
%load_ext tensorboard
%tensorboard --logdir gs://dtws-hotoku-misc/hoge
```

拡張を読み込み、TensorBoardを起動する。

[TPUs in Colab](https://colab.research.google.com/notebooks/tpu.ipynb#scrollTo=FpvUOuC3j27n)

[Using TensorBoard in Notebooks](https://www.tensorflow.org/tensorboard/tensorboard_in_notebooks)
