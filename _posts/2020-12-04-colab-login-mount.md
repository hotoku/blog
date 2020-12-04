---
layout: post
title: colaboratoryでGoogleログインとdriveのマウント
date: 2020-12-04 16:42:36 +0900
tags: colaboratory
---


```python
from google.colab import auth, drive
auth.authenticate_user()
drive.mount("drive")
```
